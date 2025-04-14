import React from 'react'
import Logout from './Logout'

const Header = () => {
  return (
    <header className="px-[3rem] shadow-sm  bg-white flex justify-between items-center py-3">
        <div className="font-bold text-xl">eBallot</div>
        <div className="flex items-center gap-6 font-semibold ">
          <nav>Home</nav>
          <nav>My Ballots</nav>
          <nav>Elections</nav>
          <nav>About</nav>
          <Logout />
        </div>
      </header>
  )
}

export default Header