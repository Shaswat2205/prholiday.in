import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Travel Enthusiast',
        rating: 5,
        text: 'PRHolidays made our honeymoon absolutely magical. The attention to detail and personalized service was outstanding!',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Adventure Seeker',
        rating: 5,
        text: 'The Swiss Alps tour was perfectly organized. The guides were knowledgeable and the accommodations were top-notch.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Emma Wilson',
        role: 'Family Traveler',
        rating: 4,
        text: 'Great family package to Bali. Everything was taken care of, allowing us to just relax and enjoy our vacation.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop'
    }
];

const Testimonials = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
