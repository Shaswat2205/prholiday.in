import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Parallax Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop"
                    alt="Newsletter Background"
                    className="w-full h-full object-cover animate-kenburns scale-110 opacity-40"
                />
                <div className="absolute inset-0 bg-brand-secondary/80"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-white/10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block"
                        >
                            Join the Community
                        </motion.span>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Unlock <span className="text-brand-primary">Exclusive Travel Deals</span> <br className="hidden md:block" />
                            & Insider Tips
                        </h2>
                        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                            Subscribe to our newsletter and get the latest destination guides,
                            curated tour packages, and special discounts delivered to your inbox.
                        </p>

                        <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex-grow">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:bg-white/20 transition-all font-medium"
                                />
                            </div>
                            <button className="btn-primary py-5 px-10 text-base shadow-xl shadow-brand-primary/30 active:scale-95 transition-transform hover:rotate-2">
                                Subscribe Now
                            </button>
                        </form>
                        <p className="mt-6 text-white/40 text-xs font-medium">
                            * No spam, just pure travel inspiration. You can unsubscribe at any time.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
