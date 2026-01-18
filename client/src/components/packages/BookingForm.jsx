import React from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios';

const BookingForm = ({ packageId, packageName, price }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const bookingData = {
                ...data,
                packageId,
                packageName,
                travelers: parseInt(data.travelers)
            };

            await axios.post('http://localhost:5000/api/bookings', bookingData);
            alert('Booking inquiry submitted successfully! We will contact you shortly.');
            reset();
        } catch (err) {
            console.error(err);
            alert('Error submitting booking: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Book This Package</h3>
            <p className="text-secondary-gold text-lg font-semibold mb-6">Price: ${price} / person</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-gray-300 mb-1 text-sm">Full Name</label>
                    <input
                        {...register("name", { required: true })}
                        className="w-full bg-black/40 border border-white/10 rounded px-4 py-2 text-white focus:border-secondary-cyan focus:outline-none"
                        placeholder="John Doe"
                    />
                    {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                </div>

                <div>
                    <label className="block text-gray-300 mb-1 text-sm">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full bg-black/40 border border-white/10 rounded px-4 py-2 text-white focus:border-secondary-cyan focus:outline-none"
                        placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
                </div>

                <div>
                    <label className="block text-gray-300 mb-1 text-sm">Phone</label>
                    <input
                        {...register("phone", { required: true })}
                        className="w-full bg-black/40 border border-white/10 rounded px-4 py-2 text-white focus:border-secondary-cyan focus:outline-none"
                        placeholder="+1 234 567 8900"
                    />
                    {errors.phone && <span className="text-red-500 text-xs">Phone is required</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-300 mb-1 text-sm">Travelers</label>
                        <input
                            type="number"
                            min="1"
                            defaultValue="2"
                            {...register("travelers", { required: true, min: 1 })}
                            className="w-full bg-black/40 border border-white/10 rounded px-4 py-2 text-white focus:border-secondary-cyan focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1 text-sm">Travel Date</label>
                        <input
                            type="date"
                            {...register("travelDate", { required: true })}
                            className="w-full bg-black/40 border border-white/10 rounded px-4 py-2 text-white focus:border-secondary-cyan focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-300 mb-1 text-sm">Message (Optional)</label>
                    <textarea
                        {...register("message")}
                        className="w-full bg-black/40 border border-white/10 rounded px-4 py-2 text-white focus:border-secondary-cyan focus:outline-none h-24"
                        placeholder="Special requests, dietary restrictions, etc."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-secondary-cyan to-blue-600 text-white font-bold py-3 rounded hover:opacity-90 transition-opacity"
                >
                    Submit Inquiry
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
