import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaBox, FaMapMarkedAlt, FaImages, FaComment, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
        { name: 'Packages', path: '/admin/packages', icon: <FaBox /> },
        { name: 'Destinations', path: '/admin/destinations', icon: <FaMapMarkedAlt /> },
        { name: 'Gallery', path: '/admin/gallery', icon: <FaImages /> },
        { name: 'Testimonials', path: '/admin/testimonials', icon: <FaComment /> },
        { name: 'Bookings', path: '/admin/bookings', icon: <FaComment /> }, // Using same icon for now or can import FaClipboardList
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold">PR<span className="text-secondary-cyan">Admin</span></h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-secondary-cyan text-black font-semibold'
                                : 'text-gray-300 hover:bg-gray-700'
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-gray-900 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
