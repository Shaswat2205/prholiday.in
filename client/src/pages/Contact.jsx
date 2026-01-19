import React from 'react';
import { useForm } from 'react-hook-form';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import SEO from '../components/common/SEO';

const Contact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post('http://localhost:5000/api/contact', data);
            alert('Message sent! We will get back to you soon.');
            reset();
        } catch (err) {
            console.error(err);
            alert('Error sending message');
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-primary-end pb-20">
            <SEO
                title="Contact Us"
                description="Get in touch with PRHolidays for inquiries, bookings, and travel support."
            />
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-white text-center mb-4">Contact <span className="text-secondary-cyan">Us</span></h1>
                <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Get in touch with us to plan your next dream vacation.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-8">Get In Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <FaPhone className="text-secondary-cyan text-xl mt-1 mr-4" />
                                <div>
                                    <h3 className="text-white font-semibold">Phone</h3>
                                    <p className="text-gray-400">+91 7809394966</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <FaEnvelope className="text-secondary-cyan text-xl mt-1 mr-4" />
                                <div>
                                    <h3 className="text-white font-semibold">Email</h3>
                                    <p className="text-gray-400">info@prholiday.in</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-secondary-cyan text-xl mt-1 mr-4" />
                                <div>
                                    <h3 className="text-white font-semibold">Office</h3>
                                    <p className="text-gray-400">opposite of Boyanika, Bazarpada, Bhawanipatna, Odisha 766001</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                {/* Social icons placeholder */}
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-secondary-cyan transition-colors cursor-pointer">F</div>
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-secondary-cyan transition-colors cursor-pointer">I</div>
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-secondary-cyan transition-colors cursor-pointer">T</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-8">Send a Message</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <input
                                    {...register("name", { required: true })}
                                    placeholder="Your Name"
                                    className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-secondary-cyan focus:outline-none"
                                />
                                {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                            </div>
                            <div>
                                <input
                                    {...register("email", { required: true })}
                                    placeholder="Your Email"
                                    className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-secondary-cyan focus:outline-none"
                                />
                                {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                            </div>
                            <div>
                                <input
                                    {...register("subject")}
                                    placeholder="Subject"
                                    className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-secondary-cyan focus:outline-none"
                                />
                            </div>
                            <div>
                                <textarea
                                    {...register("message", { required: true })}
                                    placeholder="Your Message"
                                    rows="4"
                                    className="w-full bg-black/40 border border-white/10 rounded px-4 py-3 text-white focus:border-secondary-cyan focus:outline-none"
                                ></textarea>
                                {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
                            </div>

                            <button type="submit" className="w-full bg-gradient-to-r from-secondary-cyan to-blue-600 text-white font-bold py-3 rounded hover:opacity-90 transition-opacity">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
