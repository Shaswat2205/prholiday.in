import React, { useState, useEffect } from 'react';
import DestinationCard from '../components/common/DestinationCard';
import axios from 'axios';
import SEO from '../components/common/SEO';
import VideoBackground from '../components/common/VideoBackground';
import { motion } from 'framer-motion';

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const res = await axios.get(`/api/destinations`);
                setDestinations(res.data.data);
            } catch (err) {
                console.error('Error fetching destinations:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    return (
        <div className="pt-28 min-h-screen bg-transparent pb-20">
            <SEO
                title="Destinations - PRHolidays"
                description="Explore breathtaking travel destinations curated just for you."
            />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block"
                    >
                        Where to next?
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-brand-secondary mb-6"
                    >
                        Explore <span className="text-brand-primary">Our Destinations</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-brand-gray-500 font-medium max-w-2xl mx-auto text-lg"
                    >
                        From the silent peaks of Himalayas to the serene backwaters of the south,
                        find your perfect escape in our curated collection.
                    </motion.p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-[450px] bg-white rounded-[2.5rem] animate-shimmer"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {destinations.map((dest, idx) => (
                            <div key={dest._id}>
                                <DestinationCard destination={dest} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Destinations;
