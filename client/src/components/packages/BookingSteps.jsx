import React from 'react';
import { FaCheck } from 'react-icons/fa';

const BookingSteps = ({ currentStep }) => {
    const steps = [
        { id: 1, name: 'Adventure' },
        { id: 2, name: 'Travelers' },
        { id: 3, name: 'Confirm' }
    ];

    return (
        <div className="flex items-center justify-between mb-12 relative">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

            {/* Active Line */}
            <div
                className="absolute top-1/2 left-0 h-0.5 bg-brand-primary -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 ${currentStep > step.id
                                ? 'bg-brand-primary text-white scale-110'
                                : currentStep === step.id
                                    ? 'bg-brand-secondary text-white scale-110 shadow-xl shadow-brand-secondary/20'
                                    : 'bg-white border-2 border-gray-100 text-brand-gray-500'
                            }`}
                    >
                        {currentStep > step.id ? <FaCheck /> : step.id}
                    </div>
                    <span className={`absolute -bottom-7 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors duration-500 ${currentStep === step.id ? 'text-brand-secondary' : 'text-brand-gray-500'
                        }`}>
                        {step.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default BookingSteps;
