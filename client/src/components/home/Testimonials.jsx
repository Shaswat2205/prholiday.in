import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await axios.get(`/api/testimonials`);
                setTestimonials(res.data.data);
            } catch (err) {
                console.error('Error fetching testimonials:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) {
        return (
            <div className="py-24 bg-white flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
            </div>
        );
    }

    if (!loading && testimonials.length === 0) {
        return null; // Or show a default section if preferred
    }

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-primary font-bold uppercase tracking-widest text-sm"
                    >
                        Testimonials
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-brand-secondary mt-2"
                    >
                        Voices of Our <span className="text-brand-primary">Happy Travelers</span>
                    </motion.h2>
                </div>

                <div className="max-w-5xl mx-auto">
                    <Swiper
                        modules={[Autoplay, EffectFade, Pagination]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        className="testimonial-swiper"
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={item._id}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-8 md:p-16 bg-brand-light rounded-[3rem] shadow-inner">
                                    <div className="relative group">
                                        <div className="relative w-full aspect-square md:aspect-auto md:h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                                            <img
                                                src={item.image || (item.user && item.user.avatar) || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop'}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-primary rounded-3xl flex items-center justify-center text-white text-4xl shadow-xl animate-bounce-slow">
                                            <FaQuoteLeft />
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                                    viewport={{ once: true }}
                                                >
                                                    <FaStar className={`text-2xl ${i < item.rating ? 'text-brand-accent' : 'text-gray-200'}`} />
                                                </motion.div>
                                            ))}
                                        </div>
                                        <p className="text-xl md:text-2xl font-medium text-brand-secondary italic leading-relaxed">
                                            "{item.review}"
                                        </p>
                                        <div>
                                            <h3 className="text-2xl font-extrabold text-brand-secondary">{item.name}</h3>
                                            <p className="text-brand-primary font-bold">Verified Traveler</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
