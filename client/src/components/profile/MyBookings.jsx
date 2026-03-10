import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaClock, FaCheckCircle, FaSpinner, FaTimes, FaWallet, FaInfoCircle, FaCalendarCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);

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
                        <button 
                            onClick={() => setSelectedBooking(booking)}
                            className="w-full bg-brand-light text-brand-secondary hover:bg-brand-secondary hover:text-white font-black py-4 px-8 rounded-2xl transition-all text-[10px] uppercase tracking-widest"
                        >
                            View Details
                        </button>
                    </div>
                </motion.div>
            ))}

            {/* Trip Details Modal */}
            <AnimatePresence>
                {selectedBooking && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-brand-secondary/80 backdrop-blur-sm"
                            onClick={() => setSelectedBooking(null)}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="bg-white rounded-[3rem] p-8 md:p-12 w-full max-w-2xl relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            <button 
                                onClick={() => setSelectedBooking(null)}
                                className="absolute top-6 right-6 w-12 h-12 bg-gray-50 text-brand-gray-500 hover:text-brand-secondary hover:bg-gray-100 rounded-full flex items-center justify-center transition-all"
                            >
                                <FaTimes />
                            </button>

                            <div className="mb-8 pr-12">
                                <span className="inline-block px-4 py-2 bg-brand-light text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                                    Booking Details
                                </span>
                                <h3 className="text-3xl font-black text-brand-secondary mb-2">{selectedBooking.packageName}</h3>
                                <p className="text-sm font-bold text-brand-gray-500 uppercase tracking-widest">
                                    ID: <span className="text-brand-primary">{selectedBooking._id}</span>
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                                    <div className="flex items-center gap-3 text-brand-primary mb-2">
                                        <FaCalendarCheck />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-gray-500">Travel Date</span>
                                    </div>
                                    <p className="font-bold text-brand-secondary text-lg">
                                        {selectedBooking.travelDate ? new Date(selectedBooking.travelDate).toLocaleDateString() : 'To be confirmed'}
                                    </p>
                                </div>
                                
                                <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                                    <div className="flex items-center gap-3 text-brand-primary mb-2">
                                        <FaUsers />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-gray-500">Travelers</span>
                                    </div>
                                    <p className="font-bold text-brand-secondary text-lg">
                                        {selectedBooking.travelers} Person(s)
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                                    <div className="flex items-center gap-3 text-brand-primary mb-2">
                                        <FaWallet />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-gray-500">Total Price</span>
                                    </div>
                                    <p className="font-bold text-brand-secondary text-lg">
                                        ₹{selectedBooking.totalPrice?.toLocaleString() || 'Pending'}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                                    <div className="flex items-center gap-3 text-brand-primary mb-2">
                                        <FaInfoCircle />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-gray-500">Current Status</span>
                                    </div>
                                    <p className={`font-bold text-lg inline-block px-3 py-1 rounded-full text-sm mt-1 uppercase tracking-wider
                                        ${selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                                        selectedBooking.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                                        'bg-gray-200 text-gray-600'}`}>
                                        {selectedBooking.status}
                                    </p>
                                </div>
                            </div>

                            {selectedBooking.specialRequests && (
                                <div className="bg-brand-light/30 border-2 border-brand-light p-6 rounded-[2rem] mb-8">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-primary mb-3">Special Requests</h4>
                                    <p className="font-medium text-brand-secondary italic">
                                        "{selectedBooking.specialRequests}"
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-between items-center bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-gray-500 mb-1">Payment Method</p>
                                    <p className="font-bold text-brand-secondary capitalize">{selectedBooking.paymentMode ? selectedBooking.paymentMode.replace('-', ' ') : 'Contacting Office'}</p>
                                </div>
                                {selectedBooking.packageId && (
                                    <Link 
                                        to={`/packages/${typeof selectedBooking.packageId === 'object' ? selectedBooking.packageId._id : selectedBooking.packageId}`}
                                        className="bg-brand-secondary text-white font-black py-4 px-8 rounded-2xl hover:bg-brand-primary transition-colors text-[10px] uppercase tracking-widest shadow-lg"
                                    >
                                        View Tour Package
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyBookings;
