const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a destination name'],
        unique: true,
        trim: true
    },
    country: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
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

module.exports = mongoose.model('Destination', DestinationSchema);
