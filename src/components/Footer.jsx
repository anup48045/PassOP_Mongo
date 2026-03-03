import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white fixed bottom-0 w-full' >
        <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
            <div className="logo font-bold text-2xl">
                <span className='text-green-700'>&lt;</span>
                Pass
                <span className='text-green-700'>OP/&gt;</span>
            </div>
            <span>© Copyright 2026 | All rights reserved</span>
       </div>
   </div>
  )
}

export default Footer
