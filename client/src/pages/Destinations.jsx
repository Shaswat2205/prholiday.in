import React, { useState, useEffect } from 'react';
import DestinationCard from '../components/common/DestinationCard';
import axios from 'axios';
import SEO from '../components/common/SEO';
import VideoBackground from '../components/common/VideoBackground';

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
                    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2070&auto=format&fit=crop'
                },
                {
                    _id: '2',
                    name: 'Sikkim',
                    country: 'India',
                    description: 'A mystical land of rugged mountains, deep valleys, and beautiful Buddhist monasteries.',
                    image: 'https://images.unsplash.com/photo-1589135410978-c4416f182e17?q=80&w=2070&auto=format&fit=crop'
                },
                {
                    _id: '3',
                    name: 'Kerala',
                    country: 'India',
                    description: "God's Own Country, famous for its backwaters, palm-fringed beaches, and lush greenery.",
                    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop'
                },
                {
                    _id: '4',
                    name: 'Karnataka',
                    country: 'India',
                    description: 'A diverse state known for its heritage sites in Hampi, lush forests of Coorg, and tech hub Bengaluru.',
                    image: 'https://images.unsplash.com/photo-1600213133273-047b74f07530?q=80&w=2070&auto=format&fit=crop'
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <VideoBackground
            src="/videos/mountain.mp4"
            overlayOpacity={0.5}
        >
            <div className="pt-24 min-h-screen pb-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white text-center mb-4 text-shadow-lg">Explore <span className="text-secondary-gold">Destinations</span></h1>
                    <p className="text-gray-200 text-center mb-12 max-w-2xl mx-auto font-medium text-lg drop-shadow-md">Travel to the most breathtaking locations around the globe.</p>

                    {loading ? (
                        <div className="text-center text-white">Loading destinations...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {destinations.map(dest => (
                                <DestinationCard key={dest._id} destination={dest} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </VideoBackground>
    );
};

export default Destinations;
