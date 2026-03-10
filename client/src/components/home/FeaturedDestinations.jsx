import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Parallax } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
                    packages: 120,
                    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop'
                },
                {
                    _id: '2',
                    name: 'Kyoto',
                    country: 'Japan',
                    packages: 85,
                    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop'
                },
                {
                    _id: '3',
                    name: 'Santorini',
                    country: 'Greece',
                    packages: 64,
                    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop'
                },
                {
                    _id: '4',
                    name: 'Dubai',
                    country: 'UAE',
                    packages: 150,
                    image: 'https://images.unsplash.com/photo-1512453979798-5ea90b7cad11?q=80&w=1000&auto=format&fit=crop'
                },
                {
                    _id: '5',
                    name: 'Bali',
                    country: 'Indonesia',
                    packages: 200,
                    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop'
                }
            ]);
            setLoading(false);
        }, 800);
    }, []);

    if (loading) {
        return (
            <div className="flex gap-6 overflow-hidden">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="min-w-[300px] h-[400px] rounded-2xl shimmer" />
                ))}
            </div>
        );
    }

    return (
        <section className="py-20 bg-brand-light">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-brand-primary font-bold uppercase tracking-widest text-sm"
                        >
                            Top Picked
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl font-bold text-brand-secondary mt-2"
                        >
                            Dream <span className="text-brand-primary">Destinations</span>
                        </motion.h2>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay, Parallax]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    parallax={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    className="destination-swiper pb-12"
                >
                    {destinations.map((dest) => (
                        <SwiperSlide key={dest._id}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="relative h-[450px] rounded-3xl overflow-hidden group shadow-xl"
                            >
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    data-swiper-parallax="20%"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-transparent group-hover:from-brand-primary/80 transition-colors duration-500"></div>

                                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-3xl font-bold text-white mb-1" data-swiper-parallax="-100">
                                        {dest.name}
                                    </h3>
                                    <p className="text-white/80 font-medium mb-4" data-swiper-parallax="-200">
                                        {dest.country}
                                    </p>
                                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <span className="text-white text-sm font-semibold">
                                            {dest.packages}+ Packages
                                        </span>
                                        <Link
                                            to={`/destinations/${dest._id}`}
                                            className="bg-white text-brand-primary p-3 rounded-full hover:bg-brand-primary hover:text-white transition-all transform hover:rotate-45"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FeaturedDestinations;
