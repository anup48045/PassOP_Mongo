import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white fixed top-0 w-full'>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
            <span className='text-green-700'>&lt;</span>
            Pass
            <span className='text-green-700'>OP/&gt;</span>
          </div>
          <a href="https://github.com/anup48045/PassOP_Mongo.git" target='_blank'  rel="noopener noreferrer">
         <button className='text-white bg-green-500 my-5 rounded-full flex justify-between items-center hover:bg-green-400 cursor-pointer'>
          <img className='invert p-1 w-10' src="/icons/github.svg" alt="github" />
          <span className='font-bold px-4'>GitHub</span>
         </button>
          </a>
        </div>
    </nav>
  )
}

export default Navbar
