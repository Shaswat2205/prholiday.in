import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await axios.get(`/api/bookings`, config);
            setBookings(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.put(`/api/bookings/${id}`, { status: newStatus }, config);

            setBookings(bookings.map(booking =>
                booking._id === id ? { ...booking, status: newStatus } : booking
            ));
        } catch (err) {
            console.error(err);
            alert('Error updating status');
        }
    };

    if (loading) return <div className="text-gray-500 font-bold animate-pulse">Loading bookings...</div>;

    const getStatusStyle = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-600';
            case 'confirmed': return 'bg-green-100 text-green-600';
            case 'cancelled': return 'bg-red-100 text-red-600';
            case 'completed': return 'bg-blue-100 text-blue-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-black text-brand-secondary">Manage Bookings</h1>
            </div>

            <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/40 border border-gray-50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-5">Date</th>
                                <th className="px-6 py-5">Customer</th>
                                <th className="px-6 py-5">Package</th>
                                <th className="px-6 py-5">Travel Date</th>
                                <th className="px-6 py-5">Travelers</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bookings.map(booking => (
                                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-brand-secondary">{booking.name}</div>
                                        <div className="text-xs text-gray-500">{booking.email}</div>
                                        <div className="text-xs text-gray-400">{booking.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-brand-primary font-bold">
                                        {booking.packageName || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {new Date(booking.travelDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-brand-secondary">
                                        {booking.travelers}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyle(booking.status)}`}>
                                            {booking.status ? booking.status : 'Unknown'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                                            className="bg-gray-50 text-brand-secondary font-bold text-xs rounded-lg px-3 py-2 border border-gray-200 focus:outline-none focus:border-brand-primary cursor-pointer transition-colors"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center py-12 text-gray-400 font-medium tracking-wide">
                                        No bookings found.
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

export default BookingList;
