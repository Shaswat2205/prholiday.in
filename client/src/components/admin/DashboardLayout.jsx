import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaBox, FaMapMarkedAlt, FaImages, FaComment, FaSignOutAlt, FaTachometerAlt, FaUsers, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { name: 'Overview', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
        { name: 'Packages', path: '/admin/packages', icon: <FaBox /> },
        { name: 'Destinations', path: '/admin/destinations', icon: <FaMapMarkedAlt /> },
        { name: 'Gallery', path: '/admin/gallery', icon: <FaImages /> },
        { name: 'Testimonials', path: '/admin/testimonials', icon: <FaComment /> },
        { name: 'Bookings', path: '/admin/bookings', icon: <FaComment /> },
        { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    ];

    const SidebarContent = () => (
        <>
            <div className="p-8 border-b border-gray-100/10">
                <Link to="/" className="text-3xl border-b-2 border-brand-primary pb-1 font-black tracking-widest text-white hover:text-brand-primary transition-colors">
                    PR<span className="text-brand-primary">Admin</span>
                </Link>
            </div>

            <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Menu</p>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 ${location.pathname.startsWith(item.path) && (item.path !== '/admin' || location.pathname === '/admin/dashboard')
                            ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30 font-bold scale-[1.02]'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white font-semibold'
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-6 border-t border-gray-100/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-4 px-5 py-4 w-full text-red-400 hover:bg-red-500/10 hover:text-red-500 font-bold rounded-2xl transition-all duration-300"
                >
                    <FaSignOutAlt className="text-xl" />
                    <span>Secure Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-[#f4f7fa] font-sans">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex w-72 bg-[#0b132b] text-white flex-col shadow-2xl z-20">
                <SidebarContent />
            </div>

            {/* Mobile Header & Overlay */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-white shadow-sm z-30 flex items-center justify-between px-6">
                 <Link to="/" className="text-2xl font-black text-brand-secondary">
                    PR<span className="text-brand-primary">Admin</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(true)} className="text-2xl text-brand-secondary p-2">
                    <FaBars />
                </button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-80 bg-[#0b132b] text-white flex flex-col z-50 shadow-2xl lg:hidden"
                        >
                            <div className="absolute top-6 right-6">
                                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white p-2">
                                    <FaTimes className="text-2xl" />
                                </button>
                            </div>
                            <SidebarContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto w-full pt-20 lg:pt-0">
                <div className="min-h-full p-6 lg:p-12">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
