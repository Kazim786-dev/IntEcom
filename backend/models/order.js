import { Schema, model } from 'mongoose';
import shortid from 'shortid'
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    required: true,
    default: () => shortid.generate(),
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required:true,
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }, 
    deliverStatus:{
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered'],
      default: 'Pending',
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['Paid', 'Unpaid', 'Refunded'], 
    default: 'Unpaid'
  },
  shippingDetails: {
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  }
  // You can add more fields like shipping address, payment details, etc. as per your requirements
},{
  timestamps:true
});

//create index for user
orderSchema.index({user:1})
// Create index for orderNumber field
orderSchema.index({ orderNumber: 1 });
// Create index for products.product field
orderSchema.index({ 'products.product': 1 });
// Create compound index for orderNumber and products.product fields
orderSchema.index({ orderNumber: 1, 'products.product': 1 });

const Order = model('Order', orderSchema);

export default Order;
