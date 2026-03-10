import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaClock, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/bookings/my');
                setBookings(res.data.data);
            } catch (err) {
                console.error('Error fetching bookings:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <FaSpinner className="text-4xl text-brand-primary animate-spin mb-4" />
                <p className="text-brand-gray-500 font-bold uppercase tracking-widest text-[10px]">Loading your adventures...</p>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/30 border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center text-4xl mb-6">
                    ✈️
                </div>
                <h3 className="text-2xl font-black text-brand-secondary mb-4">No Bookings Yet</h3>
                <p className="text-brand-gray-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                    The world is waiting for you! Start your journey by exploring our hand-picked tour packages.
                </p>
                <button className="bg-brand-secondary text-white font-black py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-xs uppercase tracking-[0.2em]">
                    Browse Packages
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {bookings.map((booking, idx) => (
                <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/30 border border-gray-100 flex flex-col md:flex-row items-center gap-8 group hover:border-brand-primary/20 transition-all"
                >
                    <div className="bg-brand-light w-full md:w-32 h-32 rounded-3xl flex flex-col items-center justify-center text-brand-secondary">
                        <span className="text-xs font-black uppercase tracking-widest opacity-40 mb-1">Status</span>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                                booking.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'
                            }`}>
                            {booking.status}
                        </div>
                    </div>

                    <div className="flex-grow text-center md:text-left">
                        <h4 className="text-xl font-black text-brand-secondary mb-2 group-hover:text-brand-primary transition-colors">{booking.packageName}</h4>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold text-brand-gray-500">
                            <span className="flex items-center gap-2"><FaCalendarAlt className="text-brand-primary/50" /> {new Date(booking.createdAt).toLocaleDateString()}</span>
                            <span className="flex items-center gap-2"><FaUsers className="text-brand-primary/50" /> {booking.travelers} Travelers</span>
                            <span className="flex items-center gap-2 text-brand-secondary"><FaCheckCircle className="text-green-500" /> ID: {booking._id.slice(-6).toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="w-full md:w-auto">
                        <button className="w-full bg-brand-light text-brand-secondary hover:bg-brand-secondary hover:text-white font-black py-4 px-8 rounded-2xl transition-all text-[10px] uppercase tracking-widest">
                            View Details
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default MyBookings;
