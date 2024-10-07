import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row-reverse gap-4'>
      <NavLink to="/pastes">PASTES</NavLink>
      <NavLink to="/">HOME</NavLink>
      
    </div>
  )
}

export default Navbar