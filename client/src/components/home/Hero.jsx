import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaUsers, FaArrowRight } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerticalSlider from '../common/VerticalSlider';

const Hero = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('tours');
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [travelers, setTravelers] = useState(2);
    const [showSlider, setShowSlider] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [requestSent, setRequestSent] = useState(false);

    const onDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const res = await axios.get(`/api/search?q=${searchQuery}`);
            const { packages, destinations } = res.data.data;

            if (packages.length > 0 || destinations.length > 0) {
                // If results exist, navigate to packages page with search param
                navigate(`/packages?search=${searchQuery}`);
            } else {
                // No results found, send request email
                await axios.post('/api/search/request', {
                    query: searchQuery,
                    dates: `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString() || 'Not selected'}`,
                    travelers,
                });
                setRequestSent(true);
                setTimeout(() => setRequestSent(false), 5000);
            }
        } catch (err) {
            console.error('Search error:', err);
        } finally {
            setIsSearching(false);
        }
    };

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
        <div className="relative min-h-[100svh] lg:h-[90vh] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-transparent py-24 lg:py-0">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative container mx-auto px-4 text-center z-10 pt-20"
            >
                <motion.div
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, duration: 1.5 }}
                    className="flex justify-center mb-6"
                >
                    <img src="/logo.png" alt="PR Holidays" className="h-24 md:h-36 lg:h-48 drop-shadow-2xl" style={{ filter: 'brightness(0) invert(1) drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }} />
                </motion.div>

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
                    className="max-w-5xl mx-auto relative"
                >
                    <AnimatePresence>
                        {requestSent && (
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute -top-16 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full shadow-lg font-bold z-50 flex items-center gap-2"
                            >
                                ✨ Plan Requested! We'll find it for you.
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="bg-white rounded-2xl shadow-2xl p-2 md:p-4 transition-all hover:shadow-brand-primary/10">
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

                        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Destination Search */}
                                <div className="relative border-r border-gray-100 last:border-0 pl-2 text-left">
                                    <label className="flex items-center text-xs font-bold text-gray-400 uppercase mb-1">
                                        <FaSearch className="mr-2 text-brand-primary" /> Destination
                                    </label>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Where do you want to go?"
                                        className="w-full bg-transparent text-brand-secondary font-medium focus:outline-none placeholder-gray-300"
                                    />
                                </div>

                                {/* Date Range Picker */}
                                <div className="relative border-r border-gray-100 last:border-0 pl-2 text-left">
                                    <label className="flex items-center text-xs font-bold text-gray-400 uppercase mb-1">
                                        <FaCalendarAlt className="mr-2 text-brand-primary" /> Travel Dates
                                    </label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={onDateChange}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsRange
                                        monthsShown={1}
                                        placeholderText="Select duration"
                                        className="w-full bg-transparent text-brand-secondary font-medium focus:outline-none placeholder-gray-300 cursor-pointer"
                                    />
                                </div>

                                {/* Traveler Slider */}
                                <div className="relative pl-2 text-left group">
                                    <label className="flex items-center text-xs font-bold text-gray-400 uppercase mb-1">
                                        <FaUsers className="mr-2 text-brand-primary" /> Travelers
                                    </label>
                                    <div 
                                        className="flex items-center justify-between w-full bg-transparent text-brand-secondary font-medium cursor-pointer"
                                        onClick={() => setShowSlider(!showSlider)}
                                    >
                                        <span>{travelers} Travelers</span>
                                        <motion.span animate={{ rotate: showSlider ? 180 : 0 }} className="text-[10px] text-gray-400 group-hover:text-brand-primary">▼</motion.span>
                                    </div>
                                    
                                    <AnimatePresence>
                                        {showSlider && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute top-12 left-0 z-50"
                                            >
                                                <VerticalSlider 
                                                    value={travelers} 
                                                    onChange={(val) => {
                                                        setTravelers(val);
                                                        // Auto-close after short delay for better UX
                                                        setTimeout(() => setShowSlider(false), 800);
                                                    }} 
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={isSearching}
                                className="btn-primary lg:w-48 py-4 flex items-center justify-center gap-2 text-base shadow-brand-primary/20 disabled:opacity-50"
                            >
                                {isSearching ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <><FaSearch /> Search</>
                                )}
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
