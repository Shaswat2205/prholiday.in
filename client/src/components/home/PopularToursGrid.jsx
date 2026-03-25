import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const PopularToursGrid = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await axios.get(`/api/packages`);
                const packages = res.data.data || [];
                // Get featured or top 6
                const featured = packages.filter(p => p.featured);
                setTours(featured.length > 0 ? featured.slice(0, 6) : packages.slice(0, 6));
            } catch (err) {
                console.error('Failed to fetch tours', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTours();
    }, []);

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
                    {loading ? (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-primary border-t-transparent"></div>
                        </div>
                    ) : (
                        tours.map((tour, index) => (
                        <motion.div
                            key={tour._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden shrink-0">
                                <img
                                    src={tour.images && tour.images.length > 0 ? tour.images[0] : 'https://placehold.co/800x600'}
                                    alt={tour.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {tour.featured && (
                                    <div className="absolute top-4 left-4 bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 animate-pulse-soft">
                                        Featured
                                    </div>
                                )}
                                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-brand-primary transition-all z-10">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-3">
                                    <FaMapMarkerAlt className="text-brand-primary" />
                                    <span>{tour.destination?.name || tour.destination || 'Multiple Locations'}</span>
                                </div>
                                <h3 className="text-xl font-bold text-brand-secondary mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                                    {tour.name}
                                </h3>

                                <div className="flex items-center gap-4 mb-6 mt-auto">
                                    <div className="flex items-center gap-1">
                                        <FaStar className="text-brand-accent text-sm" />
                                        <span className="text-sm font-bold text-brand-secondary">{tour.rating?.average || 0}</span>
                                        <span className="text-xs text-brand-gray-500">({tour.rating?.count || 0})</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-brand-gray-500 font-medium">
                                        <FaClock />
                                        <span>{tour.duration?.days} Days / {tour.duration?.nights} Nights</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div>
                                        {/* Optional original price representation (e.g. 20% higher) */}
                                        <span className="text-xs text-brand-gray-500 line-through block italic">₹{Math.floor(tour.price * 1.2)}</span>
                                        <span className="text-2xl font-extrabold text-brand-secondary">
                                            ₹{tour.price} <span className="text-xs font-normal text-brand-gray-500">/ person</span>
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
                    )))}
                </div>
            </div>
        </section>
    );
};

export default PopularToursGrid;
