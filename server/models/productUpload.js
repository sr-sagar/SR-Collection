const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductUploadSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    availbility: {
        type: Boolean,
        required: true,
    },
    fileURL: {
        type: [String],
        required: true,
    },
    uploadTime: {
        type: Date,
        required: true,
    }
},{timestamps: true})

const ProductUploadModel = mongoose.model('Products', ProductUploadSchema);

module.exports = ProductUploadModel;