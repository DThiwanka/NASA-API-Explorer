import React from 'react'
import Header from './Header'
import HeroSection from './HeroSection'
import FeaturedAPIsSection from './FeaturedAPIsSection'
import BlogSection from './BlogSection'
import Footer from './Footer'


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedAPIsSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
