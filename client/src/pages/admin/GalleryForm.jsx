import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaCloudUploadAlt } from 'react-icons/fa';

const GalleryForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            await axios.post('http://localhost:5000/api/admin/gallery', data, config);
            alert('Image added successfully');
            navigate('/admin/gallery');
        } catch (err) {
            console.error(err);
            alert('Error adding image: ' + (err.response?.data?.message || err.message));
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
            setValue('imageUrl', `http://localhost:5000${res.data.data}`);
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        }
    };

    return (
        <div className="max-w-xl mx-auto pb-20">
            <h1 className="text-3xl font-bold text-white mb-8">Add to Gallery</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-gray-800 p-8 rounded-xl border border-gray-700">
                <div>
                    <label className="block text-gray-400 mb-2 font-semibold">Image URL</label>
                    <div className="flex items-center space-x-4 mb-2">
                        <label className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded flex items-center">
                            <FaCloudUploadAlt className="mr-2" /> Upload Image
                            <input type="file" className="hidden" onChange={handleImageUpload} />
                        </label>
                    </div>
                    <input
                        {...register("imageUrl", { required: "Image URL is required" })}
                        className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                        placeholder="https://..."
                    />
                    {errors.imageUrl && <span className="text-red-400 text-sm">{errors.imageUrl.message}</span>}
                </div>

                <div>
                    <label className="block text-gray-400 mb-2 font-semibold">Caption / Description (Optional)</label>
                    <input
                        {...register("description")}
                        className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                        placeholder="Beautiful sunrise..."
                    />
                </div>

                <div className="pt-6 border-t border-gray-700">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-secondary-cyan to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity w-full"
                    >
                        {loading ? 'Saving...' : 'Add Image'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GalleryForm;
