import React, { useState, useEffect } from 'react';
import { FaTrash, FaUserCheck, FaUserShield, FaUser } from 'react-icons/fa';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get(`/api/users`, config);
            setUsers(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.delete(`/api/users/${id}`, config);
                setUsers(users.filter(u => u._id !== id));
            } catch (err) {
                alert('Error deleting user');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="text-gray-500 font-bold animate-pulse">Loading users...</div>;

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl lg:text-4xl font-black text-brand-secondary">Manage Users</h1>
            </div>

            <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/40 border border-gray-50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-600">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-5">User</th>
                                <th className="px-6 py-5">Email</th>
                                <th className="px-6 py-5">Role</th>
                                <th className="px-6 py-5">Joined Date</th>
                                <th className="px-6 py-5 text-right flex-shrink-0">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 flex items-center">
                                        <img src={user.avatar || 'https://via.placeholder.com/40'} alt={user.name} className="w-10 h-10 rounded-full mr-4 object-cover border-2 border-brand-primary/20" />
                                        <span className="font-bold text-brand-secondary">{user.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-gray-100 text-gray-600'}`}>
                                            {user.role === 'admin' ? <FaUserShield /> : <FaUser />}
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        {user.role !== 'admin' ? (
                                            <button onClick={() => handleDelete(user._id)} className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl inline-flex transition-colors" title="Delete User">
                                                <FaTrash size={16} />
                                            </button>
                                        ) : (
                                            <span className="text-xs text-gray-400 font-bold block pr-4">Protected</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center py-12 text-gray-400 font-medium tracking-wide">
                                        No users found.
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

export default UserList;
