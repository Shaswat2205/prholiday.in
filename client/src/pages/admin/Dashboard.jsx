import React from 'react';
import { FaBox, FaMapMarkedAlt, FaImages, FaComment } from 'react-icons/fa';

const StatCard = ({ title, count, icon, color }) => (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-center justify-between">
        <div>
            <p className="text-gray-400 text-sm mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-white">{count}</h3>
        </div>
        <div className={`text-4xl ${color}`}>
            {icon}
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Packages" count="12" icon={<FaBox />} color="text-blue-500" />
                <StatCard title="Destinations" count="8" icon={<FaMapMarkedAlt />} color="text-green-500" />
                <StatCard title="Gallery Items" count="24" icon={<FaImages />} color="text-purple-500" />
                <StatCard title="Testimonials" count="15" icon={<FaComment />} color="text-yellow-500" />
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                <p className="text-gray-400">No recent activity found.</p>
            </div>
        </div>
    );
};

export default Dashboard;
