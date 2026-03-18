import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
    // Replace with the actual admin WhatsApp number
    const phoneNumber = '918895499570'; 
    const message = encodeURIComponent(`Hello PRHoliday.in!,
I feel it’s time to escape, explore, and create new memories.
Can you help me plan a journey worth remembering?`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-colors focus:outline-none focus:ring-4 focus:ring-green-300"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Chat on WhatsApp"
        >
            <motion.div
                animate={{ 
                    scale: [1, 1.1, 1],
                    boxShadow: [
                        '0 0 0 0px rgba(37, 211, 102, 0.4)',
                        '0 0 0 15px rgba(37, 211, 102, 0)',
                        '0 0 0 0px rgba(37, 211, 102, 0)'
                    ]
                }}
                transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full"
            />
            <FaWhatsapp size={35} className="z-10" />
        </motion.a>
    );
};

export default WhatsAppButton;
