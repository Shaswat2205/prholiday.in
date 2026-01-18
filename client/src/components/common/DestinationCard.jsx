import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

const DestinationCard = ({ destination }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer"
        >
            <img
                src={destination.image || 'https://via.placeholder.com/300x400?text=Destination'}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

            <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                <p className="flex items-center text-gray-300 mb-2">
                    <FaMapMarkerAlt className="mr-2 text-secondary-cyan" />
                    {destination.country}
                </p>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {destination.description}
                </p>
                <Link
                    to={`/destinations/${destination._id}`}
                    className="inline-block text-secondary-gold font-semibold hover:text-white transition-colors"
                >
                    Explore Packages &rarr;
                </Link>
            </div>
        </motion.div>
    );
};

export default DestinationCard;
