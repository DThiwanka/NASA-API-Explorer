import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';

const APOD = () => {
    const [APODetails, setAPODetails] = useState(null);
    const [error, setError] = useState(null);
    const apikey = 'KdPblJyoWDa1cWMPbPIwquPc18nIQOfC7atXhWbu';

    useEffect(() => {
        const fetchAPODetails = async () => {
            console.log('API Key:', apikey); 
            try {
                const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apikey}`);
                setAPODetails(response.data);
            } catch (error) {
                setError('Failed to fetch');
            }
        };
        fetchAPODetails();
    }, []);

    console.log(APODetails);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gradient-to-b from-blue-500 to-indigo-900 text-white">
            
            {error && <p className="text-red-500 text-lg font-semibold mb-4">{error}</p>}
            {APODetails && (
                <div className="bg-white text-gray-800 shadow-lg rounded-lg p-8 max-w-3xl w-full">
                    <h1 className="text-4xl font-extrabold mb-6">{APODetails.title}</h1>
                    <h2 className="text-lg font-medium text-gray-500 mb-4">{APODetails.date}</h2>
                    <div className="mb-6">
                        {APODetails.media_type === "video" ? (
                            <ReactPlayer url={APODetails.url} controls={true} width="100%" height="500px" className="rounded-lg shadow-lg"/>
                        ) : (
                            <img src={APODetails.url} alt={APODetails.title} className="w-full rounded-lg shadow-lg"/>
                        )}
                    </div>
                    <p className="text-lg leading-relaxed">{APODetails.explanation}</p>
                </div>
            )}
        </div>
    );
};

export default APOD;
