import React from 'react';
import VideoBackground from '../components/common/VideoBackground';
import SEO from '../components/common/SEO';
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaUmbrellaBeach, FaHeadset, FaHeart } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100/50 border border-gray-50 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500"
    >
        <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary text-3xl mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-black text-brand-secondary mb-3">{title}</h3>
        <p className="text-brand-gray-500 font-medium text-sm leading-relaxed">{description}</p>
    </motion.div>
);

const About = () => {
    return (
        <div className="pt-28 min-h-screen bg-brand-light pb-20">
            <SEO
                title="About Us - PRHolidays"
                description="Learn more about PRHolidays, our mission to create unforgettable travel experiences."
            />

            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block"
                    >
                        Our Journey
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-brand-secondary mb-6 leading-tight"
                    >
                        Crafting <span className="text-brand-primary">Unforgettable</span> <br className="hidden md:block" /> Life Experiences
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-brand-gray-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        At PRHolidays, we believe that travel is more than just visits—it's about the soul of the journey.
                    </motion.p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop" alt="Our Team" />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl -z-10"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-block px-6 py-2 bg-brand-primary/10 rounded-full text-brand-primary text-xs font-black uppercase tracking-widest">
                            Our Story
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-brand-secondary leading-tight">
                            A Decade of <br /> Passionate Exploration
                        </h2>
                        <div className="space-y-6 text-brand-gray-500 font-medium text-lg leading-relaxed">
                            <p>
                                Founded with a passion for exploration, PRHolidays began as a small team of travel enthusiasts dedicated to showing the world to our clients.
                            </p>
                            <p>
                                Over the years, we have grown into a premier travel agency, specializing in curating personalized itineraries that cater to every type of traveler.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 pt-4">
                            <div>
                                <h4 className="text-3xl font-black text-brand-primary">500+</h4>
                                <p className="text-brand-gray-500 font-bold text-sm uppercase tracking-widest">Happy Clients</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-black text-brand-primary">150+</h4>
                                <p className="text-brand-gray-500 font-bold text-sm uppercase tracking-widest">Curated Tours</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    <FeatureCard
                        index={0}
                        icon={<FaGlobeAmericas />}
                        title="Global Reach"
                        description="Access to exclusive destinations and packages worldwide."
                    />
                    <FeatureCard
                        index={1}
                        icon={<FaUmbrellaBeach />}
                        title="Tailored Trips"
                        description="Itineraries customized to fit your personal style and budget."
                    />
                    <FeatureCard
                        index={2}
                        icon={<FaHeadset />}
                        title="24/7 Support"
                        description="Dedicated support team available round-the-clock."
                    />
                    <FeatureCard
                        index={3}
                        icon={<FaHeart />}
                        title="Passion First"
                        description="We love what we do, and we want you to love your journey."
                    />
                </div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-brand-secondary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden text-white"
                >
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black mb-8">Our Mission</h2>
                        <p className="text-xl md:text-2xl font-light italic leading-loose opacity-80">
                            "To inspire and empower travelers to explore the world with confidence, providing exceptional service and authentic experiences that last a lifetime."
                        </p>
                        <div className="mt-12 flex justify-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                            <div className="w-2 h-2 rounded-full bg-brand-primary opacity-50"></div>
                            <div className="w-2 h-2 rounded-full bg-brand-primary opacity-20"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
