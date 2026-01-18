import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { FaTrash, FaPlus, FaCloudUploadAlt } from 'react-icons/fa';

const PackageForm = () => {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Setup React Hook Form
    const { register, control, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            description: '',
            price: '',
            maxPax: '',
            duration: { days: '', nights: '' },
            inclusions: [''],
            exclusions: [''],
            itinerary: [''],
            images: [],
            videos: []
        }
    });

    // Field arrays for dynamic lists
    const { fields: incFields, append: appendInc, remove: removeInc } = useFieldArray({ control, name: "inclusions" });
    const { fields: excFields, append: appendExc, remove: removeExc } = useFieldArray({ control, name: "exclusions" });
    const { fields: itinFields, append: appendItin, remove: removeItin } = useFieldArray({ control, name: "itinerary" });

    // Fetch package data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            fetchPackage();
        }
    }, [id]);

    const fetchPackage = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/packages/${id}`);
            const pkg = res.data.data;
            // Reset form with fetched data
            reset({
                ...pkg,
                inclusions: pkg.inclusions.length ? pkg.inclusions : [''],
                exclusions: pkg.exclusions.length ? pkg.exclusions : [''],
                itinerary: pkg.itinerary.length ? pkg.itinerary : ['']
            });
        } catch (err) {
            console.error(err);
            alert('Error fetching package details');
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

            // Clean up empty array fields
            const cleanData = {
                ...data,
                inclusions: data.inclusions.filter(i => i.trim() !== ''),
                exclusions: data.exclusions.filter(i => i.trim() !== ''),
                itinerary: data.itinerary.filter(i => i.trim() !== '')
            };

            if (isEditMode) {
                await axios.put(`http://localhost:5000/api/admin/packages/${id}`, cleanData, config);
                alert('Package updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/admin/packages', cleanData, config);
                alert('Package created successfully');
            }
            navigate('/admin/packages');
        } catch (err) {
            console.error(err);
            alert('Error saving package: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    // Handle Image Upload Helper
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

            // Allow manual array append via form helpers or just manual text input
            // For simplicity here, we alert the user with the URL to copy-paste, 
            // or better yet, we can append to a hidden list.
            // Let's just append to our current images list in the form
            const currentImages = control._formValues.images || [];
            setValue('images', [...currentImages, `http://localhost:5000${res.data.data}`]);

        } catch (err) {
            console.error(err);
            alert('Upload failed');
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <h1 className="text-3xl font-bold text-white mb-8">{isEditMode ? 'Edit Package' : 'Create New Package'}</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-gray-800 p-8 rounded-xl border border-gray-700">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-gray-400 mb-2 font-semibold">Package Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                            placeholder="e.g. Bali Paradise Retreat"
                        />
                        {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-gray-400 mb-2 font-semibold">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            rows="4"
                            className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                            placeholder="Detailed overview..."
                        ></textarea>
                        {errors.description && <span className="text-red-400 text-sm">{errors.description.message}</span>}
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-2 font-semibold">Price ($)</label>
                        <input
                            type="number"
                            {...register("price", { required: "Price is required" })}
                            className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                        />
                        {errors.price && <span className="text-red-400 text-sm">{errors.price.message}</span>}
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-2 font-semibold">Max Pax</label>
                        <input
                            type="number"
                            {...register("maxPax", { required: "Max Pax is required" })}
                            className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-2 font-semibold">Duration (Days)</label>
                        <input
                            type="number"
                            {...register("duration.days", { required: true })}
                            className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-2 font-semibold">Duration (Nights)</label>
                        <input
                            type="number"
                            {...register("duration.nights", { required: true })}
                            className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                        />
                    </div>
                </div>

                {/* Media Upload Simplified */}
                <div>
                    <label className="block text-gray-400 mb-2 font-semibold">Image URLs (Add one per line manually or use upload button)</label>
                    <div className="flex items-center space-x-4 mb-4">
                        <label className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded flex items-center">
                            <FaCloudUploadAlt className="mr-2" /> Upload Image
                            <input type="file" className="hidden" onChange={handleImageUpload} />
                        </label>
                        <span className="text-gray-500 text-sm">Uploads will automatically append to the list below.</span>
                    </div>

                    {/* We'll use a dynamic field for images to view/remove them */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* For simplicity in this iteration, we rely on the user seeing the uploaded strings in a simple way or we can just list them. 
                                Let's actually use a field array for images properly if we want to be fancy, but simple text area joining is robust enough for MVP.
                                Actually, let's just stick to the text inputs for arrays logic we use below.
                             */}
                    </div>
                </div>

                {/* Itinerary */}
                <div>
                    <label className="block text-gray-400 mb-2 font-semibold text-xl">Itinerary</label>
                    {itinFields.map((field, index) => (
                        <div key={field.id} className="flex mb-2">
                            <textarea
                                {...register(`itinerary.${index}`)}
                                className="flex-grow bg-gray-700 text-white rounded px-4 py-2 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                                placeholder={`Day ${index + 1}`}
                                rows="2"
                            />
                            <button type="button" onClick={() => removeItin(index)} className="ml-2 text-red-400 hover:text-red-300">
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendItin('')} className="text-secondary-cyan hover:text-white flex items-center font-semibold mt-2">
                        <FaPlus className="mr-1" /> Add Day
                    </button>
                </div>

                {/* Inclusions */}
                <div>
                    <label className="block text-gray-400 mb-2 font-semibold text-xl">Inclusions</label>
                    {incFields.map((field, index) => (
                        <div key={field.id} className="flex mb-2">
                            <input
                                {...register(`inclusions.${index}`)}
                                className="flex-grow bg-gray-700 text-white rounded px-4 py-2 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                                placeholder="Included item"
                            />
                            <button type="button" onClick={() => removeInc(index)} className="ml-2 text-red-400 hover:text-red-300">
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendInc('')} className="text-secondary-cyan hover:text-white flex items-center font-semibold mt-2">
                        <FaPlus className="mr-1" /> Add Inclusion
                    </button>
                </div>

                {/* Exclusions */}
                <div>
                    <label className="block text-gray-400 mb-2 font-semibold text-xl">Exclusions</label>
                    {excFields.map((field, index) => (
                        <div key={field.id} className="flex mb-2">
                            <input
                                {...register(`exclusions.${index}`)}
                                className="flex-grow bg-gray-700 text-white rounded px-4 py-2 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                                placeholder="Excluded item"
                            />
                            <button type="button" onClick={() => removeExc(index)} className="ml-2 text-red-400 hover:text-red-300">
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendExc('')} className="text-secondary-cyan hover:text-white flex items-center font-semibold mt-2">
                        <FaPlus className="mr-1" /> Add Exclusion
                    </button>
                </div>

                <div className="pt-6 border-t border-gray-700">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-secondary-cyan to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity w-full md:w-auto"
                    >
                        {loading ? 'Saving...' : (isEditMode ? 'Update Package' : 'Create Package')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PackageForm;
