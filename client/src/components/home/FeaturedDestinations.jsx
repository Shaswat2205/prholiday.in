import React, { useState, useEffect } from 'react';
import DestinationCard from '../common/DestinationCard';

const FeaturedDestinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data
        setTimeout(() => {
            setDestinations([
                {
                    _id: '1',
                    name: 'Paris',
                    country: 'France',
                    description: 'The City of Light, offering iconic landmarks like the Eiffel Tower and world-class cuisine.',
                    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop'
                },
                {
                    _id: '2',
                    name: 'Kyoto',
                    country: 'Japan',
                    description: 'Discover ancient temples, traditional tea houses, and sublime gardens.',
                    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop'
                },
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
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return <div className="text-center text-white">Loading destinations...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map(dest => (
                <DestinationCard key={dest._id} destination={dest} />
            ))}
        </div>
    );
};

export default FeaturedDestinations;
