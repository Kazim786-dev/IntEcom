

import Product from '../../models/product.js';
import axios from 'axios';

const deleteProduct = async ({id, user}) => {
  if (user.role !== 'admin' && user.role !== 'seller') {
    return { status: 401, message: 'Unauthorized' };
  }

  try {
    const {Flask_URL}= process.env
    const product = await Product.findById(id);
    if (product) {
      product.isDeleted = true;
      await product.save();
      await axios.delete(`${Flask_URL}/delete/${product.uid}`);
      return { status: 200, message: 'Product deleted successfully.' };
    } else {
      return { status: 404, message: 'Product not found.' };
    }
  } catch (error) {
    throw new Error('An error occurred while deleting the product.');
  }
};

  export default deleteProduct