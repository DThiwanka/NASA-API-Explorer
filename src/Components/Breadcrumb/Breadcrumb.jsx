import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
            <Link to="/" className="flex items-center hover:text-white transition-colors">
                <FaHome className="w-4 h-4" />
            </Link>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <FaChevronRight className="w-3 h-3 text-gray-600" />
                    {item.link ? (
                        <Link to={item.link} className="hover:text-white transition-colors">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-blue-400">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;
