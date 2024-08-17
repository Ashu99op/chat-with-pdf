'use server'

import { adminDb, adminStorage } from "@/firebaseAdmin";
import { indexName } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import pineconeClient from "@/lib/pinecone";
import { revalidatePath } from "next/cache";

export const deleteDocument = async (docId: string) => {
    auth().protect();

    const { userId } = await auth();

    //Delete the document from the DB
    await adminDb
        .collection("users")
        .doc(userId!)
        .collection("files")
        .doc(docId)
        .delete();

    // Delete from firebase storage
    await adminStorage
        .bucket(process.env.FIREBASE_STORAGE_BUCKET)
        .file(`users/${userId}/files/${docId}`)
        .delete();

    //Delete all smbeddings associated with the document
    const index = await pineconeClient.index(indexName);
    await index.namespace(docId).deleteAll();

    // Revalidate the dashboard page to ensure the documents are up to date
    revalidatePath("/dashboard");
}