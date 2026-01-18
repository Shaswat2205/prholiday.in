import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaUser, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PackageCard = ({ pkg }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-secondary-mid/20 transition-all duration-300 group"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={pkg.images[0] || 'https://via.placeholder.com/400x300?text=Package'}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-secondary-gold text-black font-bold px-3 py-1 rounded-full text-sm">
                    ${pkg.price}
                </div>
            </div>

            <div className="p-6 text-white">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold truncate">{pkg.name}</h3>
                    <div className="flex items-center text-secondary-gold text-sm">
                        <FaStar className="mr-1" />
                        <span>{pkg.rating.average}</span>
                    </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{pkg.description}</p>

                <div className="flex items-center justify-between text-gray-300 text-sm mb-6">
                    <div className="flex items-center">
                        <FaClock className="mr-2 text-secondary-cyan" />
                        {pkg.duration.days}D/{pkg.duration.nights}N
                    </div>
                    <div className="flex items-center">
                        <FaUser className="mr-2 text-secondary-cyan" />
                        Max {pkg.maxPax}
                    </div>
                </div>

                <Link
                    to={`/packages/${pkg._id}`}
                    className="block w-full bg-white/10 hover:bg-gradient-to-r from-secondary-cyan to-blue-600 text-center py-3 rounded-lg font-semibold transition-all"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
};

export default PackageCard;
