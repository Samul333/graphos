import React from 'react'
import { ImSpinner } from 'react-icons/im'

function Loading() {
  return (
    <div className='flex items-center justify-center w-full h-full'>
            <ImSpinner size={12}/>
    </div>
  )
}

export default Loading