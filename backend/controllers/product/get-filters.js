import Product from '../../models/product.js';

const getUniqueCategories = async () => {
  try {
    // Use the distinct method to find unique values of the category field
    const uniqueCategories = await Product.distinct('catagory');

    // Check if we found any unique categories
    if (uniqueCategories.length > 0) {
      return { status: 200, data: uniqueCategories };
    } else {
      return { status: 404, data: { error: 'No categories found.' } };
    }
  } catch (error) {
    throw new Error('An error occurred while fetching unique categories.');
  }
};

export default getUniqueCategories;
