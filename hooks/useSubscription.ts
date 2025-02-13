'use client'

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

// Number of docs the user is allowed to have
export const PRO_LIMIT = 20;
export const FREE_LIMIT = 2;


const useSubscription = () => {
 const [hasActiveMembership, setHasActiveMembership] = useState(null);
 const [isOverFileLimit, setIsOverFileLimit] = useState(false);
 const { user } = useUser();

 // Listen to the user document
 const [snapshot,loading,error] = useDocument(
    user && doc(db, "users", user.id),
    {
        snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  //Listen to the users file collection
  const [filesSnapshot, fileLoading] = useCollection(
    user && collection(db, "users", user?.id, "files")
  );

  useEffect(() => {
    if(!snapshot) return;

    const data = snapshot.data();
    if(!data) return;
    
    setHasActiveMembership(data.hasActiveMembership)
  }, [snapshot]);

  useEffect(() => {
    if(!filesSnapshot || hasActiveMembership === null) return;

    const files = filesSnapshot.docs;
    const usersLimit = hasActiveMembership ? PRO_LIMIT : FREE_LIMIT;

    console.log("checking if user is over limit", files?.length, usersLimit);

    setIsOverFileLimit(files.length >= usersLimit);
  }, [filesSnapshot, hasActiveMembership, PRO_LIMIT, FREE_LIMIT]);

  return { hasActiveMembership, loading, error, isOverFileLimit, fileLoading };
}

export default useSubscription
