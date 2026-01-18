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
                    _id: '3',
                    name: 'Santorini',
                    country: 'Greece',
                    description: 'Famous for its stunning sunsets, whitewashed buildings, and blue-domed churches.',
                    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2070&auto=format&fit=crop'
                },
                {
                    _id: '4',
                    name: 'Dubai',
                    country: 'UAE',
                    description: 'A city of skyscrapers, ports, and beaches, where big business takes place alongside sun-seeking tourism.',
                    image: 'https://images.unsplash.com/photo-1512453979798-5ea90b7cad11?q=80&w=1974&auto=format&fit=crop'
                },
                {
                    _id: '5',
                    name: 'New York',
                    country: 'USA',
                    description: 'The city that never sleeps, famous for Times Square, Central Park, and the Statue of Liberty.',
                    image: 'https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?q=80&w=2070&auto=format&fit=crop'
                },
                {
                    _id: '6',
                    name: 'Venice',
                    country: 'Italy',
                    description: 'A city built on water, known for its canals, bridges, and stunning architecture.',
                    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=2070&auto=format&fit=crop'
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
