'use client';

import { CircleArrowDown, RocketIcon } from 'lucide-react';
import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone'


const FileUploder = () => {

    const onDrop = useCallback((acceptedFiles: File[]) => { console.log("File",acceptedFiles);
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive, isFocused, isDragAccept} = useDropzone({onDrop})
    

  return (
      <div className='flex flex-col gap-4 items-center max-w-7xl mx-auto'>

        {/* Loading for tomoreo */}

          <div {...getRootProps()}
              className={`p-10 border-2 border-dashed mt-10 w-[90%] border-indigo-600 rounded-lg h-96 flex items-center justify-center text-indigo-600
             ${isFocused || isDragAccept ? "bg-indigo-300" : "bg-indigo-100" }`}
          >
              <input {...getInputProps()} />
              <div className='flex flex-col justify-center items-center'>
                  {
                      isDragActive ?
                      (<>
                        <RocketIcon className='h-20 w-20 animate-ping'/>
                        <p>Drop the files here ...</p>
                      </>) : (
                    <>
                    <CircleArrowDown className='h-20 w-20 animate-bounce' />
                    <p>Drag n drop some files here, or click to select files</p>
                    </>)
                  }
              </div>
          </div>
      </div>
  )
}

export default FileUploder
