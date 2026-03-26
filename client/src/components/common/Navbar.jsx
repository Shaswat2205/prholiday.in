import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setShowProfileMenu(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Packages', path: '/packages' },
        { name: 'Destinations', path: '/destinations' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-white shadow-xl py-3 border-b border-gray-100'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="flex items-center group">
                    <img
                        src="/logo.png"
                        alt="PRHolidays Logo"
                        className={`h-12 w-auto object-contain transition-all duration-300 ${!scrolled ? 'brightness-0 invert' : ''
                            }`}
                    />
                </Link>

                {/* Desktop Menu & Search */}
                <div className="hidden lg:flex items-center space-x-10">
                    <div className="flex space-x-8">
                        {navLinks.map((link) => {
                            const isActive = link.path === '/'
                                ? location.pathname === '/'
                                : location.pathname.startsWith(link.path);

                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`relative py-2 font-black text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${scrolled ? 'text-brand-secondary' : 'text-white'
                                        } hover:text-brand-primary`}
                                >
                                    {link.name}
                                    {isActive ? (
                                        <motion.div
                                            layoutId="navUnderline"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-primary"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    ) : (
                                        <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Actions */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="relative group">
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className={`flex items-center gap-3 p-1.5 pr-4 rounded-full border transition-all duration-300 ${scrolled ? 'bg-gray-50 border-gray-200' : 'bg-white/10 border-white/20'
                                        }`}
                                >
                                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-brand-primary" />
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${scrolled ? 'text-brand-secondary' : 'text-white'}`}>
                                        {user.name.split(' ')[0]}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {showProfileMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-3 w-56 bg-white rounded-[2rem] shadow-2xl border border-gray-50 p-3 flex flex-col gap-1"
                                        >
                                            <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-3 px-6 py-4 rounded-2xl hover:bg-brand-light transition-all text-brand-secondary font-bold text-sm group">
                                                <FaUserAlt className="text-brand-primary group-hover:scale-110 transition-transform" /> {user?.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3 px-6 py-4 rounded-2xl hover:bg-red-50 transition-all text-red-500 font-bold text-sm group"
                                            >
                                                <FaSignOutAlt className="group-hover:translate-x-1 transition-transform" /> Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className={`text-[10px] font-black uppercase tracking-[0.2em] px-8 py-3 rounded-full transition-all ${scrolled
                                        ? 'bg-brand-secondary text-white shadow-lg'
                                        : 'bg-white text-brand-secondary shadow-xl'
                                    }`}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center space-x-4">
                    <button
                        className={`text-2xl transition-colors ${scrolled ? 'text-brand-secondary' : 'text-white'
                            }`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-white flex flex-col p-8 z-40"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                            <button onClick={() => setIsOpen(false)} className="text-3xl text-brand-secondary">
                                <FaTimes />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-6">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-2xl font-bold text-brand-secondary hover:text-brand-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            {user ? (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: navLinks.length * 0.1 }}
                                    >
                                        <Link
                                            to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                                            onClick={() => setIsOpen(false)}
                                            className="text-2xl font-bold text-brand-secondary hover:text-brand-primary transition-colors flex items-center gap-3"
                                        >
                                            <FaUserAlt className="text-xl" /> {user?.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                                        </Link>
                                    </motion.div>
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: (navLinks.length + 1) * 0.1 }}
                                        onClick={handleLogout}
                                        className="text-2xl font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-3 text-left w-full"
                                    >
                                        <FaSignOutAlt className="text-xl" /> Logout
                                    </motion.button>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: navLinks.length * 0.1 }}
                                >
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="text-2xl font-bold text-brand-secondary hover:text-brand-primary transition-colors block"
                                    >
                                        Login
                                    </Link>
                                </motion.div>
                            )}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (navLinks.length + 2) * 0.1 }}
                                className="btn-primary mt-8 w-full"
                            >
                                Plan My Trip
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
