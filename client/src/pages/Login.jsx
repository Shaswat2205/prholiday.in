import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/common/SEO';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');
        try {
            const res = await login(data.email, data.password);
            if (res.user?.role === 'admin') {
                navigate('/admin/dashboard', { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 bg-brand-light flex items-center">
            <SEO title="Login - PRHolidays" description="Login to your PRHolidays account to manage your bookings." />

            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto bg-white rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row shadow-gray-200/50 border border-gray-100">

                    {/* Visual Side */}
                    <div className="md:w-1/2 bg-brand-secondary relative overflow-hidden p-12 flex flex-col justify-between text-white">
                        <div className="relative z-10">
                            <Link to="/">
                                <img src="/logo.png" alt="PRHolidays" className="h-12 w-auto brightness-0 invert mb-12" />
                            </Link>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Welcome <br />Back, Explorer</h2>
                            <p className="text-white/70 font-medium text-lg max-w-sm">
                                Login to access your personalized travel dashboard and manage your upcoming adventures.
                            </p>
                        </div>

                        <div className="relative z-10">
                            <div className="flex -space-x-4 mb-4">
                                {[1, 2, 3, 4].map(i => (
                                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-12 h-12 rounded-full border-4 border-brand-secondary" />
                                ))}
                                <div className="w-12 h-12 rounded-full border-4 border-brand-secondary bg-brand-primary flex items-center justify-center text-xs font-bold">
                                    +2k
                                </div>
                            </div>
                            <p className="text-sm font-bold opacity-60 uppercase tracking-widest">Joined by 2000+ travelers</p>
                        </div>

                        {/* Abstract Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl -ml-40 -mb-40"></div>
                    </div>

                    {/* Form Side */}
                    <div className="md:w-1/2 p-12 md:p-20">
                        <div className="mb-12">
                            <h3 className="text-3xl font-black text-brand-secondary mb-2">Login</h3>
                            <p className="text-brand-gray-500 font-medium">Enter your credentials to continue</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 text-red-500 p-4 rounded-2xl mb-8 text-sm font-bold border border-red-100 flex items-center gap-3"
                            >
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input
                                        type="email"
                                        {...register("email", { required: true })}
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                {errors.email && <span className="text-red-500 text-[10px] font-bold mt-1 block">Valid email is required</span>}
                            </div>

                            <div>
                                <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Password</label>
                                <div className="relative">
                                    <FaLock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input
                                        type="password"
                                        {...register("password", { required: true })}
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && <span className="text-red-500 text-[10px] font-bold mt-1 block">Password is required</span>}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded-md border-gray-300 text-brand-primary focus:ring-brand-primary" />
                                    <span className="text-xs font-bold text-brand-gray-500 group-hover:text-brand-secondary transition-colors">Remember me</span>
                                </label>
                                <Link to="#" className="text-xs font-bold text-brand-primary hover:underline">Forgot Password?</Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-brand-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-primary/30 hover:shadow-brand-primary/40 transform active:scale-95 transition-all text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Sign In <FaArrowRight />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 text-center">
                            <p className="text-brand-gray-500 font-bold text-sm">
                                Don't have an account? <Link to="/register" className="text-brand-primary hover:underline ml-1">Create Account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
