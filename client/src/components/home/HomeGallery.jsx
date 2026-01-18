import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const images = [
    {
        original: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=150&auto=format&fit=crop',
        description: 'Beautiful Landscape'
    },
    {
        original: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=150&auto=format&fit=crop',
        description: 'Paris at Night'
    },
    {
        original: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=150&auto=format&fit=crop',
        description: 'Kyoto Streets'
    },
    {
        original: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=150&auto=format&fit=crop',
        description: 'Bali Temple'
    },
    {
        original: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=150&auto=format&fit=crop',
        description: 'Road Trip'
    }
];

const HomeGallery = () => {
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
