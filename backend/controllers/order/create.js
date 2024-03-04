import Order from '../../models/order.js';
import Product from '../../models/product.js';

const createOrder = async ({ user, body }) => {
  try {
    const { products, totalAmount, shippingDetails, paymentStatus } = body;

    if (user.role !== 'customer') {
      return { status: 401, data: { error: 'Unauthorized' } };
    }

    if (products.length < 1) {
      return { status: 400, data: { error: 'No products are added to the order.' } };
    }

    // Fetch the product details from the database
    const productIds = products.map((p) => p.product);
    const existingProducts = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(existingProducts.map((product) => [product._id.toString(), product]));

    // Prepare products with deliveryStatus for the order
    const orderProducts = products.map((p) => {
      const product = productMap.get(p.product);
      if (!product) {
        throw new Error(`Product with ID ${p.product} does not exist.`);
      }
      if (p.quantity < 1 || p.quantity > product.quantity) {
        throw new Error(`Invalid quantity for product with ID ${p.product}.`);
      }

      return {
        product: p.product,
        quantity: p.quantity,
        sellingPrice: product.price, // Set sellingPrice equal to the current price of the product
        deliveryStatus: 'Pending'
      };
    });

    const newOrder = new Order({
      user: user._id,
      products: orderProducts,
      totalAmount,
      shippingDetails,
      paymentStatus
    });

    // Update product quantities after saving the order
    orderProducts.forEach(async (p) => {
      const product = productMap.get(p.product);
      const updatedQuantity = product.quantity - p.quantity;
      await Product.updateOne({ _id: product._id }, { quantity: updatedQuantity });
    });

    const savedOrder = await newOrder.save();
    return { status: 201, data: savedOrder };

  } catch (error) {
    console.error('Error while creating order:', error);
    return { status: 500, data: { error: 'An error occurred while creating the order.' } };
  }
};

export default createOrder;
