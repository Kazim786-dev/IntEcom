import Order from '../../models/order.js';
import Product from '../../models/product.js';

const getSellerOrders = async (sellerId, orderNumber) => {
  try {
    // Find products that belong to the seller
    const sellerProducts = await Product.find({ user: sellerId });
    const productIds = sellerProducts.map(product => product._id.toString());

    const pageSize = 9;

    const findOrderQuery = {
      ...(orderNumber && {
        orderNumber: { $regex: orderNumber, $options: 'i' }
      }),
      'products.product': { $in: productIds }
    };

    const orders = await Order.find(findOrderQuery)
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

    // Extract unique product _id overall
    const uniqueProductIds = [...new Set(filteredOrders.flatMap(order => order.products.map(p => p.product._id.toString())))];

    // Calculate overall quantity sold and total cost for each unique product
    const productQuantities = uniqueProductIds.map(productId => {
      const productDetails = sellerProducts.find(product => product._id.toString() === productId);
      const productName = productDetails ? productDetails.name : 'Unknown Product';
      
      const productSalesData = filteredOrders.reduce((salesData, order) => {
        const product = order.products.find(p => p.product._id.toString() === productId);
        if (product) {
          const quantitySold = product.quantity;
          const sellingPrice = product.sellingPrice || 0; // Consider 0 if sellingPrice is not available
          salesData.totalQuantitySold += quantitySold;
          salesData.totalCost += quantitySold * sellingPrice;
        }
        return salesData;
      }, { totalQuantitySold: 0, totalCost: 0 });

      return {
        _id: productId,
        name: productName,
        totalQuantitySold: productSalesData.totalQuantitySold,
        totalCost: productSalesData.totalCost
      };
    });
    const totalCount = productQuantities.length
    let totalPages = Math.ceil( totalCount / pageSize);
    return { status: 200, data: productQuantities, totalPages:totalPages};
  } catch (error) {
    console.error('Error fetching seller orders:', error);
    throw new Error('An error occurred while fetching orders for the seller.');
  }
};

export default getSellerOrders;
