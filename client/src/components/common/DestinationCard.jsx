import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

const DestinationCard = ({ destination }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 cursor-pointer"
        >
            <div className="absolute inset-0">
                <img
                    src={destination.image || 'https://via.placeholder.com/600x800?text=Destination'}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-brand-secondary/40 to-transparent transition-all duration-500 group-hover:from-brand-secondary/90"></div>
            </div>

            <Link to={`/destinations/${destination._id}`} className="absolute inset-0 z-10">
                <div className="absolute bottom-0 left-0 w-full p-10 transform transition-all duration-500 group-hover:-translate-y-4">
                    <div className="flex items-center gap-2 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                        <FaMapMarkerAlt /> {destination.country}
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 leading-tight group-hover:text-brand-primary transition-colors">
                        {destination.name}
                    </h3>

                    <p className="text-white/60 font-medium text-sm line-clamp-2 mb-8 max-h-0 group-hover:max-h-20 transition-all duration-700 opacity-0 group-hover:opacity-100 italic">
                        {destination.description}
                    </p>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-brand-primary group-hover:border-brand-primary transition-all duration-300">
                            <span className="text-xl">→</span>
                        </div>
                        <span className="text-white text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            View Packages
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default DestinationCard;
