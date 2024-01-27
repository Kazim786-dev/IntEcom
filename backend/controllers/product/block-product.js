// Import the necessary models
import Product from '../../models/product.js';
import Report from '../../models/report.js';

const blockProduct = async (productId, user) => {
  if (user.role !== 'admin' && user.role !== 'seller') {
    return { status: 401, data: { error: 'Unauthorized' } };
  }

  try {
    // Update the product status to 'blocked'
    await Product.findByIdAndUpdate(productId, { status: 'blocked' });

    // Remove all reports related to this product
    await Report.deleteMany({ product: productId });

    return { status: 200, data: { message: 'Product blocked and reports removed successfully' } };
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while blocking the product and deleting reports.');
  }
};

export default blockProduct