import Product from '../../models/product.js'; // Import your Product model


const UserloadNotOnDiscount = async (page, size, userId) => {
    
    try {
      const totalCount = await Product.countDocuments({ isOnSale: false, user: userId });
      const totalPages = Math.ceil(totalCount / size);
  
      const products = await Product.find({ isOnSale: false, user: userId })
        .skip((page - 1) * size)
        .limit(size);
  
      const response = {
        totalPages,
        data: products,
      };
      return { status: 200, data: response };
    } catch (error) {
      console.error('Error fetching products not on discount:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


  const UserapplyDiscount = async (productIds, offPercent, flag, userId) => {
    
    try {
      let filter = { _id: { $in: productIds }, user: userId };
      if (flag) {
        filter = { user: userId };
      }
  
      await Product.updateMany(filter, { $set: { isOnSale: true, offPercent } });
      
      return { status: 200, data: "successful" };
        } catch (error) {
      console.error('Error applying discount:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  



  const UserloadOnDiscount = async (page, size, userId) => {

    try {
      const totalCount = await Product.countDocuments({ isOnSale: true, user: userId });
      const totalPages = Math.ceil(totalCount / size);
  
      const products = await Product.find({ isOnSale: true, user: userId })
        .skip((page - 1) * size)
        .limit(size);
  
      const response = {
        totalPages,
        data: products,
      };
      return { status: 200, data: response };
    } catch (error) {
      console.error('Error fetching on discount products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  const UserendDiscount = async (productIds, offPercent, flag, userId) => {

    try {
      let filter = { _id: { $in: productIds }, user: userId };
      if (flag) {
        filter = { user: userId };
      }
  
      await Product.updateMany(filter, { $set: { isOnSale: false, offPercent } }); 
      return { status: 200, data: "successful" };
    } catch (error) {
      console.error('Error ending discount:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = { UserloadNotOnDiscount, UserapplyDiscount, UserloadOnDiscount, UserendDiscount };
