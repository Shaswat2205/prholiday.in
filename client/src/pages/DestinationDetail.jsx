import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PackageCard from '../components/common/PackageCard';

const DestinationDetail = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);
    const [packages, setPackages] = useState([]); // Packages in this destination
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data fetch
        setTimeout(() => {
            setDestination({
                _id: id,
                name: 'Bali',
                country: 'Indonesia',
                description: 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.',
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076&auto=format&fit=crop'
            });
            // Mock related packages
            setPackages([
                {
                    _id: '1',
                    name: 'Bali Paradise Retreat',
                    description: 'The ultimate Bali experience.',
                    price: 1200,
                    duration: { days: 7, nights: 6 },
                    maxPax: 10,
                    rating: { average: 4.8 },
                    images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076&auto=format&fit=crop']
                }
            ]);
            setLoading(false);
        }, 1000);
    }, [id]);

    if (loading) return <div className="pt-32 text-center text-white">Loading...</div>;
    if (!destination) return <div className="pt-32 text-center text-white">Destination not found</div>;

    return (
        <div className="min-h-screen bg-primary-end pb-20">
            {/* Hero for Destination */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-primary-end"></div>
                </div>
                <div className="relative z-10 text-center container px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">{destination.name}</h1>
                    <p className="text-2xl text-secondary-gold font-medium">{destination.country}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl max-w-4xl mx-auto mb-16 text-center text-gray-200 text-lg">
                    {destination.description}
                </div>

                <h2 className="text-3xl font-bold text-white mb-8">Available Packages in {destination.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.length > 0 ? (
                        packages.map(pkg => (
                            <PackageCard key={pkg._id} pkg={pkg} />
                        ))
                    ) : (
                        <p className="text-gray-400">No packages available for this destination yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DestinationDetail;
