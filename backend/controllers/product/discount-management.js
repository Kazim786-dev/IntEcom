// controllers/discountController.js
import Product from '../../models/product.js'; // Import your Product model

const loadNotOnDiscount = async (req, res) => {
  const { page = 1, size = 9 } = req.query;
  try {
    const totalCount = await Product.countDocuments({ isOnSale: false });
    const totalPages = Math.ceil(totalCount / size);

    const products = await Product.find({ isOnSale: false })
      .skip((page - 1) * size)
      .limit(size);

    const response = {
      totalPages,
      data: products,
    };
    return {status: 200, data: response}
  } catch (error) {
    console.error('Error fetching products not on discount:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return; // Added this line to prevent further execution
  }
};


const applyDiscount = async (productIds, offPercent) => {
  

  try {
    // Validate input here if necessary

    // Update the products to apply the discount
    await Product.updateMany(
      { _id: { $in: productIds } },
      { isOnSale: true, offPercent }
    );

    return {status: 200, data: "updated successfully"}
  } catch (error) {
    console.error('Error applying discount:', error);
  }
};




const loadOnDiscount = async (req, res) => {
  const { page = 1, size = 9 } = req.query;
  try {
    const totalCount = await Product.countDocuments({ isOnSale: true });
    const totalPages = Math.ceil(totalCount / size);

    const products = await Product.find({ isOnSale: true })
      .skip((page - 1) * size)
      .limit(size);

    const response = {
      totalPages,
      data: products,
    };
    return {status: 200, data: response}
  } catch (error) {
    console.error('Error fetching products not on discount:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return; // Added this line to prevent further execution
  }
};



const endDiscount = async (productIds, offPercent) => {
  

  try {
    // Validate input here if necessary

    // Update the products to apply the discount
    await Product.updateMany(
      { _id: { $in: productIds } },
      { isOnSale: false, offPercent }
    );

    return {status: 200, data: "updated successfully"}
  } catch (error) {
    console.error('Error applying discount:', error);
  }
};


module.exports = { loadNotOnDiscount, applyDiscount, loadOnDiscount, endDiscount };
