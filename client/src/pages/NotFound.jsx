import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-primary-end flex items-center justify-center px-4 pt-20">
            <SEO title="404 Not Found" />
            <div className="text-center">
                <h1 className="text-9xl font-bold text-secondary-cyan opacity-20">404</h1>
                <h2 className="text-4xl font-bold text-white mb-4 -mt-10 relative z-10">Page Not Found</h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Oops! The page you are looking for does not exist. It might have been moved or deleted.
                </p>
                <Link
                    to="/"
                    className="bg-gradient-to-r from-secondary-cyan to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
