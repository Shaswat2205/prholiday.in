import React, { useState, useEffect } from 'react';
import { FaBox, FaMapMarkedAlt, FaImages, FaComment, FaSync, FaUsers, FaCalendarCheck } from 'react-icons/fa';
import axios from 'axios';
import { motion } from 'framer-motion';

const StatCard = ({ title, count, icon, color, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 flex items-center justify-between border border-gray-50 hover:-translate-y-1 transition-transform duration-300"
    >
        <div>
            <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest mb-2">{title}</p>
            <h3 className="text-3xl md:text-4xl font-black text-brand-secondary">{count !== undefined && count !== null ? count : <span className="animate-pulse">...</span>}</h3>
        </div>
        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-lg ${color}`}>
            {icon}
        </div>
    </motion.div>
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = async () => {
        try {
            setRefreshing(true);
            const res = await axios.get('/api/admin/stats');
            setStats(res.data.data);
        } catch (error) {
            console.error('Error fetching dashboard stats', error);
        } finally {
            setLoading(false);
            setTimeout(() => setRefreshing(false), 500);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-brand-secondary">Overview</h1>
                    <p className="text-gray-500 font-medium mt-2">Welcome to your PRHolidays command center.</p>
                </div>
                
                <button 
                    onClick={fetchStats}
                    disabled={refreshing}
                    className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md text-brand-primary font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all border border-gray-100 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                    <FaSync className={`${refreshing ? 'animate-spin' : ''}`} />
                    Refresh Stats
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
                <StatCard delay={0.1} title="Packages" count={stats?.packages} icon={<FaBox />} color="bg-blue-50 text-blue-500 border border-blue-100" />
                <StatCard delay={0.2} title="Destinations" count={stats?.destinations} icon={<FaMapMarkedAlt />} color="bg-green-50 text-green-500 border border-green-100" />
                <StatCard delay={0.3} title="Gallery" count={stats?.testimonials} icon={<FaImages />} color="bg-purple-50 text-purple-500 border border-purple-100" />
                <StatCard delay={0.4} title="Bookings" count={stats?.bookings} icon={<FaCalendarCheck />} color="bg-brand-light text-brand-primary border border-brand-primary/20" />
                <StatCard delay={0.5} title="Users" count={stats?.users} icon={<FaUsers />} color="bg-orange-50 text-orange-500 border border-orange-100" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/40 p-6 md:p-8 border border-gray-50 max-w-4xl"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-black text-brand-secondary">Recent Bookings</h2>
                </div>
                
                {loading ? (
                    <div className="animate-pulse space-y-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-50 rounded-2xl"></div>)}
                    </div>
                ) : stats?.recentActivity && stats.recentActivity.length > 0 ? (
                    <div className="space-y-4">
                        {stats.recentActivity.map((activity, index) => (
                            <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-gray-50/50 gap-4">
                                <div>
                                    <p className="font-bold text-brand-secondary">
                                        {activity.user ? activity.user.name : 'Unknown User'} booked <span className="text-brand-primary">{activity.packageId ? activity.packageId.title : 'a package'}</span>
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                                        {new Date(activity.createdAt).toLocaleDateString()} at {new Date(activity.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                                <span className={`self-start md:self-auto px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-center ${activity.status === 'confirmed' ? 'bg-green-100 text-green-600' : activity.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                    {activity.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                        <p className="text-gray-400 font-medium">No recent activity found.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Dashboard;
