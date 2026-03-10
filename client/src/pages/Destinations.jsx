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
        setTimeout(() => {
            setDestinations([
                {
                    _id: '1',
                    name: 'Spiti Valley',
                    country: 'India',
                    description: 'A cold desert mountain valley in the Himalayas, known for its stunning landscapes and ancient monasteries.',
                    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop'
                },
                {
                    _id: '2',
                    name: 'Sikkim',
                    country: 'India',
                    description: 'A mystical land of rugged mountains, deep valleys, and beautiful Buddhist monasteries.',
                    image: 'https://images.unsplash.com/photo-1589135410978-c4416f182e17?q=80&w=1200&auto=format&fit=crop'
                },
                {
                    _id: '3',
                    name: 'Kerala',
                    country: 'India',
                    description: "God's Own Country, famous for its backwaters, palm-fringed beaches, and lush greenery.",
                    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop'
                },
                {
                    _id: '4',
                    name: 'Karnataka',
                    country: 'India',
                    description: 'A diverse state known for its heritage sites in Hampi, lush forests of Coorg, and tech hub Bengaluru.',
                    image: 'https://images.unsplash.com/photo-1600213133273-047b74f07530?q=80&w=1200&auto=format&fit=crop'
                }
            ]);
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div className="pt-28 min-h-screen bg-brand-light pb-20">
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
