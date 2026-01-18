import React from 'react';
import VideoBackground from '../components/common/VideoBackground';
import SEO from '../components/common/SEO';
import { FaGlobeAmericas, FaUmbrellaBeach, FaHeadset, FaHeart } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
        <div className="text-secondary-gold text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-200">{description}</p>
    </div>
);

const About = () => {
    return (
        <VideoBackground
            src="/videos/forest.mp4"
            overlayOpacity={0.7}
        >
            <SEO
                title="About Us"
                description="Learn more about PRHolidays, our mission to create unforgettable travel experiences, and why you should choose us for your next adventure."
            />
            <div className="pt-32 pb-20 min-h-screen">
                <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h1 className="text-5xl font-bold text-white mb-6">Crafting <span className="text-secondary-gold">Unforgettable</span> Journeys</h1>
                        <p className="text-xl text-gray-200 leading-relaxed">
                            At PRHolidays, we believe that travel is not just about visiting new places—it's about the memories you create, the cultures you experience, and the stories you bring back home.
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                        <div className="bg-primary-start/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
                            <h2 className="text-3xl font-bold text-white mb-4 border-b border-secondary-cyan/30 pb-4 inline-block">Our Story</h2>
                            <p className="text-gray-200 mb-4 leading-relaxed">
                                Founded with a passion for exploration, PRHolidays began as a small team of travel enthusiasts dedicated to showing the world to our clients. Over the years, we have grown into a premier travel agency, specializing in curating personalized itineraries that cater to every type of traveler.
                            </p>
                            <p className="text-gray-200 leading-relaxed">
                                From the pristine beaches of the Maldives to the rugged mountains of the Alps, our footprint spans the globe. We pride ourselves on our attention to detail and our commitment to making every trip seamless and spectacular.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FeatureCard
                                icon={<FaGlobeAmericas />}
                                title="Global Reach"
                                description="Access to exclusive destinations and packages worldwide."
                            />
                            <FeatureCard
                                icon={<FaUmbrellaBeach />}
                                title="Tailored Trips"
                                description="Itineraries customized to fit your personal style and budget."
                            />
                            <FeatureCard
                                icon={<FaHeadset />}
                                title="24/7 Support"
                                description="Dedicated support team available round-the-clock for peace of mind."
                            />
                            <FeatureCard
                                icon={<FaHeart />}
                                title="Passion First"
                                description="We love what we do, and we want you to love your journey too."
                            />
                        </div>
                    </div>

                    {/* Mission Section */}
                    <div className="bg-gradient-to-r from-primary-mid to-primary-start p-10 rounded-2xl text-center border border-white/10 shadow-xl max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                        <p className="text-xl text-gray-200 italic font-light">
                            "To inspire and empower travelers to explore the world with confidence, providing exceptional service and authentic experiences that last a lifetime."
                        </p>
                    </div>
                </div>
            </div>
        </VideoBackground>
    );
};

export default About;
