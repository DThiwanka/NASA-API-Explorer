import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import toast, { Toaster } from 'react-hot-toast';
import { FaCalendarAlt, FaRegFrown } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';

// Fetcher function for SWR
const fetcher = (url) => axios.get(url).then(res => res.data);

const APOD = () => {
    const [date, setDate] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bgImage, setBgImage] = useState('');
    const apikey = 'KdPblJyoWDa1cWMPbPIwquPc18nIQOfC7atXhWbu';

    const { data: APODDetails, error: swrError, mutate } = useSWR(
        `https://api.nasa.gov/planetary/apod?api_key=${apikey}&date=${inputDate || new Date().toISOString().split('T')[0]}`,
        fetcher,
        { revalidateOnFocus: false }
    );

    useEffect(() => {
        if (swrError) {
            toast.error('Failed to fetch data');
            setError('Failed to fetch');
        } else {
            setError(null);
            if (APODDetails && APODDetails.media_type === 'image') {
                setBgImage(APODDetails.url);
            } else {
                setBgImage(''); // Reset background if not an image
            }
        }
        setLoading(false);
    }, [swrError, APODDetails]);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (date) {
            setInputDate(date);
            mutate(); // Trigger revalidation
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen py-10 text-white">
            <Toaster position="top-right" />
            
            {/* Background Image with Blur Effect */}
            {bgImage && (
                <div 
                    className="absolute inset-0 -z-10 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bgImage})`, filter: 'blur(8px)' }}
                />
            )}

            {/* Overlay for Better Readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50 -z-10" />

            {/* Main Content */}
            <motion.form
                onSubmit={handleSubmit}
                className="relative mb-6 w-full max-w-lg bg-white bg-opacity-80 rounded-lg p-4 shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="p-2 rounded-md bg-gray-200 text-gray-800 w-full md:w-auto"
                    />
                    <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition w-full md:w-auto"
                    >
                        <FaCalendarAlt className="mr-2" /> Fetch APOD
                    </button>
                </div>
            </motion.form>

            {loading && <p className="text-white text-lg font-semibold mb-4">Loading...</p>}
            {error && <p className="text-red-400 text-lg font-semibold mb-4">{error}</p>}
            {APODDetails && !loading && (
                <motion.div
                    className="relative w-full max-w-4xl mx-4 md:mx-auto bg-white bg-opacity-80 text-gray-800 rounded-lg shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col md:flex-row">
                        {/* Media Section */}
                        <div className="flex-1 flex items-center justify-center">
                            {APODDetails.media_type === "video" ? (
                                <ReactPlayer
                                    url={APODDetails.url}
                                    controls={true}
                                    width="100%"
                                    height="100%"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="relative w-full h-0" style={{ paddingTop: '56.25%' }}>
                                    <img
                                        src={APODDetails.url}
                                        alt={APODDetails.title}
                                        className="absolute inset-0 object-cover w-full h-full"
                                    />
                                </div>
                            )}
                        </div>
                        {/* Text Section */}
                        <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-800">{APODDetails.title}</h1>
                                <h2 className="text-sm md:text-md font-medium text-gray-600 mb-4">{APODDetails.date}</h2>
                                <p className="text-base leading-relaxed text-gray-700 mb-6">
                                    {APODDetails.explanation}
                                </p>
                            </div>
                            {/* <button
                                onClick={() => mutate()}
                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition"
                            >
                                <MdRefresh className="mr-2" /> Refresh
                            </button> */}
                        </div>
                    </div>
                </motion.div>
            )}
            {!APODDetails && !loading && !error && (
                <div className="flex items-center justify-center mt-6">
                    <FaRegFrown className="h-12 w-12 text-gray-400" />
                    <p className="text-gray-400 ml-4">No data available. Please select a different date.</p>
                </div>
            )}
        </div>
    );
};

export default APOD;
