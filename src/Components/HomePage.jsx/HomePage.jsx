import React from 'react'
import Header from './Header'
import HeroSection from './HeroSection'
import FeaturedAPIsSection from './FeaturedAPIsSection'
import BlogSection from './BlogSection'
import Footer from './Footer'
import StarBackground from './StarBackground'


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative">
      <StarBackground />
      <Header />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <FeaturedAPIsSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
