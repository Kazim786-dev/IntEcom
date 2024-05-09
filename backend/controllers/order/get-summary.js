
import Order from '../../models/order.js';
import { subDays, subYears } from 'date-fns';

const getOrderSummary = async (duration = '') => {
  try {
    let startDate;
    const now = new Date();

    switch (duration) {
      case '':
        startDate = now;
        break;
      case '24h':
        startDate = subDays(now, 1);
        break;
      case '7d':
        startDate = subDays(now, 7);
        break;
      case '30d':
        startDate = subDays(now, 30);
        break;
      case '1y':
        startDate = subYears(now, 1)
        break
      default:
        startDate = now;
        break;
    }

    const matchStage = { $match: { createdAt: { $gte: startDate } } };

    // Aggregate all statistics in one pipeline
    const summary = await Order.aggregate([
      matchStage,
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
          totalUnits: { $sum: { $size: '$products' } },
        },
      },
    ]);

    // Extract the summary data
    const { totalAmount = 0, totalOrders = 0, totalUnits = 0 } = summary[0] || {};

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
