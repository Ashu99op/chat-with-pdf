export const dynamic = "force-dynamic"

import Documents from '@/components/Documents'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='h-full max-w-7xl mx-auto'>
      <h1 className='text-3xl p-5 bg-gray-100 dark:bg-gray-900 font-light text-indigo-600'>
        My Documents
    </h1>

    <Documents />
    </div>
  )
}

export default Dashboard
