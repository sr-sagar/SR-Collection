const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOrderItemsSchema = new Schema({
    
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
    productDescription: {
      type: String,
      required: true,      
    },
    productAvailability: {
      type: Boolean,
      required: true,      
    },
    productImageURL: {
      type: [String],
      required: true,      
    },
    productQuantity: {
      type: String,
      required: true,
    }

})

const userOrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  userName: {
    type: String,
    ref: 'user',
    required: true,
  },
  userPhoneNumber: {
    type: String,
    ref: 'user',
    required: true,
  },
  products: [userOrderItemsSchema],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "delivered", "cancelled", "shipped"],
  },
  orderDeliveryDate: {
    type: String,
  },
  orderNumber: {
    type: String,
  },
  totalAmount: {
    type: String,
    required: true,
  }
},{timestamps: true})

const userOrderModel = mongoose.model('userOrder', userOrderSchema);

module.exports = userOrderModel;