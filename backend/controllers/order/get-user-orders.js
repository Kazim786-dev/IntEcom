import Order from '../../models/order.js';

const getAllUserOrders = async ({role, user, page, pageSize}) => {
  if (role !== 'customer') {
    return { status: 401, data: { error: 'Unauthorized' } };
  }

  try {
    if (!user) {
      return { status: 404, data: { error: 'User not found' } };
    }

    // Fetch orders sorted by 'createdAt' in descending order (most recent first)
    const orders = await Order.find({ user: user._id })
      .sort({ createdAt: -1 })  // Sorting by date, most recent first
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Count total number of orders for the user
    const totalCount = await Order.countDocuments({ user: user._id });
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      status: 200,
      data: {
        totalPages,
        data: orders
      }
    };

  } catch (error) {
    // Log or handle the error as needed
    throw new Error('An error occurred while fetching orders.');
  }
};

export default getAllUserOrders;
