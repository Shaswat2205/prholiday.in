import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaHistory, FaHeart, FaImages, FaStar, FaMapMarkerAlt, FaUpload, FaEdit } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/common/SEO';
import MyBookings from '../../components/profile/MyBookings';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const { user, token } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [testimonial, setTestimonial] = useState({ rating: 5, comment: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    
    // Liked Packages state
    const [likedPackages, setLikedPackages] = useState([]);
    
    // Edit Profile state
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({ name: '', bio: '', avatar: '' });

    // Gallery State
    const [galleryUrl, setGalleryUrl] = useState('');
    const [galleryQuote, setGalleryQuote] = useState('');

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                bio: user.bio || '',
                avatar: user.avatar || ''
            });
            if (activeTab === 'liked') {
                fetchLikedPackages();
            }
        }
    }, [user, activeTab]);

    const fetchLikedPackages = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users/liked', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLikedPackages(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!user) return null;

    const handleTestimonialSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/testimonials', {
                ...testimonial,
                name: user.name,
                image: user.avatar
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage({ type: 'success', text: 'Thank you for your feedback! It has been submitted for review.' });
            setTestimonial({ rating: 5, comment: '' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to submit testimonial. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.put('http://localhost:5000/api/users/updatedetails', profileData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage({ type: 'success', text: 'Profile updated successfully! Refresh to see changes.' });
            setIsEditing(false);
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGalleryUpload = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/users/gallery', { imageUrl: galleryUrl, quote: galleryQuote }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage({ type: 'success', text: 'Image added to gallery! Refresh to view.' });
            setGalleryUrl('');
            setGalleryQuote('');
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to add image.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const menuItems = [
        { id: 'profile', icon: <FaUser />, name: 'Profile Details' },
        { id: 'bookings', icon: <FaHistory />, name: 'Booking History' },
        { id: 'liked', icon: <FaHeart />, name: 'Liked Packages' },
        { id: 'gallery', icon: <FaImages />, name: 'My Gallery' },
        { id: 'testimonial', icon: <FaStar />, name: 'Share Experience' },
    ];

    return (
        <div className="min-h-screen pt-28 pb-20 bg-brand-light">
            <SEO title={`${user.name}'s Dashboard - PRHolidays`} />

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
                                Level: Explorer
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-brand-secondary mb-4">{user.name}</h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-brand-gray-500 font-bold">
                                <span className="flex items-center gap-2"><FaUser className="text-brand-primary" /> {user.email}</span>
                                <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-brand-primary" /> Global Traveler</span>
                            </div>
                            {user.bio && <p className="mt-4 text-brand-gray-500 max-w-lg">{user.bio}</p>}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/30 border border-gray-100">
                                <h3 className="text-xl font-black text-brand-secondary mb-8">Dashboard Menu</h3>
                                <nav className="space-y-4">
                                    {menuItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => { setActiveTab(item.id); setMessage({type: '', text: ''}); }}
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
                        <div className="lg:col-span-3 space-y-10">
                            {message.text && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-2xl text-sm font-bold mb-4 text-center ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                    {message.text}
                                </motion.div>
                            )}

                            {activeTab === 'bookings' ? (
                                <MyBookings />
                            ) : activeTab === 'liked' ? (
                                <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/30 border border-gray-100">
                                    <h3 className="text-2xl font-black text-brand-secondary mb-8">Liked Packages</h3>
                                    {likedPackages.length === 0 ? (
                                        <p className="text-brand-gray-500 font-medium text-center">No liked packages yet. Go explore!</p>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {likedPackages.map(pkg => (
                                                <div key={pkg._id} className="border border-gray-100 rounded-3xl p-4 flex gap-4 items-center">
                                                    <img src={pkg.image} className="w-24 h-24 rounded-2xl object-cover" alt={pkg.title} />
                                                    <div>
                                                        <h4 className="font-bold text-brand-secondary">{pkg.title}</h4>
                                                        <p className="text-sm font-bold text-brand-primary">${pkg.price}</p>
                                                        <Link to={`/packages/${pkg._id}`} className="text-xs text-brand-gray-500 hover:text-brand-primary underline mt-2 block">View Details</Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : activeTab === 'gallery' ? (
                                <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/30 border border-gray-100">
                                    <h3 className="text-2xl font-black text-brand-secondary mb-8">My Travel Gallery</h3>
                                    
                                    <form onSubmit={handleGalleryUpload} className="mb-10 flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <input
                                                type="url"
                                                value={galleryUrl}
                                                onChange={(e) => setGalleryUrl(e.target.value)}
                                                placeholder="Paste Image or Instagram URL"
                                                required
                                                className="flex-grow bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none font-bold"
                                            />
                                            <button type="submit" disabled={isSubmitting} className="btn-primary px-8 flex items-center gap-2">
                                                <FaUpload /> Add
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={galleryQuote}
                                            onChange={(e) => setGalleryQuote(e.target.value)}
                                            placeholder="Add a caption for your travel moment (optional)"
                                            className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none font-bold"
                                        />
                                    </form>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 align-top">
                                        {user.gallery && user.gallery.length > 0 ? user.gallery.map((url, idx) => {
                                            const isInstagram = url.includes('instagram.com/p/') || url.includes('instagram.com/reel/');
                                            if (isInstagram) {
                                                let embedUrl = url.split('?')[0];
                                                if (!embedUrl.endsWith('/')) embedUrl += '/';
                                                embedUrl += 'embed';

                                                return (
                                                    <div key={idx} className="w-full h-[400px] rounded-3xl overflow-hidden shadow-lg border-4 border-white hover:scale-105 transition-transform duration-500 bg-gray-50">
                                                        <iframe 
                                                            src={embedUrl}
                                                            className="w-full h-full border-none"
                                                            frameBorder="0" 
                                                            scrolling="yes" 
                                                            allowtransparency="true"
                                                            title={`Instagram post ${idx}`}
                                                        ></iframe>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div key={idx} className="w-full h-64 rounded-3xl overflow-hidden shadow-lg border-4 border-white hover:scale-105 transition-transform duration-500">
                                                    <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                                </div>
                                            );
                                        }) : <p className="col-span-full text-brand-gray-500 font-medium text-center">Your gallery is empty.</p>}
                                    </div>
                                </div>
                            ) : activeTab === 'testimonial' ? (
                                <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/30 border border-gray-100">
                                    <h3 className="text-2xl font-black text-brand-secondary mb-4 text-center">Share Your Experience</h3>
                                    <p className="text-brand-gray-500 font-medium text-center mb-10">We would love to hear about your recent journey with PRHolidays!</p>

                                    <form onSubmit={handleTestimonialSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Overall Rating</label>
                                            <div className="flex gap-4 justify-center">
                                                {[1, 2, 3, 4, 5].map((num) => (
                                                    <button
                                                        key={num}
                                                        type="button"
                                                        onClick={() => setTestimonial({ ...testimonial, rating: num })}
                                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all text-xl ${testimonial.rating >= num ? 'bg-brand-primary text-white scale-110 shadow-lg shadow-brand-primary/30' : 'bg-brand-light text-brand-gray-500 hover:bg-gray-100'}`}
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
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-2xl font-black text-brand-secondary">Account Details</h3>
                                        <button onClick={() => setIsEditing(!isEditing)} className="text-brand-primary flex items-center gap-2 font-bold hover:underline">
                                            <FaEdit /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                                        </button>
                                    </div>
                                    
                                    {isEditing ? (
                                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gray-500 mb-2">Full Name</label>
                                                    <input type="text" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full bg-gray-50 rounded-2xl px-4 py-3 font-bold text-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gray-500 mb-2">Avatar URL</label>
                                                    <input type="text" value={profileData.avatar} onChange={e => setProfileData({...profileData, avatar: e.target.value})} className="w-full bg-gray-50 rounded-2xl px-4 py-3 font-bold text-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-gray-500 mb-2">Bio</label>
                                                    <textarea value={profileData.bio} onChange={e => setProfileData({...profileData, bio: e.target.value})} rows="3" className="w-full bg-gray-50 rounded-2xl px-4 py-3 font-bold text-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"></textarea>
                                                </div>
                                            </div>
                                            <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-4">Save Changes</button>
                                        </form>
                                    ) : (
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
                                            <div className="md:col-span-2">
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-brand-gray-500 mb-2">Bio</span>
                                                <p className="font-bold text-lg text-brand-secondary">{user.bio || 'Add a bio to tell others about yourself.'}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
