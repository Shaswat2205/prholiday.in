import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
// import { login } from '../../services/authService';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try {
            // Mock login for now
            console.log(data);
            if (data.email === 'admin@prholidays.in' && data.password === 'password123') {
                localStorage.setItem('adminToken', 'mock-jwt-token');
                navigate('/admin/dashboard');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-white text-center mb-8">Admin Login</h1>

                {error && <div className="bg-red-500/20 text-red-500 p-3 rounded mb-4 text-center">{error}</div>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 mb-1 text-sm">Email</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="w-full bg-black/40 border border-white/10 rounded pl-10 pr-4 py-3 text-white focus:border-secondary-cyan focus:outline-none"
                                placeholder="admin@example.com"
                            />
                        </div>
                        {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-1 text-sm">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                type="password"
                                {...register("password", { required: true })}
                                className="w-full bg-black/40 border border-white/10 rounded pl-10 pr-4 py-3 text-white focus:border-secondary-cyan focus:outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && <span className="text-red-500 text-xs">Password is required</span>}
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-secondary-cyan to-blue-600 text-white font-bold py-3 rounded hover:opacity-90 transition-opacity">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
