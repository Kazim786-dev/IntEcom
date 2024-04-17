import Product from '../../models/product.js';

const getProductsBySeller = async ({query, userId}) => {
  try {
    const sortOrder = query.sort;
    if (sortOrder && sortOrder !== 'asc' && sortOrder !== 'desc') {
      return { status: 400, data: { error: 'Invalid sort order. Use "asc" or "desc".' } };
    }

    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.size) || 8;
    var productToSearch = query.searchQuery;
    if (productToSearch == 'undefined') {
      productToSearch=''
    }
    const sortField = 'price';
    const sortOptions = { [sortField]: sortOrder === 'desc' ? -1 : 1 };

    const findQuery = {
      isDeleted: false,
      user: userId,  // Filter by user ID
      ...(productToSearch && {
        $or: [
          { name: { $regex: productToSearch, $options: 'i' } },
          { description: { $regex: productToSearch, $options: 'i' } },
        ]
      })
    };

    const totalCount = await Product.countDocuments(findQuery);
    const totalPages = Math.ceil(totalCount / pageSize);

    const products = await Product.find(findQuery)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return { status: 200, data: { totalPages, data: products } };
  } catch (error) {
    console.error('Error while fetching products:', error);
    throw new Error('Internal server error.');
  }
};

export default getProductsBySeller;
