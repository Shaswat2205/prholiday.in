const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a reviewer name']
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating between 1 and 5'],
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: [true, 'Please add review text']
    },
    image: {
        type: String
    },
    packageId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Package'
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

module.exports = mongoose.model('Testimonial', TestimonialSchema);
