import React, { useState, useEffect } from 'react';
import PackageCard from '../components/common/PackageCard';
import axios from 'axios';
import SEO from '../components/common/SEO';
import { motion } from 'framer-motion';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState(50000);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('Sort by: Featured');

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/packages');
                setPackages(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const categories = ['All', 'Spiritual', 'Adventure', 'Nature', 'Heritage', 'Beach'];

    let filteredPackages = packages.filter(pkg => {
        const matchCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
        const matchPrice = pkg.price <= priceRange;
        return matchCategory && matchPrice;
    });

    if (sortBy === 'Price: Low to High') {
        filteredPackages.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
        filteredPackages.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Top Rated') {
        filteredPackages.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return (
        <div className="pt-28 min-h-screen bg-brand-light pb-20">
            <SEO
                title="Tour Packages - PRHolidays"
                description="Browse our curated list of travel packages and find your next dream adventure."
            />

            <div className="container mx-auto px-4">
                {/* Header section */}
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row justify-between items-end gap-6"
                    >
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-brand-secondary mb-4">
                                Discover Your <span className="text-brand-primary">Next Adventure</span>
                            </h1>
                            <p className="text-brand-gray-500 font-medium max-w-xl">
                                Showing {filteredPackages.length} curated packages matching your interests.
                                Guaranteed best prices and unforgettable memories.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white border-2 border-gray-100 rounded-2xl px-6 py-4 font-bold text-brand-secondary focus:outline-none focus:border-brand-primary/30 transition-all shadow-sm"
                            >
                                <option>Sort by: Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Top Rated</option>
                            </select>
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-1/4 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100"
                        >
                            <h3 className="text-xl font-black text-brand-secondary mb-8 flex items-center gap-2">
                                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                Filters
                            </h3>

                            {/* Categories */}
                            <div className="mb-8">
                                <h4 className="font-black text-brand-secondary text-xs uppercase tracking-[0.2em] mb-4">Category</h4>
                                <div className="space-y-3">
                                    {categories.map(cat => (
                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === cat}
                                                onChange={() => setSelectedCategory(cat)}
                                                className="w-5 h-5 border-2 border-gray-200 rounded-lg checked:bg-brand-primary checked:border-brand-primary transition-all appearance-none cursor-pointer"
                                            />
                                            <span className={`font-bold transition-all ${selectedCategory === cat ? 'text-brand-primary translate-x-1' : 'text-brand-gray-500 group-hover:text-brand-secondary'}`}>
                                                {cat}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price range */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-black text-brand-secondary text-xs uppercase tracking-[0.2em]">Max Price</h4>
                                    <span className="text-brand-primary font-black text-sm">₹{priceRange}</span>
                                </div>
                                <input
                                    type="range"
                                    min="5000"
                                    max="100000"
                                    step="5000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                                />
                                <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">
                                    <span>₹5k</span>
                                    <span>₹100k</span>
                                </div>
                            </div>

                            {/* Reset button */}
                            <button className="w-full py-4 rounded-2xl border-2 border-brand-primary/10 text-brand-primary font-black text-sm uppercase tracking-widest hover:bg-brand-primary/5 transition-all active:scale-95">
                                Reset All
                            </button>
                        </motion.div>

                        <div className="bg-brand-secondary rounded-[2.5rem] p-8 text-white relative overflow-hidden group border border-white/5">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-4 group-hover:text-brand-primary transition-colors">Need Help?</h3>
                                <p className="text-white/60 font-medium text-sm mb-6">Talk to our travel experts for personalized planning.</p>
                                <button className="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl font-bold transition-all border border-white/10">
                                    Contact Advisor
                                </button>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 transition-transform group-hover:scale-150"></div>
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <div className="flex-grow">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="bg-white rounded-[2.5rem] h-[500px] animate-shimmer"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredPackages.map((pkg, idx) => (
                                    <motion.div
                                        key={pkg._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <PackageCard pkg={pkg} />
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {!loading && filteredPackages.length === 0 && (
                            <div className="bg-white rounded-[2.5rem] p-20 text-center shadow-xl border border-gray-100">
                                <div className="text-6xl mb-6">🏜️</div>
                                <h3 className="text-2xl font-black text-brand-secondary mb-4">No Packages Found</h3>
                                <p className="text-brand-gray-500 font-medium">Try adjusting your filters or search criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Packages;
