import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaChevronRight, FaArrowLeft, FaSuitcaseRolling } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import BookingSteps from './BookingSteps';

const BookingForm = ({ packageId, packageName, price }) => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [bookingData, setBookingData] = useState(null);

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            travelers: 2,
            travelDate: new Date().toISOString().split('T')[0]
        }
    });

    const travelersCount = watch('travelers');

    const onNextStep = (data) => {
        setBookingData(data);
        setStep(2);
    };

    const onSubmitFinal = async (data) => {
        setIsLoading(true);
        try {
            const finalData = {
                ...bookingData,
                ...data,
                packageId,
                packageName,
                travelers: parseInt(bookingData.travelers)
            };

            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/bookings`, finalData);
            setStep(3);
        } catch (err) {
            console.error(err);
            alert('Error submitting booking: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            {/* Step 1: Sidebar Form */}
            {step === 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100"
                >
                    <h3 className="text-2xl font-black text-brand-secondary mb-2">Book This Adventure</h3>
                    <p className="text-brand-gray-500 font-medium mb-8">Secure your spot today.</p>

                    <div className="bg-brand-light rounded-2xl p-6 mb-8 border border-brand-primary/10">
                        <span className="text-brand-gray-500 text-[10px] font-black uppercase tracking-widest block mb-1">Starting from</span>
                        <span className="text-3xl font-black text-brand-primary">₹{price}</span>
                        <span className="text-brand-gray-500 font-bold text-sm"> / person</span>
                    </div>

                    <form onSubmit={handleSubmit(onNextStep)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Travelers</label>
                                <input
                                    type="number"
                                    min="1"
                                    {...register("travelers", { required: true, min: 1 })}
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Date</label>
                                <input
                                    type="date"
                                    {...register("travelDate", { required: true })}
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-6 py-4 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-brand-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-primary/30 hover:shadow-brand-primary/40 transform active:scale-95 transition-all text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                        >
                            Select Details <FaChevronRight />
                        </button>

                        <p className="text-center text-[10px] text-brand-gray-500 font-bold uppercase tracking-widest">
                            ⚡ Instant callback guaranteed
                        </p>
                    </form>
                </motion.div>
            )}

            {/* Steps 2 & 3: Overlay Modal */}
            <AnimatePresence>
                {step > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
                    >
                        <div className="absolute inset-0 bg-brand-secondary/40 backdrop-blur-md" onClick={() => step !== 3 && setStep(1)}></div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="p-8 md:p-12">
                                <BookingSteps currentStep={step} />

                                {step === 2 && (
                                    <div className="mt-16">
                                        <div className="mb-10">
                                            <h3 className="text-3xl font-black text-brand-secondary mb-2">Traveler Details</h3>
                                            <p className="text-brand-gray-500 font-medium">Please provide the details for the primary traveler.</p>
                                        </div>

                                        <form onSubmit={handleSubmit(onSubmitFinal)} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                                    <input
                                                        {...register("name", { required: true })}
                                                        className="w-full bg-gray-200/50 border-2 border-transparent rounded-2xl px-8 py-5 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                                    <input
                                                        type="email"
                                                        {...register("email", { required: true })}
                                                        className="w-full bg-gray-200/50 border-2 border-transparent rounded-2xl px-8 py-5 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-brand-secondary font-black text-[10px] uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    {...register("phone", { required: true })}
                                                    className="w-full bg-gray-200/50 border-2 border-transparent rounded-2xl px-8 py-5 text-brand-secondary focus:border-brand-primary/30 focus:bg-white focus:outline-none transition-all font-bold"
                                                    placeholder="+1 234 567 890"
                                                />
                                            </div>

                                            <div className="pt-6 flex flex-col md:flex-row gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setStep(1)}
                                                    className="flex-1 border-2 border-gray-100 text-brand-gray-500 font-black py-5 rounded-2xl hover:bg-gray-50 transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                                                >
                                                    <FaArrowLeft /> Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="flex-[2] bg-brand-primary text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-primary/30 hover:shadow-brand-primary/40 transform active:scale-95 transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                                                >
                                                    {isLoading ? 'Processing...' : 'Confirm Adventure'} <FaSuitcaseRolling />
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="mt-16 text-center py-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 10 }}
                                            className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-2xl shadow-green-500/30"
                                        >
                                            <FaCheckCircle />
                                        </motion.div>
                                        <h3 className="text-4xl font-black text-brand-secondary mb-4">Adventure Requested!</h3>
                                        <p className="text-brand-gray-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                                            We've received your request for <span className="text-brand-primary font-black">{packageName}</span>. Our tour experts will contact you within 2 hours.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setStep(1);
                                                window.scrollTo(0, 0);
                                            }}
                                            className="bg-brand-secondary text-white font-black py-5 px-12 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-sm uppercase tracking-[0.2em]"
                                        >
                                            Explore More Tours
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-brand-light p-6 text-center border-t border-gray-50">
                                <p className="text-[10px] text-brand-gray-500 font-bold uppercase tracking-widest">
                                    Trusted by 50,000+ happy travelers worldwide
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BookingForm;
