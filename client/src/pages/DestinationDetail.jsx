import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PackageCard from '../components/common/PackageCard';
import { FaMapMarkerAlt } from 'react-icons/fa';
import SEO from '../components/common/SEO';
import { motion } from 'framer-motion';
import axios from 'axios';

const DestinationDetail = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);
    const [packages, setPackages] = useState([]); // Packages in this destination
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestinationData = async () => {
            try {
                // Fetch destination details
                const destRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/destinations/${id}`);
                setDestination(destRes.data.data);

                // Fetch related packages
                const pkgRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/packages?destination=${id}`);
                setPackages(pkgRes.data.data);
            } catch (err) {
                console.error('Error fetching destination data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinationData();
    }, [id]);

    if (loading) return (
        <div className="pt-32 min-h-screen bg-brand-light flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!destination) return <div className="pt-32 text-center text-brand-secondary font-black">Destination not found</div>;

    return (
        <div className="min-h-screen bg-brand-light pb-20">
            <SEO title={`${destination.name} - PRHolidays`} description={destination.description} />

            {/* Hero for Destination */}
            <section className="relative h-[65vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-brand-secondary/40 to-transparent"></div>
                </div>
                <div className="relative z-10 container mx-auto px-4 mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-2 text-brand-primary text-sm font-black uppercase tracking-[0.3em] mb-4">
                            <FaMapMarkerAlt /> {destination.country}
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight">
                            {destination.name}
                        </h1>
                        <div className="w-24 h-2 bg-brand-primary rounded-full"></div>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 max-w-5xl mx-auto mb-20"
                >
                    <h2 className="text-2xl font-black text-brand-secondary mb-8 uppercase tracking-widest text-center">About {destination.name}</h2>
                    <p className="text-brand-gray-500 font-medium leading-[2.2] text-xl text-center italic">
                        "{destination.description}"
                    </p>
                </motion.div>

                <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-brand-secondary mb-4">
                            Available <span className="text-brand-primary">Experiences</span>
                        </h2>
                        <p className="text-brand-gray-500 font-bold">
                            Discover {packages.length} curated tour packages in {destination.name}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {packages.length > 0 ? (
                        packages.map((pkg, idx) => (
                            <motion.div
                                key={pkg._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <PackageCard pkg={pkg} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-brand-gray-500 font-bold text-xl opacity-50">No packages available for this destination yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DestinationDetail;
