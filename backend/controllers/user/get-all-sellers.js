

import User from '../../models/user';

const getSellers = async (page, size) => {
    try {
        // Fetching users with role 'seller' and status 'pending'
        const queryCondition = { role: 'seller', status: 'pending' };
        const sellers = await User.find(queryCondition)
                                  .skip((page - 1) * size)
                                  .limit(size);

        const total = await User.countDocuments(queryCondition);
        const totalPages = Math.ceil(total / size);

        return { sellers, totalPages };
    } catch (error) {
        throw new Error('Failed to fetch sellers');
    }
};

  export default getSellers