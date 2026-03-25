import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaClock, FaUser, FaStar, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import BookingForm from '../components/packages/BookingForm';
import ImageGallery from 'react-image-gallery';

const PackageDetail = () => {
    // Logic to ensure images work in production/local
    const getImageUrl = (url) => {
        if (!url) return 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80';
        return url.replace('http://localhost:5000', '');
    };

    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Overview');

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const res = await axios.get(`/api/packages/${id}`);
                setPkg(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPackage();
    }, [id]);

    if (loading) return (
        <div className="pt-32 min-h-screen bg-transparent flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!pkg) return <div className="pt-32 text-center text-brand-secondary font-black">Package not found</div>;

    const tabs = ['Overview', 'Itinerary', 'What\'s Included', 'Gallery'];

    return (
        <div className="pt-20 min-h-screen bg-transparent">
            <SEO title={`${pkg.name} - PRHolidays`} description={pkg.description} />

            {/* Project Hero */}
            <div className="relative h-[60vh]">
                <img src={getImageUrl(pkg.images && pkg.images[0] ? pkg.images[0] : null)} className="w-full h-full object-cover" alt={pkg.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-brand-secondary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-12">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-[0.3em] mb-4">
                                <FaMapMarkerAlt /> {pkg.location}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight max-w-4xl">
                                {pkg.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-white/80 font-bold text-sm">
                                <span className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                                    <FaClock className="mr-2 text-brand-primary" /> {pkg.duration.days}D / {pkg.duration.nights}N
                                </span>
                                <span className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                                    <FaUser className="mr-2 text-brand-primary" /> Max {pkg.maxPax} Guests
                                </span>
                                <span className="flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                                    <FaStar className="mr-2 text-brand-accent" /> {pkg.rating.average} ({pkg.rating.count} Reviews)
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Tabs Navigation */}
                        <div className="flex gap-2 bg-white p-2 rounded-3xl shadow-xl overflow-x-auto no-scrollbar">
                            {tabs.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab
                                        ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30'
                                        : 'text-brand-gray-500 hover:text-brand-secondary hover:bg-gray-50'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100"
                        >
                            {activeTab === 'Overview' && (
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-black text-brand-secondary">Trip Highlights</h2>
                                    <p className="text-brand-gray-500 font-medium leading-[2] text-lg">
                                        {pkg.description}
                                    </p>
                                    <div className="grid grid-cols-2 gap-6 pt-6">
                                        <div className="p-6 bg-brand-light rounded-2xl border border-brand-primary/5">
                                            <h4 className="font-black text-brand-secondary mb-2">Ideal Duration</h4>
                                            <p className="text-brand-gray-500 font-bold">{pkg.duration.days} Days</p>
                                        </div>
                                        <div className="p-6 bg-brand-light rounded-2xl border border-brand-primary/5">
                                            <h4 className="font-black text-brand-secondary mb-2">Group Size</h4>
                                            <p className="text-brand-gray-500 font-bold">Up to {pkg.maxPax} People</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Itinerary' && (
                                <div className="space-y-8">
                                    {pkg.itinerary && pkg.itinerary.map((day, idx) => (
                                        <div key={idx} className="flex gap-6 group">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-black shadow-lg shadow-brand-primary/20">
                                                    {typeof day === 'object' ? day.day : idx + 1}
                                                </div>
                                            </div>
                                            <div className="pb-8 border-b border-gray-100 last:border-0 w-full">
                                                <h3 className="text-xl font-black text-brand-secondary mb-2 group-hover:text-brand-primary transition-colors">
                                                    {typeof day === 'object' ? day.title : `Day ${idx + 1}`}
                                                </h3>
                                                <p className="text-brand-gray-500 font-medium leading-relaxed">
                                                    {typeof day === 'object' ? day.desc : day}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'What\'s Included' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-black text-brand-secondary flex items-center gap-3">
                                            <FaCheckCircle className="text-green-500" /> Inclusions
                                        </h3>
                                        <ul className="space-y-4">
                                        {pkg.inclusions && pkg.inclusions.map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-brand-gray-500 font-bold">
                                                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                                                {item}
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-black text-brand-secondary flex items-center gap-3">
                                            <FaTimesCircle className="text-red-500" /> Exclusions
                                        </h3>
                                        <ul className="space-y-4">
                                        {pkg.exclusions && pkg.exclusions.map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-brand-gray-500 font-bold opacity-60">
                                                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                                                {item}
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                                {activeTab === 'Gallery' && (
                                <div className="grid grid-cols-2 gap-4">
                                    {pkg.images && pkg.images.map((img, i) => (
                                        <div key={i} className="relative h-64 rounded-3xl overflow-hidden group">
                                            <img src={getImageUrl(img)} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            <BookingForm packageId={pkg._id} packageName={pkg.name} price={pkg.price} />

                            <div className="bg-brand-secondary rounded-[2.5rem] p-10 text-white relative overflow-hidden group border border-white/5">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-black mb-4">Book with Confidence</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <FaCheckCircle className="text-brand-primary" />
                                            <span className="text-sm font-bold opacity-80">Free Cancellation</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaCheckCircle className="text-brand-primary" />
                                            <span className="text-sm font-bold opacity-80">24/7 Priority Support</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaCheckCircle className="text-brand-primary" />
                                            <span className="text-sm font-bold opacity-80">Best Price Guarantee</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetail;
