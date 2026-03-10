import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const TestimonialList = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get('http://localhost:5000/api/testimonials/admin', config);
            setTestimonials(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.delete(`http://localhost:5000/api/testimonials/${id}`, config);
                setTestimonials(testimonials.filter(t => t._id !== id));
            } catch (err) {
                alert('Error deleting testimonial');
                console.error(err);
            }
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`http://localhost:5000/api/testimonials/${id}`, { status }, config);
            setTestimonials(testimonials.map(t => t._id === id ? { ...t, status } : t));
        } catch (err) {
            alert('Error updating status');
            console.error(err);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Manage Testimonials</h1>
                <Link
                    to="/admin/testimonials/new"
                    className="bg-secondary-cyan text-black px-4 py-2 rounded flex items-center font-bold hover:bg-opacity-80 transition-colors"
                >
                    <FaPlus className="mr-2" /> Add New
                </Link>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-gray-700 text-gray-100 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Rating</th>
                            <th className="px-6 py-4">Quote</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {testimonials.map(item => (
                            <tr key={item._id} className="hover:bg-gray-750">
                                <td className="px-6 py-4 flex items-center">
                                    <img
                                        src={item.image || 'https://via.placeholder.com/40'}
                                        alt={item.name}
                                        className="w-10 h-10 rounded-full object-cover mr-3"
                                    />
                                    <div>
                                        <div className="font-bold text-white">{item.name}</div>
                                        <div className="text-xs text-gray-500">{item.role || 'Client'}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-secondary-gold font-bold">{item.rating}/5</td>
                                <td className="px-6 py-4 italic truncate max-w-xs">{item.review || item.comment || item.text}</td>
                                <td className="px-6 py-4 font-bold">
                                    <span className={item.status === 'approved' ? 'text-green-500' : item.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}>
                                        {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 space-x-3 text-sm">
                                    {item.status !== 'approved' && (
                                        <button onClick={() => handleStatusUpdate(item._id, 'approved')} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500">
                                            Approve
                                        </button>
                                    )}
                                    {item.status !== 'rejected' && (
                                        <button onClick={() => handleStatusUpdate(item._id, 'rejected')} className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-500">
                                            Reject
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {testimonials.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-8 text-gray-500">
                                    No testimonials found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TestimonialList;
