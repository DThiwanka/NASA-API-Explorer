import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const APOD = () => {
  const [date, setDate] = useState("");
  const [APODDetails, setAPODDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "KdPblJyoWDa1cWMPbPIwquPc18nIQOfC7atXhWbu";

  useEffect(() => {
    if (date) {
      fetchAPODData(date);
    } else {
      fetchAPODData(new Date().toISOString().split("T")[0]);
    }
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
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">NASA Astronomy Picture of the Day</h1>
        <p className="text-lg text-gray-400">Discover the cosmos one day at a time</p>
      </header>

      <div className="mb-8 flex justify-center">
        <input
          type="date"
          className="bg-gray-800 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#00BFFF" size={50} />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : APODDetails ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md animate-fadeIn max-w-lg mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-blue-400">{APODDetails.title}</h2>
          <p className="text-gray-400 mb-6">{APODDetails.date}</p>
          {APODDetails.media_type === "image" ? (
            <img
              src={APODDetails.url}
              alt={APODDetails.title}
              className="w-full h-48 object-cover rounded-lg shadow-lg mb-6" // Adjust width and height here
            />
          ) : (
            <div className="relative w-full h-0 mb-6" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={APODDetails.url}
                title={APODDetails.title}
                className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ height: '300px' }} // Adjust video height here
              ></iframe>
            </div>
          )}
          <p className="text-base leading-relaxed text-gray-300">{APODDetails.explanation}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No data available for the selected date.
        </p>
      )}
    </div>
  );
};

export default APOD;
