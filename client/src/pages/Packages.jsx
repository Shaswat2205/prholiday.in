import React, { useState, useEffect } from 'react';
import PackageCard from '../components/common/PackageCard';
import axios from 'axios';
import SEO from '../components/common/SEO';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPackages([
                {
                    _id: '1',
                    name: 'Family Fun in Goa',
                    description: 'Enjoy the beaches and nightlife of Goa with your family.',
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
                },
                {
                    _id: '4',
                    name: 'Japan Cherry Blossom',
                    description: 'Visit Tokyo and Kyoto during the beautiful sakura season.',
                    price: 2800,
                    duration: { days: 8, nights: 7 },
                    maxPax: 8,
                    rating: { average: 4.7 },
                    images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop']
                },
                {
                    _id: '5',
                    name: 'Safari in Kenya',
                    description: 'Witness the great migration and see the big five in their natural habitat.',
                    price: 3200,
                    duration: { days: 6, nights: 5 },
                    maxPax: 6,
                    rating: { average: 4.9 },
                    images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop']
                },
                {
                    _id: '6',
                    name: 'Paris Romantic Getaway',
                    description: 'Experience the city of love with a private tour and dinner cruise.',
                    price: 1800,
                    duration: { days: 4, nights: 3 },
                    maxPax: 2,
                    rating: { average: 4.6 },
                    images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop']
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="pt-24 min-h-screen bg-primary-end pb-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-white text-center mb-4">All <span className="text-secondary-cyan">Packages</span></h1>
                <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Discover our full range of curated travel experiences designed to create unforgettable memories.</p>

                {loading ? (
                    <div className="text-center text-white">Loading packages...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packages.map(pkg => (
                            <PackageCard key={pkg._id} pkg={pkg} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Packages;
