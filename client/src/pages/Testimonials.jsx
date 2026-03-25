import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import SEO from '../components/common/SEO';

const Testimonials = () => {
    // Media path helper
    const getMediaUrl = (url) => {
        if (!url) return '';
        return url.replace('http://localhost:5000', '');
    };

    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                // Fetch public testimonials
                const res = await axios.get(`/api/testimonials`);
                setTestimonials(res.data.data);
                
                // Process Instagram embeds after data is loaded
                setTimeout(() => {
                    if (window.instgrm) {
                        window.instgrm.Embeds.process();
                    }
                }, 1000);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <div className="min-h-screen bg-transparent pt-32 pb-20">
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
                                        const cleanUrl = testimonial.image.split('?')[0].replace('http://', 'https://');
                                        return (
                                            <div className="w-full mb-6 relative z-10 overflow-hidden rounded-2xl border border-gray-100 min-h-[400px]">
                                                <blockquote 
                                                    className="instagram-media" 
                                                    data-instgrm-permalink={cleanUrl}
                                                    data-instgrm-version="14"
                                                    style={{ background: '#FFF', border: '0', borderRadius: '12px', margin: '0', padding: '0', width: '100%', minWidth: '326px' }}
                                                >
                                                    <div style={{ padding: '16px' }}>
                                                        <a href={cleanUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                <div style={{ background: '#F4F4F4', borderRadius: '50%', height: '40px', width: '40px', marginRight: '14px' }}></div>
                                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    <div style={{ background: '#F4F4F4', borderRadius: '4px', height: '14px', width: '100px', marginBottom: '6px' }}></div>
                                                                    <div style={{ background: '#F4F4F4', borderRadius: '4px', height: '14px', width: '60px' }}></div>
                                                                </div>
                                                            </div>
                                                            <div style={{ padding: '19% 0' }}></div>
                                                            <div style={{ textAlign: 'center', color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontWeight: '600' }}>
                                                                View on Instagram
                                                            </div>
                                                        </a>
                                                    </div>
                                                </blockquote>
                                            </div>
                                        );
                                    } else if (testimonial.image) {
                                        return (
                                            <div className="w-full rounded-xl overflow-hidden shadow-inner mb-6 relative z-10">
                                                <img src={getMediaUrl(testimonial.image)} alt="Travel Media" className="w-full h-auto object-cover hover:scale-105 transition-transform" />
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
                                                    src={getMediaUrl(testimonial.image) || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`} 
                                                    className="w-full h-full object-cover" 
                                                    alt={testimonial.name}
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
