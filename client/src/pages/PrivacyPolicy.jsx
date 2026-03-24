import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';

const PrivacyPolicy = () => {
    return (
        <div className="pt-28 min-h-screen bg-brand-light pb-20">
            <SEO 
                title="Privacy Policy - PRHolidays"
                description="Our commitment to protecting your personal information and travel data."
            />
            
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-50"
                >
                    <header className="text-center mb-12">
                        <span className="text-brand-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Legal Center</span>
                        <h1 className="text-4xl md:text-5xl font-black text-brand-secondary mb-6">Privacy <span className="text-brand-primary">Policy</span></h1>
                        <p className="text-brand-gray-500 font-medium">Last Updated: March 2024</p>
                    </header>

                    <div className="prose prose-lg max-w-none text-brand-gray-500 font-medium leading-relaxed space-y-8">
                        <section>
                            <h2 className="text-2xl font-black text-brand-secondary mb-4 uppercase tracking-wider">1. Information We Collect</h2>
                            <p>At PRHolidays, we collect information that helps us provide you with the best travel experiences. This includes:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Personal details (name, email, phone number) when you book or contact us.</li>
                                <li>Payment information for processing your travel bookings securely.</li>
                                <li>Travel preferences and special requirements for curated trips.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-brand-secondary mb-4 uppercase tracking-wider">2. How We Use Your Data</h2>
                            <p>Your data is used strictly for:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Processing and confirming your travel reservations.</li>
                                <li>Communicating important trip updates and support info.</li>
                                <li>Improving our website and tailoring our travel offers.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-brand-secondary mb-4 uppercase tracking-wider">3. Data Security</h2>
                            <p>We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. Your peace of mind is our priority.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-brand-secondary mb-4 uppercase tracking-wider">4. Contact Us</h2>
                            <p>If you have any questions regarding this policy, please reach out via our contact page or email us at <a href="mailto:info@prholiday.in" className="text-brand-primary font-bold">info@prholiday.in</a>.</p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
