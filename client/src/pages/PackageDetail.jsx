import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaUser, FaStar, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import BookingForm from '../components/packages/BookingForm';
import ImageGallery from 'react-image-gallery';

const PackageDetail = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data fetch
        setTimeout(() => {
            setPkg({
                _id: id,
                name: 'Bali Paradise Retreat',
                description: 'Experience the magic of Bali with stunning beaches, temples, and lush landscapes. This comprehensive package takes you through the heart of Balinese culture and nature.',
                price: 1200,
                duration: { days: 7, nights: 6 },
                maxPax: 10,
                rating: { average: 4.8, count: 24 },
                images: [
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2062&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?q=80&w=2076&auto=format&fit=crop'
                ],
                itinerary: [
                    "Day 1: Arrival in Denpasar and transfer to Ubud hotel",
                    "Day 2: Sacred Monkey Forest and Tegallalang Rice Terrace",
                    "Day 3: Kintamani Volcano and Coffee Plantation",
                    "Day 4: Transfer to Seminyak, sunset at Tanah Lot Temple",
                    "Day 5: Free day for beach activities or shopping",
                    "Day 6: Uluwatu Temple and Kecak Fire Dance",
                    "Day 7: Departure"
                ],
                inclusions: [
                    "Airport transfers",
                    "Accommodation in 4-star hotels",
                    "Daily breakfast",
                    "English speaking guide",
                    "Entrance fees"
                ],
                exclusions: [
                    "International flights",
                    "Visa fees",
                    "Personal expenses",
                    "Tips"
                ]
            });
            setLoading(false);
        }, 1000);
    }, [id]);

    if (loading) return <div className="pt-32 text-center text-white">Loading...</div>;
    if (!pkg) return <div className="pt-32 text-center text-white">Package not found</div>;

    const galleryImages = pkg.images.map(img => ({
        original: img,
        thumbnail: img
    }));

    return (
        <div className="pt-24 min-h-screen bg-primary-end pb-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2">
                        <h1 className="text-4xl font-bold text-white mb-4">{pkg.name}</h1>
                        <div className="flex items-center space-x-6 text-gray-300 mb-8">
                            <span className="flex items-center"><FaClock className="mr-2 text-secondary-cyan" /> {pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
                            <span className="flex items-center"><FaUser className="mr-2 text-secondary-cyan" /> Max {pkg.maxPax} Pax</span>
                            <span className="flex items-center"><FaStar className="mr-2 text-secondary-gold" /> {pkg.rating.average} ({pkg.rating.count} reviews)</span>
                        </div>

                        <div className="rounded-xl overflow-hidden mb-8 border border-white/10">
                            <ImageGallery items={galleryImages} showPlayButton={false} />
                        </div>

                        <div className="bg-white/5 p-8 rounded-xl border border-white/10 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                            <p className="text-gray-300 leading-relaxed">{pkg.description}</p>
                        </div>

                        <div className="bg-white/5 p-8 rounded-xl border border-white/10 mb-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Itinerary</h2>
                            <div className="space-y-4">
                                {pkg.itinerary.map((day, index) => (
                                    <div key={index} className="flex">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary-cyan flex items-center justify-center font-bold text-black mt-1">
                                            {index + 1}
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-gray-300">{day}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-green-500/10 p-6 rounded-xl border border-green-500/20">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center"><FaCheckCircle className="mr-2 text-green-500" /> Inclusions</h3>
                                <ul className="space-y-2 text-gray-300">
                                    {pkg.inclusions.map((item, i) => <li key={i}>• {item}</li>)}
                                </ul>
                            </div>
                            <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center"><FaTimesCircle className="mr-2 text-red-500" /> Exclusions</h3>
                                <ul className="space-y-2 text-gray-300">
                                    {pkg.exclusions.map((item, i) => <li key={i}>• {item}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <BookingForm packageId={pkg._id} packageName={pkg.name} price={pkg.price} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetail;
