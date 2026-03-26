import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';

const DestinationList = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const res = await axios.get(`/api/destinations`);
            setDestinations(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this destination?')) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.delete(`/api/destinations/${id}`, config);
                setDestinations(destinations.filter(d => d._id !== id));
            } catch (err) {
                alert('Error deleting destination');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="text-gray-500 font-bold animate-pulse">Loading destinations...</div>;

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl lg:text-4xl font-black text-brand-secondary">Manage Destinations</h1>
                <Link
                    to="/admin/destinations/new"
                    className="bg-brand-primary text-white px-6 py-3 rounded-full flex items-center shadow-md shadow-brand-primary/30 font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
                >
                    <FaPlus className="mr-2" /> Add Destination
                </Link>
            </div>

            <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/40 border border-gray-50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-5">Image</th>
                                <th className="px-6 py-5">Name</th>
                                <th className="px-6 py-5">Country</th>
                                <th className="px-6 py-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {destinations.map(dest => (
                                <tr key={dest._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <img
                                            src={dest.image || 'https://via.placeholder.com/50'}
                                            alt={dest.name}
                                            className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-bold text-brand-secondary">{dest.name}</td>
                                    <td className="px-6 py-4 font-medium text-gray-500">{dest.country}</td>
                                    <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                                        <Link to={`/admin/destinations/edit/${dest._id}`} className="p-2 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-xl inline-flex transition-colors">
                                            <FaEdit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(dest._id)} className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl inline-flex transition-colors">
                                            <FaTrash size={16} />
                                        </button>
                                        <Link to={`/destinations/${dest._id}`} target="_blank" className="p-2 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl inline-flex transition-colors">
                                            <FaEye size={16} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {destinations.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-12 text-gray-400 font-medium tracking-wide">
                                        No destinations found. Create one to get started.
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

export default DestinationList;
