import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-around items-center bg-violet-800 text-white py-3 w-[100vw] h-[10vh]">
        <div className="logo flex items-center">
          <img className="w-14 rounded-full" src="logo.jpeg" alt="" />
            <span className="font-bold text-xl mx-2">iTask</span>
        </div>

        <ul className="flex gap-8 mx-9">
            <li className="cursor-pointer hover:font-bold transition-all">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all">Your Tasks</li>
        </ul>

    </nav>
  )
}

export default Navbar
