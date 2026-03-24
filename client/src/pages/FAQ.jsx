import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import SEO from '../components/common/SEO';

const FAQItem = ({ question, answer, isOpen, toggle }) => (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden mb-4">
        <button
            onClick={toggle}
            className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-brand-light transition-colors group"
        >
            <span className="text-lg font-black text-brand-secondary group-hover:text-brand-primary transition-colors pr-6">{question}</span>
            <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                className="text-brand-primary shrink-0"
            >
                <FaChevronDown />
            </motion.div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <div className="px-8 pb-8 text-brand-gray-500 font-medium leading-relaxed">
                        {answer}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "How do I book a tour package?",
            answer: "You can book directly through our website by selecting your favorite package and clicking 'Inquiry' or 'Book Now'. Our travel experts will then reach out to finalize the details with you."
        },
        {
            question: "What items should I bring on my trip?",
            answer: "Each destination is unique! We send a detailed packing list 2 weeks before your departure based on the specific climate and activities of your curated journey."
        },
        {
            question: "Are your tours family-friendly?",
            answer: "Absolutely! We specialize in creating memories for all ages. Many of our packages are designed with families in mind, featuring kid-friendly activities and comfortable accommodations."
        },
        {
            question: "What is your refund policy?",
            answer: "Refunds depend on the cancellation timing relative to the departure date. Generally, full refunds are available up to 30 days before travel, while closer dates may incur fees from our partners (hotels, airlines)."
        },
        {
            question: "Do I need travel insurance?",
            answer: "We strongly recommend travel insurance for all our guests. It provides peace of mind for unexpected travel delays, medical emergencies, or cancellations."
        }
    ];

    return (
        <div className="pt-28 min-h-screen bg-brand-light pb-20">
            <SEO 
                title="FAQ - PRHolidays"
                description="Frequently asked questions about bookings, travel prep, and our services."
            />
            
            <div className="container mx-auto px-4 max-w-3xl">
                <header className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-brand-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block"
                    >
                        Questions?
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-brand-secondary mb-6"
                    >
                        How Can We <span className="text-brand-primary">Help?</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-brand-gray-500 font-medium max-w-xl mx-auto"
                    >
                        Everything you need to know about starting your next adventure with PRHolidays.
                    </motion.p>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            {...faq}
                            isOpen={openIndex === index}
                            toggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default FAQ;
