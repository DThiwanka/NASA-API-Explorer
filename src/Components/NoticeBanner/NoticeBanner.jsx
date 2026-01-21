import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const NoticeBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const bannerClosed = sessionStorage.getItem('nasaNoticeBannerClosed');
        if (bannerClosed === 'true') {
            setIsVisible(false);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('nasaNoticeBannerClosed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="bg-white text-black border-b border-gray-200">
            <div className="container mx-auto px-4 py-2">
                <div className="flex items-center justify-between gap-4">
                    <p className="text-sm">
                        <span className="font-bold">⚠ Please Note:</span>{' '}
                        NASA scales back most operations due to a US government funding deadlock. This action impacts many ongoing projects. Essential tasks like monitoring astronauts on the ISS continue.
                    </p>
                    <button
                        onClick={handleClose}
                        className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                        aria-label="Close notice"
                    >
                        <FaTimes className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoticeBanner;
