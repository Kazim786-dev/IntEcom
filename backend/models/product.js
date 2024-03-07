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
    required: true,
    default: "Electronics"
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

const Product = model('Product', productSchema);

export default Product;
