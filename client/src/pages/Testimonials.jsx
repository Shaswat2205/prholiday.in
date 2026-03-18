import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import SEO from '../components/common/SEO';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                // Fetch public testimonials
                const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/testimonials`);
                // Filter to show only approved ones if the endpoint returns all
                const approved = res.data.data.filter(t => t.status === 'approved' && t.active);
                setTestimonials(approved);
            } catch (err) {
                console.error('Error fetching testimonials:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <div className="min-h-screen bg-brand-light pt-32 pb-20">
            <SEO title="Testimonials - PRHolidays" description="Read what our travelers have to say about their PRHolidays experiences." />
            
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-black text-brand-primary uppercase tracking-[0.3em] mb-4">
                        Traveler Voices
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-black text-brand-secondary mb-6 leading-tight">
                        Don't Just Take Our <br /> Word For It
                    </h1>
                    <p className="text-brand-gray-500 font-medium text-lg">
                        Discover the unforgettable memories and extraordinary adventures our guests have experienced with PRHolidays.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-brand-gray-500 font-medium text-lg">No testimonials available at the moment. Check back soon!</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 max-w-7xl mx-auto space-y-8">
                        {testimonials.map((testimonial, idx) => (
                            <motion.div
                                key={testimonial._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="break-inside-avoid bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 relative border border-gray-100 flex flex-col hover:-translate-y-2 transition-transform duration-300 min-h-min"
                            >
                                <div className="absolute top-6 right-8 text-brand-primary/10">
                                    <FaQuoteLeft size={48} />
                                </div>
                                
                                <div className="flex gap-1 text-yellow-400 mb-6 relative z-10">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-brand-gray-300"} size={14} />
                                    ))}
                                </div>
                                
                                <p className="text-brand-gray-500 font-medium leading-relaxed mb-6 flex-grow relative z-10 text-sm md:text-base">
                                    "{testimonial.review}"
                                </p>

                                {(() => {
                                    const isInstaMedia = testimonial.image && (testimonial.image.includes('instagram.com/p/') || testimonial.image.includes('instagram.com/reel/'));
                                    if (isInstaMedia) {
                                        let embedUrl = testimonial.image.split('?')[0];
                                        if (!embedUrl.endsWith('/')) embedUrl += '/';
                                        embedUrl += 'embed';
                                        return (
                                            <div className="w-full rounded-xl overflow-hidden shadow-inner mb-6 relative z-10 bg-gray-50 aspect-[4/5] min-h-[350px]">
                                                <iframe 
                                                    src={embedUrl}
                                                    className="w-full h-full border-none"
                                                    frameBorder="0" 
                                                    scrolling="no" 
                                                    title={`Instagram by ${testimonial.name}`}
                                                ></iframe>
                                            </div>
                                        );
                                    } else if (testimonial.image) {
                                        return (
                                            <div className="w-full rounded-xl overflow-hidden shadow-inner mb-6 relative z-10">
                                                <img src={testimonial.image} alt="Travel Media" className="w-full h-auto object-cover hover:scale-105 transition-transform" />
                                            </div>
                                        );
                                    }
                                    return null;
                                })()}
                                
                                <div className="flex items-center gap-4 mt-auto relative z-10 border-t border-gray-100 pt-6">
                                    <div className="w-12 h-12 rounded-full border-2 border-brand-primary/20 overflow-hidden flex-shrink-0 relative group">
                                        {(() => {
                                            const isInsta = testimonial.image && (testimonial.image.includes('instagram.com/p/') || testimonial.image.includes('instagram.com/reel/'));
                                            return isInsta ? (
                                                <div className="w-full h-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                    IG
                                                </div>
                                            ) : (
                                                <img 
                                                    src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`} 
                                                    alt={testimonial.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            );
                                        })()}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-brand-secondary text-sm">{testimonial.name}</h4>
                                        {testimonial.role && <p className="text-xs font-bold text-brand-primary uppercase tracking-wider mt-0.5">{testimonial.role}</p>}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Testimonials;
