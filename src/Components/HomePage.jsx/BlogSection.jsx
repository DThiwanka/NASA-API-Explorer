import React from 'react'

const blogPosts = [
  {
    title: 'Introducing the New NASA API Explorer',
    description: 'Learn about the latest updates and features of the NASA API Explorer platform.',
    link: '/blog/new-nasa-api-explorer',
    image: 'https://images.pexels.com/photos/23763/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: '5 Innovative Ways to Use the APOD API',
    description: 'Discover creative applications for the Astronomy Picture of the Day API.',
    link: '/blog/innovative-ways-apod-api',
    image: 'https://images.pexels.com/photos/60126/pexels-photo-60126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    title: 'NASA Launches New Mars Rover API',
    description: 'Get the latest updates on the Mars Rover Photos API and how to integrate it into your projects.',
    link: '/blog/new-mars-rover-api',
    image: 'https://images.pexels.com/photos/8474973/pexels-photo-8474973.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

const BlogSection = () => {
  return (
    <section className="w-full bg-gray-50 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-gray-900">
            Latest from the NASA API Blog
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-gray-600 md:text-lg lg:text-xl">
            Stay up-to-date with the latest news, updates, and insights about the NASA API Explorer.
          </p>
        </div>
        <div className="grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 mx-auto">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:brightness-90"
              />
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                </div>
                <a
                  href={post.link}
                  className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-black shadow-md transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary mt-4 self-start"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogSection
