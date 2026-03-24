import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Footer = () => {
    const { user } = useAuth();

    const supportLinks = ['Privacy Policy', 'Terms of Service', 'FAQ', 'Admin Login'].filter(
        item => item !== 'Admin Login' || !user
    );

    return (
        <footer className="bg-brand-secondary pt-24 pb-12 text-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
                    {/* Brand Info */}
                    <div className="space-y-8">
                        <Link to="/" className="inline-block transform hover:scale-105 transition-transform">
                            <img
                                src="/logo.png"
                                alt="PRHolidays Logo"
                                className="h-16 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-white/60 leading-relaxed font-medium">
                            We are committed to making your travel dreams come true.
                            From breathtaking landscapes to cultural wonders,
                            discover the world with PRHolidays.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { Icon: FaInstagram, color: 'hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', url: 'https://www.instagram.com/pr_holidayss' }
                            ].map(({ Icon, color, url }, idx) => (
                                <a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 hover:border-transparent ${color}`}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-8 relative inline-block">
                            Quick Links
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-primary rounded-full"></span>
                        </h3>
                        <ul className="space-y-4">
                            {['About Us', 'Tour Packages', 'Destinations', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/${item.toLowerCase().replace(' ', '')}`}
                                        className="text-white/60 hover:text-brand-primary hover:translate-x-2 transition-all inline-block font-medium"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-xl font-bold mb-8 relative inline-block">
                            Our Support
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-primary rounded-full"></span>
                        </h3>
                        <ul className="space-y-4">
                            {supportLinks.map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Admin Login' ? '/login' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-white/60 hover:text-brand-primary hover:translate-x-2 transition-all inline-block font-medium"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-8 relative inline-block">
                            Contact Us
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-primary rounded-full"></span>
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-primary shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <p className="text-white/60 font-medium">Opposite Boyanika, Bhawanipatna <br />Kalahandi,Odisha,766001</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-primary shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <p className="text-white/60 font-medium">+91 7809394966</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-12 text-center">
                    <p className="text-white/40 text-sm font-medium">
                        &copy; {new Date().getFullYear()} PRHoliday.in Crafted with ❤️ for Travellers worldwide.
                    </p>
                </div>
            </div>
            {/* Background design elements */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        </footer>
    );
};

export default Footer;
