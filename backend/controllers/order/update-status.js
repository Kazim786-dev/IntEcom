import Order from '../../models/order';
import Product from '../../models/product';

const updateOrderDeliveryStatusForSeller = async (orderId, sellerId, newStatus) => {
  try {
    // Find products that belong to the seller
    const sellerProducts = await Product.find({ user: sellerId }).select('_id');
    const sellerProductIds = sellerProducts.map(product => product._id.toString());
    
    // Find the specific order
    const order = await Order.findById(orderId);
    if (!order) {
      return { status: 404, data: { error: 'Order not found' } };
    }
    // Flag to check if any product was updated
    let isAnyProductUpdated = false;

    // Update the delivery status for seller's products in the order
    order.products.forEach(product => {
      if (sellerProductIds.includes(product.product.toString())) {
        product.deliverStatus = newStatus;
        isAnyProductUpdated = true;
      }
    });

    if (!isAnyProductUpdated) {
      return { status: 404, data: { error: 'No products from this seller in the order' } };
    }

    // Save the updated order
    await order.save();
    
    return { status: 200, data: { message: 'Order status updated successfully' } };
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('An error occurred while updating the order status.');
  }
};

export default updateOrderDeliveryStatusForSeller;
