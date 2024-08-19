'use client'

import React from 'react'
import { Button } from './ui/button'
import { FrownIcon, PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useSubscription from '@/hooks/useSubscription'

const PlaceHolderDocuments = () => {
  const { isOverFileLimit } = useSubscription();
    const router = useRouter();

    const handleClick = () => {
        // Check is user is pro or free
        if(isOverFileLimit){
          router.push('/dashboard/upgrade');
        } else{
          router.push('/dashboard/upload');
        }
    }

  return (
    <Button onClick={handleClick} className='flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-400 drop-shadow-md text-gray-400 dark:hover:text-gray-600'>
        {isOverFileLimit ? (
          <FrownIcon className='h-16 w-16'/>
        ):(
         <PlusCircleIcon className='h-16 w-16'/>
        )}

        <p className='font-semibold'>
          {isOverFileLimit ? "Upgrade to add more documents" : "Add a document"}
        </p>
    </Button>
  )
}

export default PlaceHolderDocuments
