import Product from '../../models/product.js'; // Import your Product model


const UserloadNotOnDiscount = async (prod, page, size, userId) => {
  try {
      // Check if prod is not undefined and not an empty string
      var productToSearch = prod !== 'undefined' ? prod : '';

      const findQuery = {
          isOnSale: false,
          user: userId, // Filter by user ID
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
      return { status: 200, data: response };
  } catch (error) {
      console.error('Error fetching products not on discount:', error);
      return { status: 500, error: 'Internal Server Error' };
  }
};
  

  const UserapplyDiscount = async (productIds, offPercent, flag, userId) => {
    try {
        let filter = { _id: { $in: productIds }, user: userId };
        if (flag) {
            filter = { user: userId };
        }

        // Use the aggregation pipeline in the updateMany function to calculate the new price
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
        
        return { status: 200, data: "successful" };
    } catch (error) {
        console.error('Error applying discount:', error);
        // Assuming you are in an async function outside of express route handler. If not, replace with appropriate error handling.
        throw new Error('Internal Server Error');
    }
};




  const UserloadOnDiscount = async (prod, page, size, userId) => {

    try {
      // Check if prod is not undefined and not an empty string
      var productToSearch = prod !== 'undefined' ? prod : '';

      const findQuery = {
          isOnSale: true,
          user: userId, // Filter by user ID
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
      return { status: 200, data: response };
  } catch (error) {
      console.error('Error fetching products not on discount:', error);
      return { status: 500, error: 'Internal Server Error' };
  }
  };




  const UserendDiscount = async (productIds, offPercent, flag, userId) => {
    try {
        let filter = { _id: { $in: productIds }, user: userId };
        if (flag) {
            filter = { user: userId };
        }

        // Use the aggregation pipeline in the updateMany function to calculate the new price
        await Product.updateMany(filter, [
            {
                $set: {
                    isOnSale: false,
                    offPercent: offPercent,
                    price: "$originalPrice"
                }
            }
        ]);
        
        return { status: 200, data: "successful" };
    } catch (error) {
        console.error('Error applying discount:', error);
        // Assuming you are in an async function outside of express route handler. If not, replace with appropriate error handling.
        throw new Error('Internal Server Error');
    }
};
  
  module.exports = { UserloadNotOnDiscount, UserapplyDiscount, UserloadOnDiscount, UserendDiscount };
