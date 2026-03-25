import React from 'react';
import Hero from '../components/home/Hero';
import CategoryCards from '../components/home/CategoryCards';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import PopularToursGrid from '../components/home/PopularToursGrid';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import SEO from '../components/common/SEO';

const Home = () => {
    return (
        <div className="min-h-screen bg-transparent">
            <SEO
                title="PRHolidays - Experience the World Like Never Before"
                description="Book your next adventure with PRHolidays. Explore curated tour packages, breathtaking destinations, and premium travel experiences."
            />

            <Hero />

            <CategoryCards />

            <PopularToursGrid />

            <FeaturedDestinations />

            <WhyChooseUs />

            <Testimonials />

            <Newsletter />
        </div>
    );
};

export default Home;
