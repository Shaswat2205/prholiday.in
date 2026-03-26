import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { FaTrash, FaPlus, FaCloudUploadAlt, FaMagic, FaSpinner } from 'react-icons/fa';

const PackageForm = () => {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);

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
            videos: [],
            category: ''
        }
    });

    // Field arrays for dynamic lists
    const { fields: incFields, append: appendInc, remove: removeInc, replace: replaceInc } = useFieldArray({ control, name: "inclusions" });
    const { fields: excFields, append: appendExc, remove: removeExc, replace: replaceExc } = useFieldArray({ control, name: "exclusions" });
    const { fields: itinFields, append: appendItin, remove: removeItin, replace: replaceItin } = useFieldArray({ control, name: "itinerary" });

    // Fetch package data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            fetchPackage();
        }
    }, [id]);

    const fetchPackage = async () => {
        try {
            const res = await axios.get(`/api/packages/${id}`);
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

    const handleExtract = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('document', file);

        setIsExtracting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`/api/packages/extract-from-document`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            const extractedData = res.data.data;
            if (extractedData) {
                // Populate scalar fields
                if (extractedData.name) setValue('name', extractedData.name, { shouldValidate: true });
                if (extractedData.description) setValue('description', extractedData.description, { shouldValidate: true });
                if (extractedData.price) setValue('price', extractedData.price, { shouldValidate: true });
                if (extractedData.maxPax) setValue('maxPax', extractedData.maxPax, { shouldValidate: true });
                if (extractedData.category) setValue('category', extractedData.category, { shouldValidate: true });
                
                // Populate nested object
                if (extractedData.duration) {
                    setValue('duration.days', extractedData.duration.days || '', { shouldValidate: true });
                    setValue('duration.nights', extractedData.duration.nights || '', { shouldValidate: true });
                }

                // Populate Arrays using replace from useFieldArray to ensure UI updates cleanly
                if (extractedData.inclusions && Array.isArray(extractedData.inclusions)) {
                    replaceInc(extractedData.inclusions.length ? extractedData.inclusions : ['']);
                }
                if (extractedData.exclusions && Array.isArray(extractedData.exclusions)) {
                    replaceExc(extractedData.exclusions.length ? extractedData.exclusions : ['']);
                }
                if (extractedData.itinerary && Array.isArray(extractedData.itinerary)) {
                    replaceItin(extractedData.itinerary.length ? extractedData.itinerary : ['']);
                }

                alert('Form populated with AI data. Please review the details thoroughly before saving.');
            }
        } catch (err) {
            console.error(err);
            alert('Extraction failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsExtracting(false);
            e.target.value = null; // Reset input strictly
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            // Clean up empty array fields
            const cleanData = {
                ...data,
                inclusions: data.inclusions.filter((i) => typeof i === 'string' ? i.trim() !== '' : i),
                exclusions: data.exclusions.filter((i) => typeof i === 'string' ? i.trim() !== '' : i),
                itinerary: data.itinerary.filter((i) => typeof i === 'string' ? i.trim() !== '' : i)
            };

            if (isEditMode) {
                await axios.put(`/api/packages/${id}`, cleanData, config);
                alert('Package updated successfully');
            } else {
                await axios.post(`/api/packages`, cleanData, config);
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
            const token = localStorage.getItem('token');
            const res = await axios.post(`/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            const currentImages = control._formValues.images || [];
            setValue('images', [...currentImages, `${res.data.data}`]);
            alert('Image successfully added to the array.');
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-white">{isEditMode ? 'Edit Package' : 'Create New Package'}</h1>
                {/* AI Autofill Button */}
                <label className="cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-5 py-2.5 rounded-lg flex items-center font-bold shadow-lg transition-all w-full sm:w-auto justify-center">
                    {isExtracting ? (
                        <><FaSpinner className="animate-spin mr-2" /> Analyzing Doc...</>
                    ) : (
                        <><FaMagic className="mr-2" /> AI Autofill from PDF/DOC</>
                    )}
                    <input 
                        type="file" 
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                        className="hidden" 
                        onChange={handleExtract} 
                        disabled={isExtracting}
                    />
                </label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-gray-400 mb-2 font-semibold">Package Name</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none focus:ring-1 focus:ring-secondary-cyan"
                            placeholder="e.g. Bali Paradise Retreat"
                        />
                        {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-gray-400 mb-2 font-semibold">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            rows="4"
                            className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none focus:ring-1 focus:ring-secondary-cyan"
                            placeholder="Detailed overview..."
                        ></textarea>
                        {errors.description && <span className="text-red-400 text-sm">{errors.description.message}</span>}
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-2 font-semibold">Price (₹)</label>
                        <input
                            type="number"
                            {...register("price", { required: "Price is required" })}
                            className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                        />
                        {errors.price && <span className="text-red-400 text-sm">{errors.price.message}</span>}
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-2 font-semibold">Category</label>
                        <select
                            {...register("category", { required: "Category is required" })}
                            className="w-full bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                        >
                            <option value="">Select a Category</option>
                            {['Spiritual', 'Adventure', 'Nature', 'Heritage', 'Beach', 'Solo Trip', 'Family', 'Luxury', 'Honeymoon', 'Wildlife', 'Cultural'].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <span className="text-red-400 text-sm">{errors.category.message}</span>}
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
                    <label className="block text-gray-400 mb-2 font-semibold">Image Upload</label>
                    <div className="flex items-center space-x-4 mb-4">
                        <label className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded flex items-center transition-colors">
                            <FaCloudUploadAlt className="mr-2" /> Upload Image
                            <input type="file" className="hidden" onChange={handleImageUpload} />
                        </label>
                        <span className="text-gray-500 text-sm">Uploads will automatically append to the internal array.</span>
                    </div>
                </div>

                {/* Itinerary */}
                <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                    <label className="block text-white mb-4 font-bold text-xl">Itinerary</label>
                    {itinFields.map((field, index) => (
                        <div key={field.id} className="flex mb-3 items-start">
                            <textarea
                                {...register(`itinerary.${index}`)}
                                className="flex-grow bg-gray-700 text-white rounded px-4 py-3 border border-gray-600 focus:border-secondary-cyan focus:outline-none resize-y min-h-[80px]"
                                placeholder={`Day ${index + 1} detailed itinerary...`}
                            />
                            <button type="button" onClick={() => removeItin(index)} className="ml-3 mt-2 p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded transition-colors" title="Remove Day">
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendItin('')} className="bg-secondary-cyan/10 text-secondary-cyan hover:bg-secondary-cyan/20 px-4 py-2 rounded flex items-center font-bold mt-2 transition-colors">
                        <FaPlus className="mr-2" /> Add Next Day
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Inclusions */}
                    <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                        <label className="block text-white mb-4 font-bold text-xl">Inclusions</label>
                        {incFields.map((field, index) => (
                            <div key={field.id} className="flex mb-3 items-center">
                                <span className="text-secondary-cyan mr-3 font-black">•</span>
                                <input
                                    {...register(`inclusions.${index}`)}
                                    className="flex-grow bg-gray-700 text-white rounded px-4 py-2 border border-gray-600 focus:border-secondary-cyan focus:outline-none"
                                    placeholder="e.g. Daily Breakfast"
                                />
                                <button type="button" onClick={() => removeInc(index)} className="ml-3 text-red-400 hover:text-red-300">
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => appendInc('')} className="text-secondary-cyan hover:text-white flex items-center font-bold mt-4 text-sm">
                            <FaPlus className="mr-1" /> Add Inclusion
                        </button>
                    </div>

                    {/* Exclusions */}
                    <div className="bg-gray-750 p-6 rounded-lg border border-gray-600">
                        <label className="block text-white mb-4 font-bold text-xl">Exclusions</label>
                        {excFields.map((field, index) => (
                            <div key={field.id} className="flex mb-3 items-center">
                                <span className="text-red-400 mr-3 font-black">×</span>
                                <input
                                    {...register(`exclusions.${index}`)}
                                    className="flex-grow bg-gray-700 text-white rounded px-4 py-2 border border-gray-600 focus:border-red-400 focus:outline-none"
                                    placeholder="e.g. Flight Tickets"
                                />
                                <button type="button" onClick={() => removeExc(index)} className="ml-3 text-red-400 hover:text-red-300">
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => appendExc('')} className="text-red-400 hover:text-red-300 flex items-center font-bold mt-4 text-sm">
                            <FaPlus className="mr-1" /> Add Exclusion
                        </button>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-700 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading || isExtracting}
                        className="bg-gradient-to-r from-secondary-cyan to-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transition-all w-full md:w-auto disabled:opacity-50 text-lg"
                    >
                        {loading ? 'Saving Package...' : (isEditMode ? 'Update Package' : 'Create Package')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PackageForm;
