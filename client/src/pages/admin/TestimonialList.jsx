import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaCheck, FaTimes, FaTrash, FaStar } from 'react-icons/fa';
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
            const res = await axios.get(`/api/testimonials/admin`, config);
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
                await axios.delete(`/api/testimonials/${id}`, config);
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
            await axios.put(`/api/testimonials/${id}`, { status }, config);
            setTestimonials(testimonials.map(t => t._id === id ? { ...t, status } : t));
        } catch (err) {
            alert('Error updating status');
            console.error(err);
        }
    };

    if (loading) return <div className="text-gray-500 font-bold animate-pulse">Loading testimonials...</div>;

    const getStatusStyle = (status) => {
        if (status === 'approved') return 'bg-green-100 text-green-600';
        if (status === 'rejected') return 'bg-red-100 text-red-600';
        return 'bg-yellow-100 text-yellow-600'; // Pending
    };

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl lg:text-4xl font-black text-brand-secondary">Manage Testimonials</h1>
                <Link
                    to="/admin/testimonials/new"
                    className="bg-brand-primary text-white px-6 py-3 rounded-full flex items-center shadow-md shadow-brand-primary/30 font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
                >
                    <FaPlus className="mr-2" /> Add Testimonial
                </Link>
            </div>

            <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/40 border border-gray-50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-5">User</th>
                                <th className="px-6 py-5">Rating</th>
                                <th className="px-6 py-5">Quote</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {testimonials.map(item => (
                                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 flex items-center">
                                        <img
                                            src={item.image || 'https://via.placeholder.com/40'}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-full object-cover mr-4 shadow-sm"
                                        />
                                        <div>
                                            <div className="font-bold text-brand-secondary">{item.name}</div>
                                            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">{item.role || 'Client'}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-secondary-gold bg-yellow-50 px-3 py-1.5 rounded-full w-max text-sm font-black shadow-sm border border-yellow-100">
                                            <FaStar /> {item.rating}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="italic text-gray-500 truncate max-w-[200px] lg:max-w-xs text-sm font-medium">"{item.review || item.comment || item.text}"</div>
                                    </td>
                                    <td className="px-6 py-4">
                                         <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyle(item.status)}`}>
                                            {item.status ? item.status : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 space-x-2 text-sm whitespace-nowrap">
                                        {item.status !== 'approved' && (
                                            <button onClick={() => handleStatusUpdate(item._id, 'approved')} className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-xl inline-flex transition-colors" title="Approve">
                                                <FaCheck size={16} />
                                            </button>
                                        )}
                                        {item.status !== 'rejected' && (
                                            <button onClick={() => handleStatusUpdate(item._id, 'rejected')} className="p-2 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-xl inline-flex transition-colors" title="Reject">
                                                <FaTimes size={16} />
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl inline-flex transition-colors" title="Delete">
                                            <FaTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {testimonials.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-12 text-gray-400 font-medium tracking-wide">
                                        No testimonials found.
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

export default TestimonialList;
