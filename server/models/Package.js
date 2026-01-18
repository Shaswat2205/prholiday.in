const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a package name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    destination: {
        type: mongoose.Schema.ObjectId,
        ref: 'Destination',
        required: false // Optional initially if destination not created yet
    },
    duration: {
        days: {
            type: Number,
            required: true
        },
        nights: {
            type: Number,
            required: true
        }
    },
    maxPax: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    images: [{
        type: String
    }],
    videos: [{
        type: String
    }],
    rating: {
        average: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    itinerary: [{
        type: String
    }],
    inclusions: [{
        type: String
    }],
    exclusions: [{
        type: String
    }],
    featured: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Package', PackageSchema);
