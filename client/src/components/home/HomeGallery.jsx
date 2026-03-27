import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import axios from 'axios';



const HomeGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await axios.get('/api/gallery');
                const galleryData = res.data.data
                    .filter(item => item.type === 'image')
                    .map(item => ({
                        original: item.url,
                        thumbnail: item.thumbnail || item.url,
                        description: item.caption
                    }));
                setImages(galleryData);
            } catch (err) {
                console.error('Error fetching gallery:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    if (loading) {
        return <div className="h-[400px] flex items-center justify-center text-white/50">Loading Gallery...</div>;
    }

    if (images.length === 0) {
        return null;
    }

    return (
        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <ImageGallery
                items={images}
                showPlayButton={true}
                showFullscreenButton={true}
                slideInterval={4000}
                slideOnThumbnailOver={true}
                showIndex={true}
                additionalClass="custom-gallery"
            />
        </div>
    );
};

export default HomeGallery;
