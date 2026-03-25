import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaUser, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

    // Logic to ensure images work in production/local
    const getImageUrl = (url) => {
        if (!url) return 'https://via.placeholder.com/400x300?text=Package';
        // Clear out any hardcoded localhost or absolute URLs from old DB entries
        return url.replace('http://localhost:5000', '');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 border border-gray-100"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={getImageUrl(pkg.images[0])}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-5 transition-all group-hover:top-4 right-5 transition-all group-hover:right-4 bg-white/20 backdrop-blur-md text-white border border-white/30 font-black px-4 py-2 rounded-2xl text-lg shadow-lg">
                    ₹{pkg.price}
                </div>
                {pkg.rating.average >= 4.8 && (
                    <div className="absolute top-5 left-5 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg animate-pulse-soft">
                        Trending
                    </div>
                )}
            </div>

            <div className="p-8">
                <div className="flex items-center gap-2 text-brand-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">
                    <FaStar className="text-brand-accent" />
                    <span className="text-brand-secondary">{pkg.rating.average}</span>
                    <span>•</span>
                    <span>{pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
                </div>

                <h3 className="text-2xl font-black text-brand-secondary mb-4 group-hover:text-brand-primary transition-colors line-clamp-1">
                    {pkg.name}
                </h3>

                <p className="text-brand-gray-500 text-sm mb-8 line-clamp-2 leading-relaxed font-medium">
                    {pkg.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-brand-secondary font-bold text-sm">
                        <FaUser className="text-brand-primary" />
                        <span>Up to {pkg.maxPax} px</span>
                    </div>
                    <Link
                        to={`/packages/${pkg._id}`}
                        className="bg-brand-secondary text-white p-4 rounded-2xl hover:bg-brand-primary transition-all group-hover:px-8 shadow-lg shadow-brand-secondary/20 group-hover:shadow-brand-primary/30"
                    >
                        <span className="font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                            Explore <span>→</span>
                        </span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PackageCard;
