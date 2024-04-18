import Order from '../../models/order.js';
import Product from '../../models/product.js';

const getSellerSalesAnalytics = async (sellerId) => {
  try {
    // Find products that belong to the seller
    const sellerProducts = await Product.find({ user: sellerId }).select('_id');
    const productIds = sellerProducts.map(product => product._id.toString());

    // Find orders that contain products from the seller
    const orders = await Order.find({
      'products.product': { $in: productIds },
    });

    let totalOrders = 0;
    let totalUnits = 0;
    let totalCostEarned = 0;

    // Calculate total orders, total sale, total units sold, and total cost earned
    orders.forEach(order => {
      const filteredProducts = order.products.filter(p =>
        p.product && productIds.includes(p.product.toString())
      );

      totalOrders += 1;
      totalUnits += filteredProducts.reduce((sum, product) => sum + product.quantity, 0);

      // Calculate total cost earned based on sellingPrice
      totalCostEarned += filteredProducts.reduce((sum, product) => {
        const sellingPrice = product.sellingPrice || 0;
        return sum + sellingPrice * product.quantity;
      }, 0);
    });


    return {
      status: 200,
      data: {
        totalOrders,
        totalUnits,
        totalAmount: totalCostEarned.toFixed(2),
      },
    };
  } catch (error) {
    console.error('Error fetching seller sales analytics:', error);
    throw new Error('An error occurred while fetching sales analytics for the seller.');
  }
};

// const getSellerSalesAnalytics = async (sellerId) => {
//   try {
//     // Aggregate pipeline to find orders that contain products from the seller
//     const ordersAggregate = await Order.aggregate([
//       {
//         $match: {
//           'products.product': { $in: await Product.find({ user: sellerId }).distinct('_id') }
//         }
//       },
//       {
//         $project: {
//           totalAmount: 1,
//           totalUnits: { $sum: '$products.quantity' }
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           totalOrders: { $sum: 1 },
//           totalSale: { $sum: '$totalAmount' },
//           totalUnits: { $sum: '$totalUnits' }
//         }
//       }
//     ]);
//     console.log(ordersAggregate);
//     // Extracting results from aggregation
//     const { totalOrders, totalSale, totalUnits } = ordersAggregate[0] || {
//       totalOrders: 0,
//       totalSale: 0,
//       totalUnits: 0
//     };

//     // Calculate total cost earned based on totalSale
//     const totalCostEarned = totalSale;

//     return {
//       status: 200,
//       data: {
//         totalOrders,
//         totalUnits,
//         totalAmount: totalCostEarned.toFixed(2),
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching seller sales analytics:', error);
//     throw new Error('An error occurred while fetching sales analytics for the seller.');
//   }
// };

export default getSellerSalesAnalytics;
