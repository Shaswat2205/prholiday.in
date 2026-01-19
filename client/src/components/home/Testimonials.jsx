import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
    {
        id: 1,
        name: 'Anisha',
        role: 'Travel Enthusiast',
        rating: 5,
        text: 'PRHolidays made our honeymoon absolutely magical. The attention to detail and personalized service was outstanding!',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Rajat',
        role: 'Adventure Seeker',
        rating: 5,
        text: 'The Spiti Valley tour was perfectly organized. The guides were knowledgeable and the views were breathtaking.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Bhawani',
        role: 'Family Traveler',
        rating: 4,
        text: 'Great family package to Kerala. Everything was taken care of, allowing us to just relax and enjoy our vacation.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Shweta',
        role: 'Solo Traveler',
        rating: 5,
        text: 'Exploring the 12 Jyotirlings with PRHolidays was a spiritual and seamless experience. Highly recommended!',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop'
    },
    {
        id: 5,
        name: 'Shibanee',
        role: 'Culture Explorer',
        rating: 5,
        text: 'The Sikkim heritage tour was eye-opening. PRHolidays really knows how to showcase the local culture.',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop'
    },
    {
        id: 6,
        name: 'Ashmita',
        role: 'Nature Lover',
        rating: 4,
        text: 'Karnataka’s wildlife and temples were amazing. The itinerary was well-paced and very informative.',
        image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1886&auto=format&fit=crop'
    }
];

const Testimonials = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl relative"
                >
                    <FaQuoteLeft className="text-4xl text-secondary-cyan/20 absolute top-4 left-4" />

                    <div className="flex flex-col items-center text-center">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-secondary-gold mb-4"
                        />
                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                        <p className="text-secondary-cyan text-sm mb-4">{item.role}</p>

                        <div className="flex text-secondary-gold mb-4">
                            {[...Array(item.rating)].map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </div>

                        <p className="text-gray-300 italic">"{item.text}"</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Testimonials;
