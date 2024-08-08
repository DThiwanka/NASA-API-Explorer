import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const NeoFeed = () => {
  const [startDate, setStartDate] = useState("");
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (startDate) {
      fetchNeoData(startDate);
    }
  }, [startDate]);

  const fetchNeoData = async (startDate) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = "KdPblJyoWDa1cWMPbPIwquPc18nIQOfC7atXhWbu"; // Replace with your NASA API key
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
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">NASA NEO Feed</h1>
        <p className="text-lg text-gray-400">Explore Near-Earth Objects</p>
      </header>

      <div className="mb-8 flex justify-center">
        <input
          type="date"
          className="bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#00BFFF" size={50} />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : neoData && neoData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {neoData.map((neo) => (
            <div
              key={neo.id}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 transform hover:-translate-y-2"
            >
              <h2 className="text-2xl font-bold mb-2 text-blue-400">{neo.name}</h2>
              <p>
                <span className="font-semibold">ID:</span> {neo.id}
              </p>
              <p>
                <span className="font-semibold">Magnitude:</span>{" "}
                {neo.absolute_magnitude_h}
              </p>
              <p>
                <span className="font-semibold">Diameter:</span>{" "}
                {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                  2
                )}{" "}
                -{" "}
                {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                  2
                )}{" "}
                km
              </p>
              <p>
                <span className="font-semibold">Hazardous:</span>{" "}
                {neo.is_potentially_hazardous_asteroid ? (
                  <span className="text-red-500">Yes</span>
                ) : (
                  <span className="text-green-500">No</span>
                )}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No data available for the selected date.
        </p>
      )}
    </div>
  );
};

export default NeoFeed;
