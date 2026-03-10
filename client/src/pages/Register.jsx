import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/common/SEO';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');
        try {
            await signup(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 bg-brand-light flex items-center">
            <SEO title="Join PRHolidays - Experience the World" description="Create an account at PRHolidays to start booking your next adventure." />

            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto bg-white rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse shadow-gray-200/50 border border-gray-100">

                    {/* Visual Side */}
                    <div className="md:w-1/2 bg-brand-secondary relative overflow-hidden p-12 flex flex-col justify-between text-white">
                        <div className="relative z-10 text-right">
                            <Link to="/" className="inline-block">
                                <img src="/logo.png" alt="PRHolidays" className="h-12 w-auto brightness-0 invert mb-12" />
                            </Link>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Start Your <br />Great Journey</h2>
                            <p className="text-white/70 font-medium text-lg ml-auto max-w-sm">
                                Create an account to save your favorite packages and get personalized travel recommendations.
                            </p>
                        </div>

                        <div className="relative z-10 text-right">
                            <div className="flex justify-end -space-x-4 mb-4">
                                {[6, 7, 8, 9].map(i => (
                                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} className="w-12 h-12 rounded-full border-4 border-brand-secondary" />
                                ))}
                            </div>
                            <p className="text-sm font-bold opacity-60 uppercase tracking-widest">Join 500+ new members this month</p>
                        </div>

                        {/* Abstract Background Elements */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -ml-32 -mt-32"></div>
                        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl -mr-40 -mb-40"></div>
                    </div>

                    {/* Form Side */}
                    <div className="md:w-1/2 p-12 md:p-20">
                        <div className="mb-12">
                            <h3 className="text-3xl font-black text-brand-secondary mb-2">Create Account</h3>
                            <p className="text-brand-gray-500 font-medium">Be a part of our global community</p>
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
                                <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                <div className="relative">
                                    <FaUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input
                                        type="text"
                                        {...register("name", { required: true })}
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                        placeholder="e.g. John Doe"
                                    />
                                </div>
                                {errors.name && <span className="text-red-500 text-[10px] font-bold mt-1 block">Full name is required</span>}
                            </div>

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
                                <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Create Password</label>
                                <div className="relative">
                                    <FaLock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input
                                        type="password"
                                        {...register("password", { required: true, minLength: 6 })}
                                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && <span className="text-red-500 text-[10px] font-bold mt-1 block">Password must be at least 6 characters</span>}
                            </div>

                            <p className="text-xs font-bold text-brand-gray-500 leading-relaxed pt-2">
                                By creating an account, you agree to our <Link to="#" className="text-brand-primary hover:underline">Terms of Service</Link> and <Link to="#" className="text-brand-primary hover:underline">Privacy Policy</Link>.
                            </p>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-brand-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-primary/30 hover:shadow-brand-primary/40 transform active:scale-95 transition-all text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Get Started <FaArrowRight />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 text-center">
                            <p className="text-brand-gray-500 font-bold text-sm">
                                Already have an account? <Link to="/login" className="text-brand-primary hover:underline ml-1">Log In</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
