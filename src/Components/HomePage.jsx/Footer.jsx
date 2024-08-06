import React from 'react'
import { FaRocket } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full bg-primary-foreground py-8 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-4 mb-6 md:mb-0">
          <span className="text-sm font-medium text-primary">&copy; 2024 NASA API Explorer</span>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <a href="/terms" className="text-sm font-medium text-primary hover:underline transition-colors hover:text-primary-light">
            Terms of Service
          </a>
          <a href="/privacy" className="text-sm font-medium text-primary hover:underline transition-colors hover:text-primary-light">
            Privacy Policy
          </a>
          <a href="/contact" className="text-sm font-medium text-primary hover:underline transition-colors hover:text-primary-light">
            Contact
          </a>
        </nav>
      </div>
      
      {/* Social Media Links */}
      <div className="container mx-auto mt-8 flex justify-center space-x-6">
        <a href="https://twitter.com/NASA" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light transition-colors">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.46 6c-.77.35-1.6.58-2.46.68.88-.52 1.56-1.35 1.88-2.34-.82.49-1.74.84-2.72 1.03-.77-.82-1.87-1.33-3.09-1.33-2.34 0-4.24 1.9-4.24 4.24 0 .33.03.65.1.96-3.53-.18-6.67-1.87-8.77-4.43-.37.63-.58 1.37-.58 2.16 0 1.49.76 2.8 1.91 3.57-.71-.02-1.37-.22-1.95-.56v.06c0 2.08 1.48 3.8 3.44 4.19-.36.1-.74.15-1.13.15-.28 0-.56-.03-.84-.08.56 1.76 2.19 3.05 4.12 3.08-1.51 1.18-3.41 1.89-5.46 1.89-.35 0-.71-.02-1.06-.06 1.95 1.25 4.28 1.98 6.77 1.98 8.12 0 12.56-6.72 12.56-12.56 0-.19-.01-.37-.02-.56.86-.62 1.61-1.4 2.2-2.3z" />
          </svg>
        </a>
        <a href="https://facebook.com/NASA" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light transition-colors">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.5 0h-21c-.825 0-1.5.675-1.5 1.5v21c0 .825.675 1.5 1.5 1.5h11.75v-9.25h-3.125v-3.75h3.125v-2.75c0-3.125 1.9-4.75 4.625-4.75 1.312 0 2.438.097 2.75.14v3.187h-1.875c-1.469 0-1.75.675-1.75 1.75v2.438h3.5l-.5 3.75h-3v9.25h5.75c.825 0 1.5-.675 1.5-1.5v-21c0-.825-.675-1.5-1.5-1.5z" />
          </svg>
        </a>
        <a href="https://linkedin.com/company/nasa" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-light transition-colors">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.23 0h-20.46c-.87 0-1.57.71-1.57 1.58v20.84c0 .87.71 1.58 1.57 1.58h20.46c.87 0 1.57-.71 1.57-1.58v-20.84c0-.87-.71-1.58-1.57-1.58zm-15.7 20.1h-3.54v-11.48h3.54v11.48zm-1.77-13.16c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06c1.14 0 2.06.92 2.06 2.06s-.92 2.06-2.06 2.06zm15.7 13.16h-3.54v-5.66c0-1.35-.03-3.09-1.88-3.09-1.88 0-2.18 1.47-2.18 2.99v5.76h-3.54v-11.48h3.4v1.56h.05c.48-.91 1.67-1.87 3.43-1.87 3.67 0 4.35 2.42 4.35 5.57v6.22z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}

export default Footer
