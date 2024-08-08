import React from 'react'
import Icon from './nasa-6.svg'

const HeroSection = () => {
  return (
    <section className="w-full bg-primary py-8 md:py-16 lg:py-24 text-white ">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          <div className="space-y-6 md:space-y-10 lg:space-y-12 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 md:mb-8">
              Unlock the Power of NASA's Data
            </h1>
            <p className="max-w-xl mx-auto md:mx-0 text-primary-foreground text-lg md:text-xl lg:text-2xl mb-6 md:mb-10">
              Explore a vast collection of NASA's open-source APIs and integrate them into your applications. Discover the latest space data, imagery, and more.
            </p>
            <a
              href="/explore"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-white text-black px-8 text-base font-semibold text-primary shadow-lg transition-transform transform hover:scale-105 hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-foreground mb-6 md:mb-10"
            >
              Explore APIs
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src={Icon}
              alt="NASA API Explorer"
              className="w-full max-w-[500px] h-auto rounded-xl transition-transform transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
