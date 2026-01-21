import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { FaCalendarAlt, FaStar, FaExpand, FaInfoCircle } from "react-icons/fa";
import { IoTelescope } from "react-icons/io5";

const APOD = () => {
  // Set default date to a random date within the last 30 days
  const getRandomPastDate = () => {
    const date = new Date();
    const randomDays = Math.floor(Math.random() * 30) + 1; // 1 to 30 days ago
    date.setDate(date.getDate() - randomDays);
    return date.toISOString().split("T")[0];
  };

  const [date, setDate] = useState(getRandomPastDate());
  const [APODDetails, setAPODDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "KdPblJyoWDa1cWMPbPIwquPc18nIQOfC7atXhWbu";

  useEffect(() => {
    fetchAPODData(date);
  }, [date]);

  const fetchAPODData = async (selectedDate) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`
      );
      setAPODDetails(response.data);
    } catch (error) {
      setError("Failed to fetch APOD data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <Breadcrumb items={[{ label: 'APOD' }]} />

      <header className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-5xl font-bold">
            Astronomy Picture of the Day
          </h1>
        </div>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Discover the cosmos one day at a time with NASA's stunning astronomical imagery
        </p>
      </header>

      {/* Date Picker Section */}
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl mb-10 max-w-md mx-auto border border-gray-700/50">
        <div className="flex items-center gap-2 mb-4">
          <FaCalendarAlt className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Select Date</h3>
        </div>
        <input
          type="date"
          className="w-full bg-gray-900/50 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <ClipLoader color="#A855F7" size={60} />
          <p className="mt-4 text-gray-400 animate-pulse">Loading cosmic wonders...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <IoTelescope className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-500 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      ) : APODDetails ? (
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50">
            {/* Image/Video Section */}
            <div className="relative group">
              {APODDetails.media_type === "image" ? (
                <>
                  <img
                    src={APODDetails.url}
                    alt={APODDetails.title}
                    className="w-full h-[500px] object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  {APODDetails.hdurl && (
                    <a
                      href={APODDetails.hdurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FaExpand className="w-4 h-4" /> View HD
                    </a>
                  )}
                </>
              ) : (
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    src={APODDetails.url}
                    title={APODDetails.title}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30">
                  <FaStar className="inline w-3 h-3 mr-1" /> Featured
                </span>
                <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm">
                  <FaCalendarAlt className="inline w-3 h-3 mr-1" />
                  {new Date(APODDetails.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {APODDetails.title}
              </h2>

              {APODDetails.copyright && (
                <p className="text-gray-500 text-sm mb-4">
                  © {APODDetails.copyright}
                </p>
              )}

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <FaInfoCircle className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">About this image</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-base">
                  {APODDetails.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <IoTelescope className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500">No data available for the selected date.</p>
        </div>
      )}
    </div>
  );
};

export default APOD;
