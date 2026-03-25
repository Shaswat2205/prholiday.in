import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaKey, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import SEO from '../components/common/SEO';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1 = Request OTP, 2 = Verify OTP & Reset
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSentTo, setEmailSentTo] = useState('');

    const password = watch("newPassword", "");

    const onRequestOtp = async (data) => {
        setIsLoading(true);
        setError('');
        try {
            const res = await axios.post('/api/users/forgot-password', { email: data.email });
            setEmailSentTo(data.email);
            setSuccess(res.data.message || 'OTP sent successfully!');
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to request OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const onResetPassword = async (data) => {
        setIsLoading(true);
        setError('');
        try {
            await axios.post('/api/users/reset-password', {
                email: emailSentTo,
                otp: data.otp,
                newPassword: data.newPassword
            });
            setSuccess('Password updated successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password. Invalid or expired OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-20 bg-brand-light flex items-center">
            <SEO title="Forgot Password - PRHolidays" description="Reset your PRHolidays account password." />

            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto bg-white rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row shadow-gray-200/50 border border-gray-100">
                    
                    {/* Visual Side */}
                    <div className="md:w-1/2 bg-brand-secondary relative overflow-hidden p-12 flex flex-col justify-between text-white">
                        <div className="relative z-10">
                            <Link to="/">
                                <img src="/logo.png" alt="PRHolidays" className="h-12 w-auto brightness-0 invert mb-12" />
                            </Link>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Secure <br />Account Recovery</h2>
                            <p className="text-white/70 font-medium text-lg max-w-sm">
                                We'll send a 6-digit confirmation code to your email. Enter that code along with your new password to regain access to your travels.
                            </p>
                        </div>
                        
                        {/* Abstract Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl -ml-40 -mb-40"></div>
                    </div>

                    {/* Form Side */}
                    <div className="md:w-1/2 p-12 md:p-20 relative">
                        <div className="mb-12">
                            <h3 className="text-3xl font-black text-brand-secondary mb-2">Forgot Password?</h3>
                            <p className="text-brand-gray-500 font-medium">Follow the simple steps to reset your password</p>
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
                        
                        {success && step === 2 && !error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-50 text-green-600 p-4 rounded-2xl mb-8 text-sm font-bold border border-green-100 flex items-center gap-3"
                            >
                                <FaCheckCircle className="text-green-500 text-lg" />
                                {success}
                            </motion.div>
                        )}

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.form 
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleSubmit(onRequestOtp)} 
                                    className="space-y-6"
                                >
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

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-brand-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-primary/30 hover:shadow-brand-primary/40 transform active:scale-95 transition-all text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-70 mt-8"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Send OTP <FaArrowRight />
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}

                            {step === 2 && (
                                <motion.form 
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleSubmit(onResetPassword)} 
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">6-Digit OTP</label>
                                        <div className="relative">
                                            <FaKey className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                            <input
                                                type="text"
                                                maxLength="6"
                                                {...register("otp", { required: true, pattern: /^[0-9]{6}$/ })}
                                                className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold tracking-[0.5em] text-xl"
                                                placeholder="••••••"
                                            />
                                        </div>
                                        {errors.otp && <span className="text-red-500 text-[10px] font-bold mt-1 block">Valid 6-digit OTP is required</span>}
                                    </div>

                                    <div>
                                        <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">New Password</label>
                                        <div className="relative">
                                            <FaLock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                            <input
                                                type="password"
                                                {...register("newPassword", { required: true, minLength: 6 })}
                                                className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        {errors.newPassword && <span className="text-red-500 text-[10px] font-bold mt-1 block">Min 6 characters required</span>}
                                    </div>

                                    <div>
                                        <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Confirm New Password</label>
                                        <div className="relative">
                                            <FaLock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                            <input
                                                type="password"
                                                {...register("confirmPassword", { 
                                                    required: true,
                                                    validate: value => value === password || "Passwords do not match"
                                                })}
                                                className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl pl-14 pr-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        {errors.confirmPassword && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.confirmPassword.message}</span>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-brand-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-primary/30 hover:shadow-brand-primary/40 transform active:scale-95 transition-all text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-70 mt-8"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Reset Password <FaArrowRight />
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        <div className="mt-8 text-center relative z-20">
                            <p className="text-brand-gray-500 font-bold text-sm">
                                Remember your password? <Link to="/login" className="text-brand-primary hover:underline ml-1">Back to Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
