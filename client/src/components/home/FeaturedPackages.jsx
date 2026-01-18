import React, { useEffect, useState } from 'react';
import PackageCard from '../common/PackageCard';
// import { getFeaturedPackages } from '../../services/packageService'; // To be implemented

const FeaturedPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data for now
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setPackages([
                {
                    _id: '1',
                    name: 'Bali Paradise Retreat',
                    description: 'Experience the magic of Bali with stunning beaches, temples, and lush landscapes.',
                    price: 1200,
                    duration: { days: 7, nights: 6 },
                    maxPax: 10,
                    rating: { average: 4.8 },
                    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076&auto=format&fit=crop']
                },
                {
                    _id: '2',
                    name: 'Swiss Alps Adventure',
                    description: 'Skiing, hiking, and breathtaking views in the heart of Switzerland.',
                    price: 2500,
                    duration: { days: 5, nights: 4 },
                    maxPax: 6,
                    rating: { average: 4.9 },
                    images: ['https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop']
                },
                {
                    _id: '3',
                    name: 'Maldives Luxury Escape',
                    description: 'Stay in overwater bungalows and dive into crystal clear waters.',
                    price: 3500,
                    duration: { days: 4, nights: 3 },
                    maxPax: 2,
                    rating: { average: 5.0 },
                    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop']
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return <div className="text-center text-white pt-10">Loading packages...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map(pkg => (
                <PackageCard key={pkg._id} pkg={pkg} />
            ))}
        </div>
    );
};

export default FeaturedPackages;
