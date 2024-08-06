import React from 'react';
import { CiSatellite1 } from 'react-icons/ci';
import { FaSquarespace, FaRocket } from 'react-icons/fa';
import { IoTelescope } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const apis = [
  {
    icon: <CiSatellite1 className="h-8 w-8 text-blue-500" />,
    title: 'APOD API',
    description: 'Retrieve the Astronomy Picture of the Day.',
    link: '/apod',
  },
  {
    icon: <FaSquarespace className="h-8 w-8 text-red-500" />,
    title: 'Mars Rover Photos',
    description: "Access the latest images captured by NASA's Mars rovers.",
    link: '/mars-rover-photos',
  },
  {
    icon: <IoTelescope className="h-8 w-8 text-green-500" />,
    title: 'EPIC API',
    description: 'Retrieve images of the Earth captured by the DSCOVR satellite.',
    link: '/epic',
  },
  {
    icon: <FaRocket className="h-8 w-8 text-yellow-500" />,
    title: 'Launch Library',
    description: 'Access information about past, present, and future space launches.',
    link: '/launch-library',
  },
];

const FeaturedAPIsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-gray-900">
              Featured NASA APIs
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600 md:text-xl lg:text-lg xl:text-xl">
              Discover a curated selection of the most popular and powerful NASA APIs that bring space closer to you.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16">
          {apis.map((api, index) => (
            <div
              key={index}
              className="group relative flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-transform transform hover:scale-105 hover:shadow-xl hover:border-primary"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border-4 border-gray-100 absolute top-[-2rem] left-1/2 transform -translate-x-1/2 shadow-lg">
                {api.icon}
              </div>
              <div className="flex flex-col flex-grow pt-10">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                  {api.title}
                </h3>
                <p className="mt-2 text-gray-600">{api.description}</p>
                <div className="mt-auto">
                  <Link to={api.link}>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">
                      Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAPIsSection;
