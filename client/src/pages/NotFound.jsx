import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-brand-light flex items-center justify-center px-4 pt-20">
            <SEO title="404 Not Found" />
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative inline-block mb-8"
                >
                    <h1 className="text-[15rem] md:text-[20rem] font-black text-brand-secondary opacity-[0.03] leading-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl md:text-9xl">🏜️</span>
                    </div>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-black text-brand-secondary mb-6 -mt-10 relative z-10">Lost in the Desert?</h2>
                <p className="text-brand-gray-500 font-medium mb-12 max-w-md mx-auto text-lg leading-relaxed">
                    The page you are looking for has wandered off into the dunes. Let's get you back to civilization.
                </p>

                <Link
                    to="/"
                    className="inline-block bg-brand-primary text-white font-black py-5 px-12 rounded-2xl shadow-xl shadow-brand-primary/30 hover:shadow-brand-primary/40 transform active:scale-95 transition-all text-sm uppercase tracking-[0.2em]"
                >
                    Back to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
