import React from 'react'
import Logout from './Logout'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="px-[3rem] shadow-sm  bg-white flex justify-between items-center py-3">
        <div className="font-bold text-xl">eBallot</div>
        <div className="flex items-center gap-6 font-semibold ">
          <nav><Link href="/">Home</Link></nav>
          <nav><Link href="/my-ballot">My Ballots</Link></nav>
          <nav><Link href="/election">Elections</Link></nav>
          <nav><Link href="/about">About</Link></nav>
          <Logout />
        </div>
      </header>
  )
}

export default Header