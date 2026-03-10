import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const tours = [
    {
        _id: '1',
        title: 'Spiritual Wonders of Kyoto',
        location: 'Kyoto, Japan',
        price: 1299,
        originalPrice: 1599,
        rating: 4.9,
        reviews: 245,
        duration: '5 Days',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
        badge: 'Bestseller'
    },
    {
        _id: '2',
        title: 'Parisian Romance & Gourmet',
        location: 'Paris, France',
        price: 999,
        originalPrice: 1200,
        rating: 4.8,
        reviews: 180,
        duration: '4 Days',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
        badge: 'Featured'
    },
    {
        _id: '3',
        title: 'Dubai Desert Safari Adventure',
        location: 'Dubai, UAE',
        price: 499,
        originalPrice: 650,
        rating: 4.7,
        reviews: 320,
        duration: '2 Days',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea90b7cad11?q=80&w=800&auto=format&fit=crop',
        badge: 'Top Choice'
    },
    {
        _id: '4',
        title: 'Santorini Sunset Cruise',
        location: 'Santorini, Greece',
        price: 750,
        originalPrice: 900,
        rating: 5.0,
        reviews: 150,
        duration: '3 Days',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop'
    },
    {
        _id: '5',
        title: 'Bali Jungle Retrear',
        location: 'Bali, Indonesia',
        price: 1100,
        originalPrice: 1400,
        rating: 4.9,
        reviews: 410,
        duration: '6 Days',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
        badge: 'Eco Friendly'
    },
    {
        _id: '6',
        title: 'Swiss Alps Hiking Tour',
        location: 'Interlaken, Switzerland',
        price: 1800,
        originalPrice: 2200,
        rating: 4.9,
        reviews: 95,
        duration: '7 Days',
        image: 'https://images.unsplash.com/photo-1531329844144-03abb0748ee3?q=80&w=800&auto=format&fit=crop'
    }
];

const PopularToursGrid = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-brand-primary font-bold uppercase tracking-widest text-sm"
                        >
                            Most Popular
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl font-bold text-brand-secondary mt-2"
                        >
                            Top Selling <span className="text-brand-primary">Adventures</span>
                        </motion.h2>
                    </div>
                    <Link to="/packages" className="text-brand-primary font-bold hover:underline flex items-center gap-2 transition-all">
                        View All Tours <span>→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {tours.map((tour, index) => (
                        <motion.div
                            key={tour._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={tour.image}
                                    alt={tour.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {tour.badge && (
                                    <div className="absolute top-4 left-4 bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 animate-pulse-soft">
                                        {tour.badge}
                                    </div>
                                )}
                                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-brand-primary transition-all z-10">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-3">
                                    <FaMapMarkerAlt className="text-brand-primary" />
                                    <span>{tour.location}</span>
                                </div>
                                <h3 className="text-xl font-bold text-brand-secondary mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                                    {tour.title}
                                </h3>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-1">
                                        <FaStar className="text-brand-accent text-sm" />
                                        <span className="text-sm font-bold text-brand-secondary">{tour.rating}</span>
                                        <span className="text-xs text-brand-gray-500">({tour.reviews})</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-brand-gray-500 font-medium">
                                        <FaClock />
                                        <span>{tour.duration}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div>
                                        <span className="text-xs text-brand-gray-500 line-through block italic">${tour.originalPrice}</span>
                                        <span className="text-2xl font-extrabold text-brand-secondary">
                                            ${tour.price} <span className="text-xs font-normal text-brand-gray-500">/ person</span>
                                        </span>
                                    </div>
                                    <Link
                                        to={`/packages/${tour._id}`}
                                        className="bg-brand-secondary text-white p-4 rounded-2xl hover:bg-brand-primary transition-all group-hover:px-6"
                                    >
                                        <span className="font-bold flex items-center gap-2">
                                            Book Now
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularToursGrid;
