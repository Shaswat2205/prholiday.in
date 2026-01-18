const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name']
    },
    email: {
        type: String,
        required: [true, 'Please add your email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please add your phone number']
    },
    packageId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Package'
    },
    packageName: {
        type: String // Snapshot of package name
    },
    travelers: {
        type: Number,
        default: 1
    },
    checkIn: {
        type: Date
    },
    checkOut: {
        type: Date
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);
