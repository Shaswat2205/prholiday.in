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
                    name: '12 Jyotirlinga Spiritual Journey',
                    description: 'A sacred pilgrimage covering all 12 Jyotirlingas across India.',
                    price: 45000,
                    duration: { days: 21, nights: 20 },
                    maxPax: 15,
                    rating: { average: 5.0 },
                    images: ['https://images.unsplash.com/photo-1627885481747-d5dc74191d83?q=80&w=2070&auto=format&fit=crop']
                },
                {
                    _id: '2',
                    name: 'Spiti Valley Adventure',
                    description: 'Experience the rugged beauty of the Himalayas in the Spiti Valley.',
                    price: 22000,
                    duration: { days: 8, nights: 7 },
                    maxPax: 10,
                    rating: { average: 4.9 },
                    images: ['https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2070&auto=format&fit=crop']
                },
                {
                    _id: '3',
                    name: 'Sikkim Silk Route Expedition',
                    description: 'Explore the ancient silk route and pristine lakes of North Sikkim.',
                    price: 18500,
                    duration: { days: 6, nights: 5 },
                    maxPax: 8,
                    rating: { average: 4.8 },
                    images: ['https://images.unsplash.com/photo-1589135410978-c4416f182e17?q=80&w=2070&auto=format&fit=crop']
                },
                {
                    _id: '4',
                    name: 'Kerala Backwaters & Hills',
                    description: 'Unwind in the houseboats of Alleppey and tea gardens of Munnar.',
                    price: 15000,
                    duration: { days: 5, nights: 4 },
                    maxPax: 6,
                    rating: { average: 4.9 },
                    images: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop']
                },
                {
                    _id: '5',
                    name: 'Karnataka Heritage & Nature',
                    description: 'Visit the ruins of Hampi and the coffee plantations of Coorg.',
                    price: 12500,
                    duration: { days: 4, nights: 3 },
                    maxPax: 6,
                    rating: { average: 4.7 },
                    images: ['https://images.unsplash.com/photo-1600213133273-047b74f07530?q=80&w=2070&auto=format&fit=crop']
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
