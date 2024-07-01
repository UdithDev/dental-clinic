import React from 'react'
import { PiProhibitInsetDuotone } from 'react-icons/pi'

const Unauthorized = () => {
  return (
    <div className='h-[77vh] flex items-center justify-center gap-2'>
        <PiProhibitInsetDuotone />
        <h2>
            You are unauthorized to access this!
        </h2>
    </div>
  )
}

export default Unauthorized
