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
            const res = await axios.get('http://localhost:5000/api/gallery');
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
                const token = localStorage.getItem('adminToken');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.delete(`http://localhost:5000/api/admin/gallery/${id}`, config);
                setImages(images.filter(img => img._id !== id));
            } catch (err) {
                alert('Error deleting image');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Manage Gallery</h1>
                <Link
                    to="/admin/gallery/new"
                    className="bg-secondary-cyan text-black px-4 py-2 rounded flex items-center font-bold hover:bg-opacity-80 transition-colors"
                >
                    <FaPlus className="mr-2" /> Add New
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map(img => (
                    <div key={img._id} className="relative group bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
                        <img
                            src={img.imageUrl}
                            alt={img.description}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <p className="text-gray-300 text-sm truncate">{img.description || 'No description'}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(img._id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>

            {images.length === 0 && (
                <div className="text-center text-gray-500 mt-12">No images found.</div>
            )}
        </div>
    );
};

export default GalleryList;
