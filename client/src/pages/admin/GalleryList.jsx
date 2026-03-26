import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const GalleryList = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const res = await axios.get(`/api/gallery`);
            setImages(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.delete(`/api/gallery/${id}`, config);
                setImages(images.filter(img => img._id !== id));
            } catch (err) {
                alert('Error deleting image');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="text-gray-500 font-bold animate-pulse">Loading gallery...</div>;

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl lg:text-4xl font-black text-brand-secondary">Manage Gallery</h1>
                <Link
                    to="/admin/gallery/new"
                    className="bg-brand-primary text-white px-6 py-3 rounded-full flex items-center shadow-md shadow-brand-primary/30 font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
                >
                    <FaPlus className="mr-2" /> Add Image
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map(img => (
                    <div key={img._id} className="relative group bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/40 border border-gray-100 hover:-translate-y-1 transition-all">
                        <img
                            src={img.imageUrl}
                            alt={img.description}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-5 bg-white">
                            <p className="text-gray-500 font-medium text-sm truncate">{img.description || 'No description provided'}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(img._id)}
                            className="absolute top-3 right-3 bg-white text-red-500 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 scale-90 group-hover:scale-100"
                            title="Delete Image"
                        >
                            <FaTrash size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {images.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-50 mt-4">
                    <div className="text-gray-400 font-medium tracking-wide">No images found in gallery.</div>
                    <Link to="/admin/gallery/new" className="text-brand-primary font-bold hover:underline mt-2 inline-block">Upload your first image</Link>
                </div>
            )}
        </div>
    );
};

export default GalleryList;
