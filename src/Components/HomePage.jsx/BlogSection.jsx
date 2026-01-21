import React, { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners'
import { FaNewspaper, FaExternalLinkAlt, FaCalendarAlt } from 'react-icons/fa'

const BlogSection = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNasaNews = async () => {
      try {
        // Using NASA's official news API from spaceflight news API
        const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles?limit=3&news_site=NASA')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setNews(data.results)
      } catch (err) {
        setError(err.message)
        // Fallback to static data if API fails
        setNews([
          {
            id: 1,
            title: 'NASA Explores the Unknown in Air and Space',
            summary: 'NASA is pioneering the future in space exploration, scientific discovery, and aeronautics research.',
            url: 'https://www.nasa.gov',
            image_url: 'https://images.pexels.com/photos/23763/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            published_at: new Date().toISOString(),
          },
          {
            id: 2,
            title: 'Artemis Mission Updates',
            summary: 'Follow the latest developments in NASA\'s Artemis program to return humans to the Moon.',
            url: 'https://www.nasa.gov/artemis',
            image_url: 'https://images.pexels.com/photos/60126/pexels-photo-60126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            published_at: new Date().toISOString(),
          },
          {
            id: 3,
            title: 'James Webb Space Telescope Discoveries',
            summary: 'Explore the groundbreaking discoveries made by the James Webb Space Telescope.',
            url: 'https://www.nasa.gov/webb',
            image_url: 'https://images.pexels.com/photos/8474973/pexels-photo-8474973.jpeg?auto=compress&cs=tinysrgb&w=600',
            published_at: new Date().toISOString(),
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchNasaNews()
  }, [])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaNewspaper className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Latest NASA News
            </h2>
          </div>
          <p className="mt-2 max-w-2xl mx-auto text-gray-400 md:text-lg lg:text-xl">
            Stay up-to-date with the latest news and discoveries from NASA
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-12">
            <ClipLoader color="#3B82F6" size={50} />
            <p className="mt-4 text-gray-400 animate-pulse">Loading latest news...</p>
          </div>
        ) : (
          <div className="grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
            {news.map((article) => (
              <div
                key={article.id}
                className="group relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 border border-gray-700/50 hover:border-blue-500/30"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image_url || 'https://images.pexels.com/photos/23763/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                    alt={article.title}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <span className="flex items-center gap-1 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30 backdrop-blur-sm">
                      <FaCalendarAlt className="w-3 h-3" />
                      {new Date(article.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{article.summary}</p>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl transition-all font-medium border border-blue-500/30 hover:border-blue-500"
                  >
                    Read More <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogSection
