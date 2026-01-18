import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const Hero = () => {
    return (
        <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image/Gradient */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary-start/80 via-primary-mid/60 to-primary-end"></div>
            </div>

            <div className="relative container mx-auto px-4 text-center z-10 pt-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6"
                >
                    Discover Your Next <span className="text-secondary-cyan">Adventure</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto"
                >
                    Explore the world's most beautiful destinations with our premium curated holiday packages.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl max-w-4xl mx-auto"
                >
                    <form className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-left text-gray-300 text-sm mb-1 ml-1">Destination</label>
                            <input
                                type="text"
                                placeholder="Where to?"
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary-cyan"
                            />
                        </div>
                        <div className="md:w-1/4">
                            <label className="block text-left text-gray-300 text-sm mb-1 ml-1">Date</label>
                            <input
                                type="date"
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary-cyan"
                            />
                        </div>
                        <div className="md:w-1/5">
                            <label className="block text-left text-gray-300 text-sm mb-1 ml-1">Guests</label>
                            <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary-cyan">
                                <option value="1">1 Person</option>
                                <option value="2">2 People</option>
                                <option value="4">3-5 People</option>
                                <option value="6">6+ People</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button className="w-full bg-gradient-to-r from-secondary-cyan to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                <FaSearch /> Search
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
