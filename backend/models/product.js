import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    // required: true,
    // unique:true
  },
  description: {
    type: String,
    required: true
  },
  catagory: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true,
    default: 'Black'
  },
  status: {
    type: String,
    required: true,
    default: 'Active'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'All'],
    // required:true,
    default: 'L'
  },
  uid: {
    type: String,
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  offPercent: {
    type: Number,
    default: 0
  },
  originalPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

//indexes
productSchema.index({ isDeleted: 1, status: 1, uid: 1 }); // Create index on the relevant fields
productSchema.index({ isDeleted: 1, user: 1 }); // Index for isDeleted and user
productSchema.index({ user: 1 }); // Index for user
productSchema.index({ isDeleted: 1, status: 1 }); // Index for isDeleted and status
productSchema.index({ name: 'text', description: 'text' }); // Text index for name and description
productSchema.index({ uid: 1 }); // Index for uid

const Product = model('Product', productSchema);

export default Product;
