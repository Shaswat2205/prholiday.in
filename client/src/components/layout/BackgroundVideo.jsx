import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const BackgroundVideo = () => {
    const [videos, setVideos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                // Fetch from both Gallery API and Local Videos API
                const [galleryRes, localRes] = await Promise.all([
                    axios.get(`${apiUrl}/api/gallery`),
                    axios.get(`${apiUrl}/api/local-videos`)
                ]);

                const galleryItems = galleryRes.data.data || [];
                const localItems = localRes.data.data || [];

                const videoItems = [
                    ...localItems,
                    ...galleryItems.filter(item => item.type === 'video' && item.active)
                ];
                
                if (videoItems.length > 0) {
                    setVideos(videoItems);
                } else {
                    // Final fallback if both are empty
                    setVideos([
                        { _id: 'fallback-1', url: '/videos/beach.mp4', isLocal: true },
                        { _id: 'fallback-2', url: '/videos/forest.mp4', isLocal: true },
                        { _id: 'fallback-3', url: '/videos/mountain.mp4', isLocal: true }
                    ]);
                }
            } catch (err) {
                console.error('Error fetching background videos:', err);
                // Fallback to local files if API fails
                setVideos([
                    { _id: 'fallback-1', url: '/videos/beach.mp4', isLocal: true },
                    { _id: 'fallback-2', url: '/videos/forest.mp4', isLocal: true },
                    { _id: 'fallback-3', url: '/videos/mountain.mp4', isLocal: true }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
        
        // Refresh video list every 5 minutes to catch newly added videos
        const interval = setInterval(fetchVideos, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [apiUrl]);

    const handleVideoEnd = () => {
        if (videos.length === 0) return;
        
        const nextIdx = (currentIndex + 1) % videos.length;
        setNextIndex(nextIdx);
        
        // Delay switching the current index to allow for cross-fade
        // The actual switch happens after the fade-in of the next video
        setTimeout(() => {
            setCurrentIndex(nextIdx);
            setNextIndex(null);
        }, 1000); // Match this with transition duration
    };

    if (loading || videos.length === 0) {
        return (
            <div className="fixed inset-0 w-full h-full bg-brand-secondary z-[-2]" />
        );
    }

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden z-[-2] pointer-events-none transition-opacity duration-1000">
            {/* Dynamic Styling Overlays */}
            <div className="absolute inset-0 bg-brand-secondary/40 backdrop-blur-[2px] z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-secondary/20 to-brand-secondary/60 z-[2]" />

            <AnimatePresence mode="popLayout">
                <motion.div
                    key={videos[currentIndex]._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <video
                        src={videos[currentIndex].url}
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnd}
                        className="w-full h-full object-cover animate-kenburns scale-110"
                        style={{ filter: 'brightness(0.7)' }}
                    />
                </motion.div>
                
                {nextIndex !== null && (
                    <motion.div
                        key={videos[nextIndex]._id + '-next'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <video
                            src={videos[nextIndex].url}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BackgroundVideo;
