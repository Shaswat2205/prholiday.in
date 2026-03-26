import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';

const PackageList = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const res = await axios.get(`/api/packages`);
            setPackages(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.delete(`/api/packages/${id}`, config);
                setPackages(packages.filter(p => p._id !== id));
            } catch (err) {
                alert('Error deleting package');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="text-gray-500 font-bold animate-pulse">Loading packages...</div>;

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl lg:text-4xl font-black text-brand-secondary">Manage Packages</h1>
                <Link
                    to="/admin/packages/new"
                    className="bg-brand-primary text-white px-6 py-3 rounded-full flex items-center shadow-md shadow-brand-primary/30 font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
                >
                    <FaPlus className="mr-2" /> Add Package
                </Link>
            </div>

            <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/40 border border-gray-50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-5">Image</th>
                                <th className="px-6 py-5">Name</th>
                                <th className="px-6 py-5">Price</th>
                                <th className="px-6 py-5">Duration</th>
                                <th className="px-6 py-5">Rating</th>
                                <th className="px-6 py-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {packages.map(pkg => (
                                <tr key={pkg._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <img
                                            src={pkg.images[0] || 'https://via.placeholder.com/50'}
                                            alt={pkg.name}
                                            className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-bold text-brand-secondary">{pkg.name}</td>
                                    <td className="px-6 py-4 text-brand-primary font-bold">₹{pkg.price}</td>
                                    <td className="px-6 py-4 font-medium">{pkg.duration.days}D/{pkg.duration.nights}N</td>
                                    <td className="px-6 py-4 font-bold">{pkg.rating.average}</td>
                                    <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                                        <Link to={`/admin/packages/edit/${pkg._id}`} className="p-2 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-xl inline-flex transition-colors">
                                            <FaEdit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(pkg._id)} className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl inline-flex transition-colors">
                                            <FaTrash size={16} />
                                        </button>
                                        <Link to={`/packages/${pkg._id}`} target="_blank" className="p-2 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl inline-flex transition-colors">
                                            <FaEye size={16} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {packages.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-12 text-gray-400 font-medium tracking-wide">
                                        No packages found. Create one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PackageList;
