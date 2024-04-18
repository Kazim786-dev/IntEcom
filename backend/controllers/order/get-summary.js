import Order from '../../models/order.js';

const getOrderSummary = async (duration = '1y') => {
  try {
    let startDate;
    const now = new Date();

    switch (duration) {
      case '24h':
        startDate = new Date(now.getTime() - (24 * 60 * 60 * 1000));
        break;
      case '7d':
        startDate = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
        break;
      case '30d':
        startDate = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        break;
      case '1y':
      default:
        startDate = new Date(now.getTime() - (365 * 24 * 60 * 60 * 1000));
        break;
    }

    // Calculate total amount of all orders since startDate
    const totalAmountResult = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$totalAmount' },
        },
      },
    ]);

    const totalAmount = totalAmountResult[0]?.totalAmount || 0;

    // Calculate total number of orders since startDate
    const totalOrdersResult = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    const totalOrders = totalOrdersResult[0]?.totalOrders || 0;

    // Calculate total units sold in orders since startDate
    const totalUnitsResult = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $unwind: '$products' },
      {
        $group: {
          _id: null,
          totalUnits: { $sum: 1 },
        },
      },
    ]);

    const totalUnits = totalUnitsResult[0]?.totalUnits || 0;

    return {
      status: 200,
      data: {
        totalAmount: totalAmount.toFixed(2),
        totalOrders,
        totalUnits,
      },
    };
  } catch (error) {
    console.error("Error fetching order summary:", error);
    throw new Error('An error occurred while fetching the order summary.');
  }
};

export default getOrderSummary;
