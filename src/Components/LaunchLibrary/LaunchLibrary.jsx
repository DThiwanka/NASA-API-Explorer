import React, { useState, useEffect, useCallback } from 'react';
import { ClipLoader } from "react-spinners";

const LaunchLibrary = () => {
    const [launches, setLaunches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [ordering, setOrdering] = useState('-last_updated');
    const [limit, setLimit] = useState(12);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);

    const fetchLaunches = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                mode,
                limit,
                offset,
                ordering,
            });
            if (searchTerm) {
                params.set('search', searchTerm);
            }

            const response = await fetch(`https://ll.thespacedevs.com/2.3.0/launches/?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Data fetching failed');
            }
            const data = await response.json();
            setLaunches(data.results);
            setCount(data.count);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [mode, searchTerm, ordering, limit, offset]);

    useEffect(() => {
        fetchLaunches();
    }, [fetchLaunches]);

    const handleSearch = (e) => {
        e.preventDefault();
        setOffset(0); // Reset to first page on new search
        fetchLaunches();
    };

    const handleNextPage = () => {
        if (offset + limit < count) {
            setOffset(offset + limit);
        }
    };

    const handlePreviousPage = () => {
        if (offset - limit >= 0) {
            setOffset(offset - limit);
        }
    };

    if (error) {
        return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
            <header className="text-center mb-8">
                <h1 className="text-5xl font-bold mb-4">Launch Library</h1>
                <p className="text-lg text-gray-400">Explore past and future space launches</p>
            </header>

            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                        <label htmlFor="search" className="block text-sm font-medium mb-1">Search</label>
                        <input
                            id="search"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="e.g., Starlink"
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="mode" className="block text-sm font-medium mb-1">Mode</label>
                        <select id="mode" value={mode} onChange={(e) => setMode(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="list">List</option>
                            <option value="normal">Normal</option>
                            <option value="detailed">Detailed</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="ordering" className="block text-sm font-medium mb-1">Order By</label>
                        <select id="ordering" value={ordering} onChange={(e) => setOrdering(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="last_updated">Last Updated (Asc)</option>
                            <option value="-last_updated">Last Updated (Desc)</option>
                            <option value="name">Name (Asc)</option>
                            <option value="-name">Name (Desc)</option>
                            <option value="net">Launch Date (Asc)</option>
                            <option value="-net">Launch Date (Desc)</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10">
                        Apply
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="flex justify-center items-center">
                    <ClipLoader color="#00BFFF" size={50} />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto max-w-6xl">
                        {launches.map((launch) => (
                            <div key={launch.id} className="bg-gray-800 rounded-lg p-4 shadow-lg flex flex-col hover:bg-gray-700 transition duration-300 transform hover:-translate-y-2">
                                <img src={launch.image?.image_url || 'https://via.placeholder.com/300x200'} alt={launch.name} className="w-full h-48 object-cover rounded-md mb-4" />
                                <h2 className="text-xl font-semibold mb-2 text-blue-400">{launch.name}</h2>
                                <p className="text-gray-400 mb-2">Status: <span className={`font-semibold ${launch.status.name === 'Launch Successful' ? 'text-green-400' : 'text-red-400'}`}>{launch.status.name}</span></p>
                                <p className="text-gray-400 mb-2">Date: {new Date(launch.net).toLocaleString()}</p>
                                <a href={launch.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-auto">
                                    More Details
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
                        <button onClick={handlePreviousPage} disabled={offset === 0} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <div className="text-white">
                            Page {Math.floor(offset / limit) + 1} of {Math.ceil(count / limit)}
                        </div>
                        <button onClick={handleNextPage} disabled={offset + limit >= count} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default LaunchLibrary;