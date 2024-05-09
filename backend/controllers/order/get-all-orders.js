import Order from '../../models/order.js';
import User from '../../models/user.js';
import { subDays, subMonths, subYears } from 'date-fns';

const getAllOrders = async ({ role, searchQuery, page = 1, size = 10, duration = '' }) => {
  try {
    let filter = {};
    if (duration !== '') {
      filter.createdAt = { $gte: calculateStartDate(duration) };
    }
    console.log(filter.createdAt)
    if (searchQuery !== 'undefined') {
      const foundOrders = await searchOrders(searchQuery, page, size, filter);
      return { status: 200, data: foundOrders };
    } else {
      searchQuery = '';
      const totalCount = await Order.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / size);

      const orders = await Order.find(filter)
        .skip((page - 1) * size)
        .limit(size)
        .populate('user', '-password');

      return { status: 200, data: { totalPages, data: orders } };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const searchOrders = async (searchQuery, page, size, filter) => {
  try {
    const userSearchQuery = { name: { $regex: searchQuery, $options: 'i' } };
    const orderNumberSearchQuery = { orderNumber: { $regex: searchQuery, $options: 'i' } };

    const userMatches = await User.find(userSearchQuery);
    const userIds = userMatches.map((user) => user._id);

    const orders = await Order.find({
      $or: [{ user: { $in: userIds } }, orderNumberSearchQuery],
      ...filter,
    })
      .skip((page - 1) * size)
      .limit(size)
      .populate('user', '-password');

    const totalPages = Math.ceil(orders.length / size);

    return { data: orders, totalPages };
  } catch (error) {
    throw new Error('Error occurred while fetching orders.');
  }
};

const calculateStartDate = (duration) => {
  const now = new Date();
  switch (duration) {
    case '24h':
      return subDays(now, 1);
    case '7d':
      return subDays(now, 7);
    case '30d':
      return subMonths(now, 1);
    case '1y':
      return subYears(now, 1);
    case '':
      return now;
    default:
      return now;
  }
};

export default getAllOrders;
