import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';

const PackageList = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Using real API now instead of mock
    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/packages');
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
                const token = localStorage.getItem('adminToken');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.delete(`http://localhost:5000/api/admin/packages/${id}`, config);
                setPackages(packages.filter(pkg => pkg._id !== id));
            } catch (err) {
                alert('Error deleting package');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Manage Packages</h1>
                <Link
                    to="/admin/packages/new"
                    className="bg-secondary-cyan text-black px-4 py-2 rounded flex items-center font-bold hover:bg-opacity-80 transition-colors"
                >
                    <FaPlus className="mr-2" /> Add New
                </Link>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-gray-700 text-gray-100 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Duration</th>
                                <th className="px-6 py-4">Rating</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {packages.map(pkg => (
                                <tr key={pkg._id} className="hover:bg-gray-750">
                                    <td className="px-6 py-4">
                                        <img
                                            src={pkg.images[0] || 'https://via.placeholder.com/50'}
                                            alt={pkg.name}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">{pkg.name}</td>
                                    <td className="px-6 py-4 text-secondary-gold">${pkg.price}</td>
                                    <td className="px-6 py-4">{pkg.duration.days}D/{pkg.duration.nights}N</td>
                                    <td className="px-6 py-4">{pkg.rating.average}</td>
                                    <td className="px-6 py-4 space-x-3">
                                        <Link to={`/admin/packages/edit/${pkg._id}`} className="text-blue-400 hover:text-blue-300">
                                            <FaEdit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(pkg._id)} className="text-red-400 hover:text-red-300">
                                            <FaTrash size={18} />
                                        </button>
                                        <Link to={`/packages/${pkg._id}`} target="_blank" className="text-gray-400 hover:text-gray-300">
                                            <FaEye size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {packages.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
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
