import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import SEO from '../components/common/SEO';
import { motion } from 'framer-motion';

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, data);
            alert('Message sent! We will get back to you soon.');
            reset();
        } catch (err) {
            console.error(err);
            alert('Error sending message');
        }
    };

    return (
        <div className="pt-28 min-h-screen bg-brand-light pb-20">
            <SEO
                title="Contact Us - PRHolidays"
                description="Get in touch with PRHolidays for inquiries, bookings, and travel support."
            />

            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block"
                    >
                        Get in Touch
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-brand-secondary mb-6"
                    >
                        Let's Plan Your <span className="text-brand-primary">Next Trip</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-brand-gray-500 font-medium max-w-2xl mx-auto text-lg"
                    >
                        Have questions? Our travel experts are here to help you every step of the way.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-50 text-center">
                                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary text-xl mx-auto mb-4">
                                    <FaPhone />
                                </div>
                                <h4 className="text-brand-secondary font-black text-xs uppercase tracking-widest mb-2">Call Us</h4>
                                <p className="text-brand-gray-500 font-bold text-sm">+91 7809394966</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-50 text-center">
                                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary text-xl mx-auto mb-4">
                                    <FaEnvelope />
                                </div>
                                <h4 className="text-brand-secondary font-black text-xs uppercase tracking-widest mb-2">Email</h4>
                                <p className="text-brand-gray-500 font-bold text-sm">info@prholiday.in</p>
                            </div>
                            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-50 text-center">
                                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary text-xl mx-auto mb-4">
                                    <FaMapMarkerAlt />
                                </div>
                                <h4 className="text-brand-secondary font-black text-xs uppercase tracking-widest mb-2">Office</h4>
                                <p className="text-brand-gray-500 font-bold text-[10px] leading-tight">Opposite Boyanika, Bhawanipatna</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] border-8 border-white"
                        >
                            <iframe
                                title="location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.518608246387!2d83.1601666!3d19.9026463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a234f9a531cf6d1%3A0xc3f98229b46bdc81!2sPRHolidays!5e0!3m2!1sen!2sin!4v1705607000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100"
                    >
                        <h2 className="text-3xl font-black text-brand-secondary mb-2">Send a Message</h2>
                        <p className="text-brand-gray-500 font-medium mb-10">We usually respond within 2 hours.</p>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Your Name</label>
                                    <input
                                        {...register("name", { required: true })}
                                        placeholder="Full Name"
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                    />
                                    {errors.name && <span className="text-red-500 text-[10px] font-bold mt-1 block">Name is required</span>}
                                </div>
                                <div>
                                    <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                    <input
                                        {...register("email", { required: true })}
                                        placeholder="email@example.com"
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                    />
                                    {errors.email && <span className="text-red-500 text-[10px] font-bold mt-1 block">Email is required</span>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Subject</label>
                                <input
                                    {...register("subject")}
                                    placeholder="What are you interested in?"
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                />
                            </div>

                            <div>
                                <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Message</label>
                                <textarea
                                    {...register("message", { required: true })}
                                    placeholder="Tell us about your dream trip..."
                                    rows="5"
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold resize-none"
                                ></textarea>
                                {errors.message && <span className="text-red-500 text-[10px] font-bold mt-1 block">Message is required</span>}
                            </div>

                            <button type="submit" className="w-full bg-brand-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-primary/30 hover:shadow-brand-primary/40 transform active:scale-95 transition-all text-sm uppercase tracking-[0.2em]">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
