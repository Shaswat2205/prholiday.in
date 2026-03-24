import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';

const TermsOfService = () => {
    return (
        <div className="pt-28 min-h-screen bg-brand-light pb-20">
            <SEO 
                title="Terms of Service - PRHolidays"
                description="Terms and conditions for booking and traveling with PRHolidays."
            />
            
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-50"
                >
                    <header className="text-center mb-12">
                        <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Agreement</span>
                        <h1 className="text-4xl md:text-5xl font-black text-brand-secondary mb-6">Terms of <span className="text-brand-primary">Service</span></h1>
                        <p className="text-brand-gray-500 font-medium">Agreement for smooth travels.</p>
                    </header>

                    <div className="prose prose-lg max-w-none text-brand-gray-500 font-medium leading-relaxed space-y-8">
                        <section>
                            <h2 className="text-2xl font-black text-brand-secondary mb-4 uppercase tracking-wider">1. Acceptance of Terms</h2>
                            <p>By accesssing this website or booking a tour with PRHolidays, you agree to be bound by these terms and conditions. If you do not agree, please do not use our services.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-brand-secondary mb-4 uppercase tracking-wider">2. Booking & Payments</h2>
                            <p>All bookings are subject to availability. A deposit or full payment may be required at the time of booking. Prices are subject to change until confirmed.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-brand-secondary mb-4 uppercase tracking-wider">3. Cancellation Policy</h2>
                            <p>Cancellations are subject to specific fees depending on the time of cancellation. Please review your specific package details for refund eligibility.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-brand-secondary mb-4 uppercase tracking-wider">4. Limitation of Liability</h2>
                            <p>PRHolidays acts as an agent for transportation and accommodation providers and shall not be liable for any injury, damage, or loss resulting from their services.</p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;
