import React, { useState, useEffect, useCallback } from 'react';
import { ClipLoader } from "react-spinners";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { FaRocket, FaCalendarAlt, FaSearch, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';

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

    const getStatusColor = (statusName) => {
        switch (statusName) {
            case 'Launch Successful':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Launch Failure':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'To Be Determined':
            case 'To Be Confirmed':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            default:
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6 flex items-center justify-center">
                <div className="text-center">
                    <FaRocket className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-red-500 mb-2">Launch Failed!</h2>
                    <p className="text-gray-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
            <Breadcrumb items={[{ label: 'Launch Library' }]} />

            <header className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <h1 className="text-5xl font-bold ">
                        Launch Library
                    </h1>
                </div>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Explore the complete history and future of space exploration with our comprehensive launch database
                </p>
                <div className="mt-4 text-sm text-gray-500">
                    <span className="bg-gray-800 px-3 py-1 rounded-full">{count.toLocaleString()} launches found</span>
                </div>
            </header>

            {/* Search and Filter Section */}
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm text-white p-6 rounded-2xl shadow-xl mb-10 max-w-5xl mx-auto border border-gray-700/50">
                <div className="flex items-center gap-2 mb-4">
                    <IoFilter className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">Filters & Search</h3>
                </div>
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                        <label htmlFor="search" className="block text-sm font-medium mb-2 text-gray-300">
                            <FaSearch className="inline w-3 h-3 mr-1" /> Search
                        </label>
                        <input
                            id="search"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="e.g., Starlink, Falcon 9..."
                            className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="mode" className="block text-sm font-medium mb-2 text-gray-300">Detail Level</label>
                        <select id="mode" value={mode} onChange={(e) => setMode(e.target.value)} className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer">
                            <option value="list">List View</option>
                            <option value="normal">Normal View</option>
                            <option value="detailed">Detailed View</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="ordering" className="block text-sm font-medium mb-2 text-gray-300">Sort By</label>
                        <select id="ordering" value={ordering} onChange={(e) => setOrdering(e.target.value)} className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer">
                            <option value="-last_updated">Recently Updated</option>
                            <option value="last_updated">Oldest Updated</option>
                            <option value="-net">Newest Launch</option>
                            <option value="net">Oldest Launch</option>
                            <option value="name">Name (A-Z)</option>
                            <option value="-name">Name (Z-A)</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                        Apply Filters
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="flex flex-col justify-center items-center py-20">
                    <ClipLoader color="#3B82F6" size={60} />
                    <p className="mt-4 text-gray-400 animate-pulse">Loading launches...</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto max-w-7xl">
                        {launches.map((launch) => (
                            <div
                                key={launch.id}
                                className="group bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2 border border-gray-700/50 hover:border-blue-500/30"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={launch.image?.image_url || 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400'}
                                        alt={launch.name}
                                        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(launch.status.name)}`}>
                                        {launch.status.abbrev || launch.status.name}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h2 className="text-lg font-bold mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {launch.name}
                                    </h2>
                                    <div className="space-y-2 text-sm">
                                        <p className="flex items-center gap-2 text-gray-400">
                                            <FaCalendarAlt className="w-4 h-4 text-blue-400" />
                                            <span>{new Date(launch.net).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}</span>
                                        </p>
                                        <p className="flex items-center gap-2 text-gray-400">
                                            <FaRocket className="w-4 h-4 text-purple-400" />
                                            <span className={`font-medium ${launch.status.name === 'Launch Successful' ? 'text-green-400' : launch.status.name === 'Launch Failure' ? 'text-red-400' : 'text-yellow-400'}`}>
                                                {launch.status.name}
                                            </span>
                                        </p>
                                    </div>
                                    <a
                                        href={launch.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg transition-all font-medium border border-blue-500/30 hover:border-blue-500"
                                    >
                                        View Details <FaExternalLinkAlt className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 mt-12">
                        <button
                            onClick={handlePreviousPage}
                            disabled={offset === 0}
                            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-gray-700 hover:border-gray-600"
                        >
                            <FaChevronLeft className="w-4 h-4" /> Previous
                        </button>
                        <div className="flex items-center gap-2 bg-gray-800/50 px-6 py-3 rounded-lg border border-gray-700">
                            <span className="text-gray-400">Page</span>
                            <span className="text-white font-bold">{Math.floor(offset / limit) + 1}</span>
                            <span className="text-gray-400">of</span>
                            <span className="text-white font-bold">{Math.ceil(count / limit)}</span>
                        </div>
                        <button
                            onClick={handleNextPage}
                            disabled={offset + limit >= count}
                            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-gray-700 hover:border-gray-600"
                        >
                            Next <FaChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default LaunchLibrary;