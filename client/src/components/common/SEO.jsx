import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title ? `${title} | PRHolidays` : 'PRHolidays - Travel & Tours'}</title>
            <meta name="description" content={description || 'Discover your next adventure with PRHolidays. We offer curated travel packages, destination guides, and unforgettable experiences.'} />
            <meta name="keywords" content={keywords || 'travel, tours, holidays, vacation, trip, booking, packages, destinations'} />
        </Helmet>
    );
};

export default SEO;
