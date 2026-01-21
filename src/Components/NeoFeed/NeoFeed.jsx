import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { FaCalendarAlt, FaExclamationTriangle, FaCheckCircle, FaExternalLinkAlt, FaRuler } from "react-icons/fa";
import { GiAsteroid, GiMeteorImpact } from "react-icons/gi";
import { IoSpeedometer } from "react-icons/io5";

const NeoFeed = () => {
  // Set default date to a random date within the last 30 days
  const getRandomPastDate = () => {
    const date = new Date();
    const randomDays = Math.floor(Math.random() * 30) + 1; // 1 to 30 days ago
    date.setDate(date.getDate() - randomDays);
    return date.toISOString().split("T")[0];
  };

  const [startDate, setStartDate] = useState(getRandomPastDate());
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNeoData(startDate);
  }, [startDate]);

  const fetchNeoData = async (startDate) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = "KdPblJyoWDa1cWMPbPIwquPc18nIQOfC7atXhWbu";
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&api_key=${apiKey}`
      );
      const data = response.data.near_earth_objects;
      setNeoData(data[startDate]);
    } catch (error) {
      setError("Failed to fetch NEO data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <Breadcrumb items={[{ label: 'NEO Feed' }]} />

      <header className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-5xl font-bold">
            Near-Earth Objects
          </h1>
        </div>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Track asteroids and comets that pass close to Earth's orbit
        </p>
        {neoData && neoData.length > 0 && (
          <div className="mt-4 text-sm text-gray-500">
            <span className="bg-gray-800 px-3 py-1 rounded-full">{neoData.length} objects found</span>
          </div>
        )}
      </header>

      {/* Date Picker Section */}
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl mb-10 max-w-md mx-auto border border-gray-700/50">
        <div className="flex items-center gap-2 mb-4">
          <FaCalendarAlt className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold">Select Date</h3>
        </div>
        <input
          type="date"
          className="w-full bg-gray-900/50 text-white p-4 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <ClipLoader color="#F97316" size={60} />
          <p className="mt-4 text-gray-400 animate-pulse">Scanning the cosmos...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <GiMeteorImpact className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-500 mb-2">Mission Failed!</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      ) : neoData && neoData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {neoData.map((neo) => (
            <div
              key={neo.id}
              className={`group bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border ${neo.is_potentially_hazardous_asteroid
                ? 'border-red-500/30 hover:border-red-500/50 hover:shadow-red-500/10'
                : 'border-gray-700/50 hover:border-orange-500/30 hover:shadow-orange-500/10'
                }`}
            >
              {/* Header with hazard indicator */}
              <div className={`p-4 ${neo.is_potentially_hazardous_asteroid ? 'bg-red-500/10' : 'bg-orange-500/10'}`}>
                <div className="flex items-center justify-between mb-2">
                  <GiAsteroid className={`w-8 h-8 ${neo.is_potentially_hazardous_asteroid ? 'text-red-400' : 'text-orange-400'}`} />
                  {neo.is_potentially_hazardous_asteroid ? (
                    <span className="flex items-center gap-1 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold border border-red-500/30">
                      <FaExclamationTriangle className="w-3 h-3" /> Hazardous
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/30">
                      <FaCheckCircle className="w-3 h-3" /> Safe
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                  {neo.name.replace(/[()]/g, '')}
                </h2>
                <p className="text-gray-500 text-xs mt-1">ID: {neo.id}</p>
              </div>

              {/* Stats */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <IoSpeedometer className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Magnitude</p>
                    <p className="text-white font-semibold">{neo.absolute_magnitude_h.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <FaRuler className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Estimated Diameter</p>
                    <p className="text-white font-semibold">
                      {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
                    </p>
                  </div>
                </div>

                {neo.close_approach_data && neo.close_approach_data[0] && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <GiMeteorImpact className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Miss Distance</p>
                      <p className="text-white font-semibold">
                        {parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString(undefined, { maximumFractionDigits: 0 })} km
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 pt-0">
                <a
                  href={neo.nasa_jpl_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-orange-600/20 hover:bg-orange-600 text-orange-400 hover:text-white rounded-xl transition-all font-medium border border-orange-500/30 hover:border-orange-500"
                >
                  View on NASA JPL <FaExternalLinkAlt className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <GiAsteroid className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500">No near-earth objects found for the selected date.</p>
        </div>
      )}
    </div>
  );
};

export default NeoFeed;
