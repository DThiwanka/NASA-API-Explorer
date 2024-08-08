import React, { useState } from 'react'
import { FaRocket } from 'react-icons/fa'
import { IoMenu, IoClose } from 'react-icons/io5'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full text-white py-6 px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <FaRocket className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-white">NASA API Explorer</span>
        </a>
        {/* <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-base font-medium text-white hover:text-primary-dark transition-colors">
            Explore APIs
          </a>
          <a href="/docs" className="text-base font-medium text-white hover:text-primary-dark transition-colors">
            Docs
          </a>
          <a href="/blog" className="text-base font-medium text-white hover:text-primary-dark transition-colors">
            Blog
          </a>
          <a href="/contact" className="text-base font-medium text-white hover:text-primary-dark transition-colors">
            Contact
          </a>
        </nav> */}
        <button className="hidden md:inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-black bg-white border border-primary rounded-lg shadow-md transition-transform hover:bg-primary/10 hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark">
          Explore APIs
        </button>
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden flex items-center justify-center h-10 w-10 text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose className="h-6 w-6" /> : <IoMenu className="h-6 w-6" />}
        </button>
      </div>
      <div
        className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-80 transition-transform transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        role="dialog"
        aria-labelledby="mobile-menu-title"
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col items-center space-y-4 py-8 bg-gray-50 rounded-t-lg shadow-lg h-full">
          <button
            aria-label="Close menu"
            className="absolute top-4 right-4 text-black transition-transform transform hover:scale-105"
            onClick={() => setMenuOpen(false)}
          >
            <IoClose className="h-8 w-8" />
          </button>
          <a href="/" className="text-lg font-medium text-black hover:text-primary-dark transition-colors">
            Explore APIs
          </a>
          <a href="/docs" className="text-lg font-medium text-black hover:text-primary-dark transition-colors">
            Docs
          </a>
          <a href="/blog" className="text-lg font-medium text-black hover:text-primary-dark transition-colors">
            Blog
          </a>
          <a href="/contact" className="text-lg font-medium text-black hover:text-primary-dark transition-colors">
            Contact
          </a>
          <button className="mt-4 inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-black border border-primary rounded-lg shadow-md transition-transform hover:bg-primary/10 hover:text-primary-dark focus:outline-none hover:scale-105">
            Explore APIs
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
