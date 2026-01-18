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
            const res = await axios.get('http://localhost:5000/api/testimonials');
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
                const token = localStorage.getItem('adminToken');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.delete(`http://localhost:5000/api/admin/testimonials/${id}`, config);
                setTestimonials(testimonials.filter(t => t._id !== id));
            } catch (err) {
                alert('Error deleting testimonial');
                console.error(err);
            }
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
                                <td className="px-6 py-4 italic truncate max-w-xs">{item.text}</td>
                                <td className="px-6 py-4 space-x-3">
                                    <Link to={`/admin/testimonials/edit/${item._id}`} className="text-blue-400 hover:text-blue-300">
                                        <FaEdit size={18} />
                                    </Link>
                                    <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300">
                                        <FaTrash size={18} />
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
