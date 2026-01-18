const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['image', 'video'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String // For videos
    },
    caption: {
        type: String
    },
    packageId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Package'
    },
    destinationId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Destination'
    },
    order: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Gallery', GallerySchema);
