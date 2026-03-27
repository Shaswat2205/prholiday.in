import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaShieldAlt, FaHeadset, FaPercent } from 'react-icons/fa';
import axios from 'axios';

const features = [
    {
        title: 'Global Coverage',
        description: 'Explore over 500+ destinations across 50 countries with our expert local guides.',
        icon: <FaGlobeAmericas />,
        color: 'bg-blue-50 text-blue-600'
    },
    {
        title: 'Safe & Secure',
        description: 'Your safety is our priority. We partner with only certified and highly-rated vendors.',
        icon: <FaShieldAlt />,
        color: 'bg-green-50 text-green-600'
    },
    {
        title: '24/7 Support',
        description: 'Need help during your trip? Our dedicated support team is available around the clock.',
        icon: <FaHeadset />,
        color: 'bg-purple-50 text-purple-600'
    },
    {
        title: 'Best Price Guarantee',
        description: 'Found a better price? We\’ll match it. Transparent pricing with no hidden costs.',
        icon: <FaPercent />,
        color: 'bg-orange-50 text-brand-primary'
    }
];

const WhyChooseUs = () => {
    const [stats, setStats] = useState({
        happyTravelers: '1000+',
        destinations: '500+',
        positiveReviews: '100+'
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/api/stats');
                if (res.data.success) {
                    const { happyTravelers, destinations, positiveReviews } = res.data.data;
                    setStats({
                        happyTravelers: `${happyTravelers}+`,
                        destinations: `${destinations}+`,
                        positiveReviews: `${positiveReviews}+`
                    });
                }
            } catch (err) {
                console.error('Error fetching stats:', err);
            }
        };
        fetchStats();
    }, []);

    const statItems = [
        { label: 'Happy Travelers', val: stats.happyTravelers },
        { label: 'Destinations', val: stats.destinations },
        { label: 'Positive Reviews', val: stats.positiveReviews }
    ];

    return (
        <section className="py-24 bg-brand-light relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-primary font-extrabold uppercase tracking-[0.2em] text-xs mb-4 block"
                    >
                        Our Commitment
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-brand-secondary leading-tight"
                    >
                        Why Thousands of Travelers <br />
                        <span className="text-brand-primary">Trust PRHolidays</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.1,
                                type: 'spring',
                                stiffness: 260,
                                damping: 20
                            }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 border border-gray-50 flex flex-col items-center text-center group"
                        >
                            <div className={`w-20 h-20 ${feature.color} rounded-3xl flex items-center justify-center text-3xl mb-8 transform transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110 shadow-inner`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-brand-secondary mb-4 group-hover:text-brand-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-brand-gray-500 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Counter Section with Actual Logic */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 bg-brand-secondary rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-primary/10 opacity-30"></div>
                    {statItems.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + (idx * 0.1) }}
                            className="text-center relative z-10"
                        >
                            <div className="text-4xl md:text-5xl font-black text-brand-primary mb-3">{stat.val}</div>
                            <div className="text-white/70 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
