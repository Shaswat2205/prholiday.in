import React from 'react';
import { motion } from 'framer-motion';

const VerticalSlider = ({ value, onChange, min = 1, max = 20 }) => {
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    return (
        <div className="relative h-48 w-16 bg-gray-50/50 backdrop-blur-sm rounded-xl border border-gray-100 overflow-hidden flex flex-col items-center py-2 shadow-inner">
            <div 
                className="flex flex-col gap-2 overflow-y-auto no-scrollbar snap-y snap-mandatory h-full w-full items-center"
                onScroll={(e) => {
                    const scrollY = e.target.scrollTop;
                    const itemHeight = 32; // h-8 = 32px
                    const selectedIndex = Math.round(scrollY / (itemHeight + 8)); // 8 is gap-2
                    const newValue = numbers[selectedIndex];
                    if (newValue && newValue !== value) {
                        onChange(newValue);
                    }
                }}
            >
                {numbers.map((num) => (
                    <motion.div
                        key={num}
                        className={`snap-center flex-shrink-0 w-10 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-all ${
                            value === num 
                            ? 'bg-brand-primary text-white font-bold scale-110 shadow-lg' 
                            : 'text-gray-400 hover:text-brand-primary'
                        }`}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onChange(num)}
                    >
                        {num}
                    </motion.div>
                ))}
            </div>
            {/* Visual pointers/accents */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 pointer-events-none border-y border-brand-primary/20 bg-brand-primary/5"></div>
        </div>
    );
};

export default VerticalSlider;
