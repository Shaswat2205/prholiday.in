import React from 'react';

const VideoBackground = ({ src, poster, children, overlayOpacity = 0.5 }) => {
    const videoRef = React.useRef(null);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.0;
            videoRef.current.play().catch(error => {
                console.error("Video autoplay failed:", error);
            });
        }
    }, [src]);

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Video Layer */}
            <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src={src}
                poster={poster}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay Layer to ensure text readability */}
            <div
                className="absolute top-0 left-0 w-full h-full z-10 bg-primary-start"
                style={{ opacity: overlayOpacity }}
            ></div>

            {/* Content Layer */}
            <div className="relative z-20 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default VideoBackground;
