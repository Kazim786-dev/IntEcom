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


const applyDiscount = async (productIds, offPercent, flag) => {
  
  try {
    // Validate input here if necessary
    // Construct the filter based on the flag
    let filter = { _id: { $in: productIds } };
    if (flag) {
      // If flag is true, update all products
      filter = {};
    }

    // Update the products to end the discount
    await Product.updateMany(filter, [
      {
          $set: {
              isOnSale: true,
              offPercent: offPercent,
              price: {
                  $subtract: [
                      "$originalPrice",
                      { $multiply: ["$originalPrice", offPercent / 100] }
                  ]
              }
          }
      }
  ]);

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



const endDiscount = async (productIds, offPercent, flag) => {
  try {
    // Validate input here if necessary

    // Construct the filter based on the flag
    let filter = { _id: { $in: productIds } };
    if (flag) {
      // If flag is true, update all products
      filter = {};
    }

    // Update the products to end the discount
    await Product.updateMany(filter, [
      {
          $set: {
              isOnSale: false,
              offPercent: offPercent,
              price: "$originalPrice"
          }
      }
  ]);

    return { status: 200, data: "updated successfully" };
  } catch (error) {
    console.error('Error ending discount:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};



module.exports = { loadNotOnDiscount, applyDiscount, loadOnDiscount, endDiscount };
