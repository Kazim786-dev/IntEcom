import Order from '../../models/order';
import Product from '../../models/product';

const getSellerOrders = async (sellerId) => {
  try {
    // Find products that belong to the seller
    const sellerProducts = await Product.find({ user: sellerId }).select('_id');
    const productIds = sellerProducts.map(product => product._id.toString());

    // Find orders that contain any of the seller's products
    const orders = await Order.find({ 'products.product': { $in: productIds } })
                              .populate('user')
                              .populate({
                                path: 'products.product',
                                match: { user: sellerId }
                              });

    // Map through orders and reconstruct the products array
    const filteredOrders = orders.map(order => {
      const filteredProducts = order.products.filter(p => 
        p.product && productIds.includes(p.product._id.toString())
      );

      return {
        ...order.toObject(),
        products: filteredProducts // Replace with the filtered products
      };
    });
    return { status: 200, data: filteredOrders };
  } catch (error) {
    console.error('Error fetching seller orders:', error);
    throw new Error('An error occurred while fetching orders for the seller.');
  }
};

export default getSellerOrders;
