import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-primary-end pt-16 pb-8 text-white border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Info */}
                    <div>
                        <Link to="/" className="inline-block mb-4">
                            <img
                                src="/logo.png"
                                alt="PRHolidays Logo"
                                className="h-14 w-auto object-contain rounded-xl border border-white/10"
                            />
                        </Link>
                        <p className="text-gray-400 mb-4">
                            Making your dream vacations a reality with premium ease and comfort.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-secondary-cyan transition-colors"><FaFacebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary-cyan transition-colors"><FaTwitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary-cyan transition-colors"><FaInstagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary-cyan transition-colors"><FaLinkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-secondary-gold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/packages" className="text-gray-400 hover:text-white transition-colors">Tour Packages</Link></li>
                            <li><Link to="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-secondary-gold">Support</h3>
                        <ul className="space-y-2">
                            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Login</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-secondary-gold">Newsletter</h3>
                        <p className="text-gray-400 mb-4">Subscribe to gets latest updates and offers.</p>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/10 border border-white/10 rounded px-4 py-2 focus:outline-none focus:border-secondary-cyan text-white"
                            />
                            <button className="bg-gradient-to-r from-secondary-cyan to-blue-600 text-white font-semibold py-2 rounded hover:opacity-90 transition-opacity">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} PRHolidays. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
