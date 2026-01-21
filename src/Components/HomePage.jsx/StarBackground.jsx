import React, { useMemo } from 'react';

const StarBackground = () => {
    const stars = useMemo(() =>
        Array.from({ length: 150 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 3,
        })), []
    );

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute bg-white rounded-full animate-pulse"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDuration: `${star.duration}s`,
                        animationDelay: `${star.delay}s`,
                        boxShadow: '0 0 4px rgba(255,255,255,0.5)',
                    }}
                />
            ))}
        </div>
    );
};

export default StarBackground;
