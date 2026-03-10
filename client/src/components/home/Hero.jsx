import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const Hero = () => {
    const [activeTab, setActiveTab] = useState('tours');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background with Ken Burns Effect */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506929113675-b92417bbbe8e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center animate-kenburns"
                />
                <div className="absolute inset-0 bg-brand-secondary/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-secondary/20 to-brand-secondary/60"></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative container mx-auto px-4 text-center z-10 pt-20"
            >
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
                >
                    Spreading <span className="text-brand-primary">Happiness</span> <br />
                    Through Every Journey
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium"
                >
                    Experience the world's most breathtaking adventures with curated premium experiences and expert guidance.
                </motion.p>

                {/* Search Widget */}
                <motion.div
                    variants={itemVariants}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-2 md:p-4">
                        {/* Tabs */}
                        <div className="flex space-x-4 mb-4 border-b border-gray-100 pb-2 ml-2">
                            {['tours', 'activities', 'destinations'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-sm font-semibold capitalize transition-all relative ${activeTab === tab ? 'text-brand-primary' : 'text-gray-500 hover:text-brand-secondary'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <form className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="relative border-r border-gray-100 last:border-0 pl-2">
                                    <label className="flex items-center text-xs font-bold text-gray-400 uppercase mb-1">
                                        <FaSearch className="mr-2 text-brand-primary" /> Destination
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Where do you want to go?"
                                        className="w-full bg-transparent text-brand-secondary font-medium focus:outline-none placeholder-gray-300"
                                    />
                                </div>
                                <div className="relative border-r border-gray-100 last:border-0 pl-2">
                                    <label className="flex items-center text-xs font-bold text-gray-400 uppercase mb-1">
                                        <span className="mr-2 text-brand-primary">📅</span> Date
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Select Date"
                                        className="w-full bg-transparent text-brand-secondary font-medium focus:outline-none placeholder-gray-300"
                                    />
                                </div>
                                <div className="relative pl-2">
                                    <label className="flex items-center text-xs font-bold text-gray-400 uppercase mb-1">
                                        <span className="mr-2 text-brand-primary">👥</span> Travelers
                                    </label>
                                    <select className="w-full bg-transparent text-brand-secondary font-medium focus:outline-none appearance-none cursor-pointer">
                                        <option>2 Adults, 1 Room</option>
                                        <option>1 Adult</option>
                                        <option>Family (4+)</option>
                                    </select>
                                </div>
                            </div>
                            <button className="btn-primary lg:w-48 py-4 flex items-center justify-center gap-2 text-base shadow-brand-primary/20">
                                <FaSearch /> Search
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Floating USPs */}
                <div className="hidden md:flex justify-center gap-10 mt-16">
                    {[
                        { label: "10k+ Travelers", icon: "✨" },
                        { label: "500+ Destinations", icon: "🌍" },
                        { label: "Premium Support", icon: "🛡️" }
                    ].map((usp, idx) => (
                        <motion.div
                            key={usp.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 + (idx * 0.1) }}
                            className="flex items-center gap-2 text-white/80 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                        >
                            <span>{usp.icon}</span>
                            <span className="text-sm font-medium">{usp.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
