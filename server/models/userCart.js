const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
    },
    productTitle: {
      type: String,
      required: true,      
    },
    productPrice: {
      type: Number,
      required: true,      
    },
    productImageURL: {
      type: [String],
      required: true,      
    } , 
    productQuantity: {
      type: Number,
      required: true,
    }

},{timestamps: true})

const userCartModel = mongoose.model('userCart', userCartSchema);

module.exports = userCartModel;