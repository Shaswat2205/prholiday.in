/**
 * Amazing Email Templates for PRHolidays
 */

const getAdminBookingTemplate = (booking) => {
    return `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #e1e5ea; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="background-color: #0b9185; padding: 25px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">New Booking Inquiry!</h1>
            </div>
            <div style="padding: 30px; background-color: #ffffff;">
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-top: 0;">Hello Admin,</p>
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">A new booking inquiry has just been submitted. Here are the details:</p>
                
                <div style="background-color: #f8fafc; border-left: 4px solid #0b9185; padding: 20px; border-radius: 4px; margin: 25px 0;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #718096; font-size: 14px; width: 40%;"><strong>Passenger Name:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748; font-size: 15px; font-weight: 500;">${booking.name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #718096; font-size: 14px;"><strong>Email:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748; font-size: 15px; font-weight: 500;">${booking.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #718096; font-size: 14px;"><strong>Phone:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748; font-size: 15px; font-weight: 500;">${booking.phone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #718096; font-size: 14px;"><strong>Package:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748; font-size: 15px; font-weight: 500;">${booking.packageName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #718096; font-size: 14px;"><strong>Travel Date:</strong></td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #2d3748; font-size: 15px; font-weight: 500;">${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'TBD'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #718096; font-size: 14px;"><strong>No. of Travelers:</strong></td>
                            <td style="padding: 8px 0; color: #2d3748; font-size: 15px; font-weight: 500;">${booking.travelers}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="text-align: center; margin-top: 35px; margin-bottom: 15px;">
                    <a href="http://localhost:5173/admin/bookings" style="background-color: #0b9185; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(11, 145, 133, 0.25);">Manage Booking in Dashboard</a>
                </div>
                <p style="text-align: center; color: #a0aec0; font-size: 13px; margin-top: 20px;">Please click the button above to review, confirm, or modify this booking inquiry.</p>
            </div>
        </div>
    `;
};

const getUserBookingTemplate = (booking) => {
    return `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #e1e5ea; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="background-color: #0b9185; padding: 30px; text-align: center; background-image: linear-gradient(135deg, #0b9185 0%, #086b62 100%);">
                <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 600; letter-spacing: 0.5px;">Booking Received!</h1>
                <p style="color: #e6fffc; margin-top: 10px; font-size: 16px;">We're thrilled to craft your next great adventure.</p>
            </div>
            <div style="padding: 35px; background-color: #ffffff;">
                <h3 style="color: #2d3748; font-size: 20px; font-weight: 600; margin-top: 0; text-transform: capitalize;">Hello ${booking.name},</h3>
                <p style="color: #4a5568; font-size: 16px; line-height: 1.7;">Thank you for choosing <strong>PRHoliday.in</strong>! We have successfully received your booking inquiry. Our travel experts are currently reviewing your request and will contact you shortly to finalize the details of your trip.</p>
                
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 30px 0;">
                    <h4 style="color: #0b9185; margin-top: 0; margin-bottom: 15px; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Your Trip Setup Overview</h4>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #718096; font-size: 15px; width: 45%;"><strong>Package:</strong></td>
                            <td style="padding: 8px 0; color: #2d3748; font-size: 15px; font-weight: 500;">${booking.packageName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #718096; font-size: 15px;"><strong>Travel Date:</strong></td>
                            <td style="padding: 8px 0; color: #2d3748; font-size: 15px; font-weight: 500;">${booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'To be discussed'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #718096; font-size: 15px;"><strong>Number of Travelers:</strong></td>
                            <td style="padding: 8px 0; color: #2d3748; font-size: 15px; font-weight: 500;">${booking.travelers}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="text-align: center; margin-top: 30px; margin-bottom: 10px;">
                    <a href="https://prholiday.in" style="background-color: #ffffff; color: #0b9185; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; border: 2px solid #0b9185; transition: all 0.3s ease;">Explore More Destinations</a>
                </div>
                
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
                
                <p style="color: #718096; font-size: 15px; line-height: 1.6; margin-bottom: 0;">If you have any immediate questions, feel free to reply directly to this email or contact us at <a href="mailto:info@prholiday.in" style="color: #0b9185; text-decoration: none;">info@prholiday.in</a>.</p>
                
                <p style="color: #2d3748; font-size: 16px; font-weight: 600; margin-top: 20px;">Best regards,<br><span style="color: #0b9185;">The PRHolidays Team</span></p>
            </div>
            <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #a0aec0; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} PRHoliday.in All rights reserved.</p>
            </div>
        </div>
    `;
};

const getStatusChangeTemplate = (booking) => {
    let headerColor = '#0b9185';
    let title = 'Booking Status Update';
    let subtitle = 'Your adventure status has changed.';
    let messageContent = '';
    let ctaTitle = 'Explore More Destinations';
    let ctaLink = 'https://prholiday.in';

    switch (booking.status) {
        case 'confirmed':
            headerColor = '#0b9185';
            title = 'Adventure Confirmed!';
            subtitle = 'Get ready to explore with PRHolidays.';
            messageContent = 'Great news! Your booking has been confirmed. Our team is now finalizing all the details for your upcoming trip.';
            break;
        case 'cancelled':
            headerColor = '#e53e3e';
            title = 'Booking Cancelled';
            subtitle = 'Your booking has been successfully cancelled.';
            messageContent = 'As per your request (or due to unforeseen circumstances), your booking has been cancelled. If a refund is applicable, it will be processed according to our policy.';
            ctaTitle = 'Browse Packages';
            break;
        case 'completed':
            headerColor = '#2d3748';
            title = 'Welcome Back!';
            subtitle = 'We hope you had an amazing journey.';
            messageContent = 'Thank you for traveling with PRHolidays! We hope your trip was everything you dreamed of. We would love to hear your feedback.';
            ctaTitle = 'Share Your Experience';
            ctaLink = 'https://prholiday.in/testimonials';
            break;
    }

    return `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #e1e5ea; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            <div style="background-color: ${headerColor}; padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 600;">${title}</h1>
                <p style="color: #ffffff; opacity: 0.9; margin-top: 10px; font-size: 16px;">${subtitle}</p>
            </div>
            <div style="padding: 35px; background-color: #ffffff;">
                <h3 style="color: #2d3748; font-size: 20px; font-weight: 600; margin-top: 0; text-transform: capitalize;">Hello ${booking.name},</h3>
                <p style="color: #4a5568; font-size: 16px; line-height: 1.7;">${messageContent}</p>
                
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 30px 0;">
                    <h4 style="color: ${headerColor}; margin-top: 0; margin-bottom: 15px; font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Booking Ref: #${booking._id.toString().slice(-6).toUpperCase()}</h4>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #718096; font-size: 15px; width: 45%;"><strong>Package:</strong></td>
                            <td style="padding: 8px 0; color: #2d3748; font-size: 15px; font-weight: 500;">${booking.packageName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #718096; font-size: 15px;"><strong>Status:</strong></td>
                            <td style="padding: 8px 0; color: ${headerColor}; font-size: 15px; font-weight: 700; text-transform: uppercase;">${booking.status}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="text-align: center; margin-top: 30px; margin-bottom: 10px;">
                    <a href="${ctaLink}" style="background-color: ${headerColor}; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">${ctaTitle}</a>
                </div>
                
                <p style="color: #718096; font-size: 14px; margin-top: 30px;">If you have any questions, feel free to contact us at <a href="mailto:info@prholiday.in" style="color: #0b9185; text-decoration: none;">info@prholiday.in</a>.</p>
                
                <p style="color: #2d3748; font-size: 16px; font-weight: 600; margin-top: 20px;">Best regards,<br><span style="color: #0b9185;">The PRHolidays Team</span></p>
            </div>
            <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="color: #a0aec0; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} PRHolidays. All rights reserved.</p>
            </div>
        </div>
    `;
};

module.exports = {
    getAdminBookingTemplate,
    getUserBookingTemplate,
    getStatusChangeTemplate
};
