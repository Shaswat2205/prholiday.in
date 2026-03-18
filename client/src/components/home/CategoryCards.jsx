import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Spiritual', icon: '🙏', path: '/packages?category=spiritual', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=400&auto=format&fit=crop' },
    { name: 'Adventure', icon: '🧗', path: '/packages?category=adventure', image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=400&auto=format&fit=crop' },
    { name: 'Nature', icon: '🌿', path: '/packages?category=nature', image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=400&auto=format&fit=crop' },
    { name: 'Heritage', icon: '🏛️', path: '/packages?category=heritage', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=400&auto=format&fit=crop' },
    { name: 'Beach', icon: '🏖️', path: '/packages?category=beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop' }
];

const CategoryCards = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-primary font-bold tracking-widest uppercase text-sm"
                    >
                        Explore by Interest
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-bold text-brand-secondary mt-2"
                    >
                        Find Your Perfect <span className="text-brand-primary">Category</span>
                    </motion.h2>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                to={category.path}
                                className="group flex flex-col items-center"
                            >
                                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mb-4 shadow-lg transition-all duration-500 group-hover:shadow-brand-primary/20 group-hover:scale-110">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                                    />
                                    <div className="absolute inset-0 bg-brand-secondary/20 group-hover:bg-brand-primary/40 transition-colors duration-300 flex items-center justify-center">
                                        <span className="text-3xl filter drop-shadow-md">{category.icon}</span>
                                    </div>
                                </div>
                                <span className="text-brand-secondary font-semibold text-sm md:text-base group-hover:text-brand-primary transition-colors">
                                    {category.name}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryCards;
