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
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await axios.get('http://localhost:5000/api/admin/bookings', config);
            setBookings(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.put(`http://localhost:5000/api/admin/bookings/${id}`, { status: newStatus }, config);

            setBookings(bookings.map(booking =>
                booking._id === id ? { ...booking, status: newStatus } : booking
            ));
        } catch (err) {
            console.error(err);
            alert('Error updating status');
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'text-yellow-500';
            case 'Confirmed': return 'text-green-500';
            case 'Cancelled': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Manage Bookings</h1>

            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-gray-700 text-gray-100 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Package</th>
                                <th className="px-6 py-4">Travel Date</th>
                                <th className="px-6 py-4">Travelers</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {bookings.map(booking => (
                                <tr key={booking._id} className="hover:bg-gray-750">
                                    <td className="px-6 py-4 text-sm">
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white">{booking.name}</div>
                                        <div className="text-xs text-gray-500">{booking.email}</div>
                                        <div className="text-xs text-gray-500">{booking.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-secondary-cyan font-medium">
                                        {booking.packageName || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(booking.travelDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {booking.travelers}
                                    </td>
                                    <td className="px-6 py-4 font-bold">
                                        <span className={getStatusColor(booking.status)}>{booking.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                                            className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600 focus:outline-none focus:border-secondary-cyan"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center py-8 text-gray-500">
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
