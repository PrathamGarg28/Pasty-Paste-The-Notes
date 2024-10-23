import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full h-[45px] flex justify-center items-center p-4 bg-gray-800 gap-x-5'>
      <NavLink to="/" className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold text-xl"
              : "text-white font-medium text-xl"
          }>HOME</NavLink>
      <NavLink to="/pastes" className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-semibold text-xl"
              : "text-white font-medium text-xl"
          }>PASTES</NavLink>
      
      
    </div>
  )
}

export default Navbar