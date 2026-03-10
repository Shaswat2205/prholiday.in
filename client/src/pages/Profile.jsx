import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaHistory, FaCog, FaMapMarkerAlt, FaCalendarAlt, FaWallet, FaPiggyBank, FaQuestionCircle, FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/common/SEO';
import MyBookings from '../components/profile/MyBookings';
import axios from 'axios';

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [testimonial, setTestimonial] = useState({ rating: 5, comment: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    if (!user) return null;

    const handleTestimonialSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/testimonials', {
                ...testimonial,
                name: user.name,
                image: user.avatar
            });
            setMessage({ type: 'success', text: 'Thank you for your feedback! It has been submitted for review.' });
            setTestimonial({ rating: 5, comment: '' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to submit testimonial. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const menuItems = [
        { id: 'profile', icon: <FaUser />, name: 'Profile Details' },
        { id: 'bookings', icon: <FaHistory />, name: 'Booking History' },
        { id: 'inquiries', icon: <FaQuestionCircle />, name: 'My Inquiries' },
        { id: 'testimonial', icon: <FaStar />, name: 'Share Experience' },
        { id: 'settings', icon: <FaCog />, name: 'Account Settings' },
    ];

    return (
        <div className="min-h-screen pt-28 pb-20 bg-brand-light">
            <SEO title={`${user.name}'s Profile - PRHolidays`} />

            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Header Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row items-center gap-10 mb-10"
                    >
                        <div className="relative group">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-40 h-40 rounded-[2.5rem] border-4 border-brand-primary/20 object-cover shadow-xl group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="text-center md:text-left flex-grow">
                            <div className="inline-block bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4">
                                Level: Wanderer
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-brand-secondary mb-4">{user.name}</h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-brand-gray-500 font-bold">
                                <span className="flex items-center gap-2"><FaUser className="text-brand-primary" /> {user.email}</span>
                                <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-brand-primary" /> Global Traveler</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                            <div className="bg-brand-light p-6 rounded-3xl text-center">
                                <span className="block text-2xl font-black text-brand-primary">{user.totalSpending || 0}</span>
                                <span className="text-[10px] uppercase font-black tracking-widest text-brand-gray-500">Total Spent</span>
                            </div>
                            <div className="bg-brand-light p-6 rounded-3xl text-center">
                                <span className="block text-2xl font-black text-brand-primary">{user.totalSaving || 0}</span>
                                <span className="text-[10px] uppercase font-black tracking-widest text-brand-gray-500">Savings</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/30 border border-gray-100">
                                <h3 className="text-xl font-black text-brand-secondary mb-8">Traveler Menu</h3>
                                <nav className="space-y-4">
                                    {menuItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === item.id
                                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                                : 'text-brand-gray-500 hover:bg-brand-light hover:text-brand-secondary'
                                                }`}
                                        >
                                            {item.icon} {item.name}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-2 space-y-10">
                            {activeTab === 'bookings' ? (
                                <MyBookings />
                            ) : activeTab === 'inquiries' ? (
                                <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/30 border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-center">
                                    <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center text-4xl mb-6">
                                        📩
                                    </div>
                                    <h3 className="text-2xl font-black text-brand-secondary mb-4">My Inquiries</h3>
                                    <p className="text-brand-gray-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                                        Your inquiries are currently being processed. We will reach out to you soon!
                                    </p>
                                </div>
                            ) : activeTab === 'testimonial' ? (
                                <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/30 border border-gray-100">
                                    <h3 className="text-2xl font-black text-brand-secondary mb-4 text-center">Share Your Experience</h3>
                                    <p className="text-brand-gray-500 font-medium text-center mb-10">We would love to hear about your recent journey with PRHolidays!</p>

                                    {message.text && (
                                        <div className={`p-4 rounded-2xl text-sm font-bold mb-8 text-center ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                            {message.text}
                                        </div>
                                    )}

                                    <form onSubmit={handleTestimonialSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Overall Rating</label>
                                            <div className="flex gap-4">
                                                {[1, 2, 3, 4, 5].map((num) => (
                                                    <button
                                                        key={num}
                                                        type="button"
                                                        onClick={() => setTestimonial({ ...testimonial, rating: num })}
                                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${testimonial.rating >= num ? 'bg-brand-primary text-white' : 'bg-brand-light text-brand-gray-500'}`}
                                                    >
                                                        <FaStar />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Your Story</label>
                                            <textarea
                                                value={testimonial.comment}
                                                onChange={(e) => setTestimonial({ ...testimonial, comment: e.target.value })}
                                                required
                                                rows="5"
                                                className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-6 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                                placeholder="Tell us about your trip..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-brand-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-primary/30 hover:shadow-brand-primary/40 transform active:scale-95 transition-all text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-70"
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Post Review'}
                                        </button>
                                    </form>
                                </div>
                            ) : activeTab === 'profile' ? (
                                <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/30 border border-gray-100">
                                    <h3 className="text-2xl font-black text-brand-secondary mb-8">Account Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <span className="block text-[10px] font-black uppercase tracking-widest text-brand-gray-500 mb-2">Full Name</span>
                                            <p className="font-bold text-lg text-brand-secondary">{user.name}</p>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-black uppercase tracking-widest text-brand-gray-500 mb-2">Email Address</span>
                                            <p className="font-bold text-lg text-brand-secondary">{user.email}</p>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-black uppercase tracking-widest text-brand-gray-500 mb-2">Member Since</span>
                                            <p className="font-bold text-lg text-brand-secondary">{new Date(user.createdAt).getFullYear()}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/30 border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-center">
                                    <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center text-4xl mb-6">
                                        ✈️
                                    </div>
                                    <h3 className="text-2xl font-black text-brand-secondary mb-4">Under Development</h3>
                                    <p className="text-brand-gray-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                                        We are working hard to bring you more features. Stay tuned for updates!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
