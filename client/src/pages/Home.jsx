import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedPackages from '../components/home/FeaturedPackages';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import HomeGallery from '../components/home/HomeGallery';
import Testimonials from '../components/home/Testimonials';
import SEO from '../components/common/SEO';
import VideoBackground from '../components/common/VideoBackground';

const Home = () => {
    return (
        <VideoBackground
            src="/videos/beach.mp4"
            overlayOpacity={0.6}
        >
            <div className="min-h-screen">
                <SEO
                    title="Home"
                    description="Welcome to PRHolidays. Explore our featured travel packages and destinations for your next dream vacation."
                />
                <Hero />
                <FeaturedPackages />

                <section className="py-20 container mx-auto px-4 bg-primary-start/80 backdrop-blur-sm rounded-xl my-8">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">Our <span className="text-secondary-gold">Gallery</span></h2>
                    <div className="max-w-5xl mx-auto">
                        <HomeGallery />
                    </div>
                </section>

                <section className="py-20 bg-primary-mid/80 backdrop-blur-sm">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-white text-center mb-12">Client <span className="text-secondary-cyan">Testimonials</span></h2>
                        <Testimonials />
                    </div>
                </section>
            </div>
        </VideoBackground>
    );
};

export default Home;
