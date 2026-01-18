import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaCloudUploadAlt } from 'react-icons/fa';

const TestimonialForm = () => {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (isEditMode) {
            fetchTestimonial();
        }
    }, [id]);

    const fetchTestimonial = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/testimonials/${id}`);
            reset(res.data.data);
        } catch (err) {
            console.error(err);
            alert('Error fetching testimonial');
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (isEditMode) {
                await axios.put(`http://localhost:5000/api/admin/testimonials/${id}`, data, config);
                alert('Testimonial updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/admin/testimonials', data, config);
                alert('Testimonial created successfully');
            }
            navigate('/admin/testimonials');
        } catch (err) {
            console.error(err);
            alert('Error saving testimonial: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('adminToken');
            const res = await axios.post('http://localhost:5000/api/admin/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            setValue('image', `http://localhost:5000${res.data.data}`);
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        }
    };

    return (
        <div className="max-w-xl mx-auto pb-20">
            <h1 className="text-3xl font-bold text-white mb-8">{isEditMode ? 'Edit Testimonial' : 'Add Testimonial'}</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-gray-800 p-8 rounded-xl border border-gray-700">
                <div>
                    <label className="block text-gray-400 mb-2 font-semibold">Client Name</label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                    />
                    {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 font-semibold">Role / Title (Optional)</label>
                    <input
                        {...register("role")}
                        className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                        placeholder="e.g. Travel Enthusiast"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 font-semibold">Rating (1-5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        {...register("rating", { required: "Rating is required", min: 1, max: 5 })}
                        className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                    />
                    {errors.rating && <span className="text-red-400 text-sm">{errors.rating.message}</span>}
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 font-semibold">Testimonial Text</label>
                    <textarea
                        {...register("text", { required: "Text is required" })}
                        rows="4"
                        className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                        placeholder="They say..."
                    ></textarea>
                    {errors.text && <span className="text-red-400 text-sm">{errors.text.message}</span>}
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 font-semibold">Client Image URL</label>
                    <div className="flex items-center space-x-4 mb-2">
                        <label className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded flex items-center">
                            <FaCloudUploadAlt className="mr-2" /> Upload Image
                            <input type="file" className="hidden" onChange={handleImageUpload} />
                        </label>
                    </div>
                    <input
                        {...register("image")}
                        className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                        placeholder="https://..."
                    />
                </div>

                <div className="pt-6 border-t border-gray-700">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-secondary-cyan to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity w-full"
                    >
                        {loading ? 'Saving...' : (isEditMode ? 'Update' : 'Add')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TestimonialForm;
