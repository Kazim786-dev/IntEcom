// controllers/discountController.js
import Product from '../../models/product.js'; // Import your Product model

const loadNotOnDiscount = async (req, res) => {
  const { prod, page = 1, size = 9 } = req.query;

  // Initialize the search query to handle cases when prod is undefined or an empty string
  var productToSearch = prod && prod !== 'undefined' ? prod : '';

  try {
    const findQuery = {
      isOnSale: false,
      ...(productToSearch && {
        $or: [
          { name: { $regex: productToSearch, $options: 'i' } },
          { description: { $regex: productToSearch, $options: 'i' } },
        ]
      })
    };

    const totalCount = await Product.countDocuments(findQuery);
    const totalPages = Math.ceil(totalCount / size);

    const products = await Product.find(findQuery)
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
  const { prod, page = 1, size = 9 } = req.query;

  // Initialize the search query to handle cases when prod is undefined or an empty string
  var productToSearch = prod && prod !== 'undefined' ? prod : '';

  try {
    const findQuery = {
      isOnSale: true,
      ...(productToSearch && {
        $or: [
          { name: { $regex: productToSearch, $options: 'i' } },
          { description: { $regex: productToSearch, $options: 'i' } },
        ]
      })
    };

    const totalCount = await Product.countDocuments(findQuery);
    const totalPages = Math.ceil(totalCount / size);

    const products = await Product.find(findQuery)
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
