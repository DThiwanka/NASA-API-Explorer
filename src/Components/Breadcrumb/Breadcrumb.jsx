import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="flex items-center space-x-3 text-base text-gray-400 mb-8 py-3 px-4 bg-gray-800/50 rounded-lg w-fit">
            <Link to="/" className="flex items-center hover:text-white transition-colors">
                <FaHome className="w-5 h-5" />
            </Link>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <FaChevronRight className="w-4 h-4 text-gray-600" />
                    {item.link ? (
                        <Link to={item.link} className="hover:text-white transition-colors font-medium">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-blue-400 font-medium">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
