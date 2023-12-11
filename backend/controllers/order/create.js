import Order from '../../models/order';
import Product from '../../models/product';

// const createOrder = async (req, res) => {
//     const {role} = req.user.user
//     if(role!=='customer'){
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const { products, totalAmount, status } = req.body;
//     try {
//       const foundUser = req.user.user

//       if (!foundUser) {
//         res.status(404).json({ error: "user not found" })
//       }

//       if (products.length < 1) {
//         return res.status(400).json({ error: 'No products is added to order.' });
//       }

//       // Fetch the product details from the database
//       const productIds = products.map((product) => product.product);
//       const existingProducts = await Product.find({ _id: { $in: productIds } });
//       const productMap = new Map(existingProducts.map((product) => [product._id.toString(), product]));

//       // Check for quantity validation
//       for (const p of products) {
//         const product = productMap.get(p.product);
//         if (!product) {
//           return res.status(400).json({ error: `Product with ID ${p.product} does not exist.` });
//         }
//         else if (p.quantity < 1 || p.quantity > product.quantity) {
//           return res.status(400).json({
//             error: `Invalid quantity for product with ID ${p.product}. Quantity should be between 1 and ${product.quantity}.`,
//           });
//         }
//       }

//       const newOrder = new Order({
//         user: foundUser._id,
//         products,
//         totalAmount,
//         status
//       });

//        // Update product quantities after saving the order
//        for (const p of products) {
//         const product = productMap.get(p.product);
//         const updatedQuantity = product.quantity - p.quantity;
//         await Product.updateOne({ _id: product._id }, { quantity: updatedQuantity });
//       }


//       const savedOrder = await newOrder.save();
//       res.status(201).json(savedOrder);
//     } catch (error) {
//       res.status(500).json({ error: 'An error occurred while creating the order. '+ error });
//     }
//   };
const createOrder = async ({ user, body }) => {
  try {
    const { products, totalAmount, shippingDetails, paymentStatus } = body;

    if (user.role !== 'customer') {
      return { status: 401, data: { error: 'Unauthorized' } };
    }

    if (products.length < 1) {
      return { status: 400, data: { error: 'No products are added to the order.' } };
    }

    // Fetch the product details from the database
    const productIds = products.map((p) => p.product);
    const existingProducts = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(existingProducts.map((product) => [product._id.toString(), product]));

    // Prepare products with deliveryStatus for the order
    const orderProducts = products.map((p) => {
      const product = productMap.get(p.product);
      if (!product) {
        throw new Error(`Product with ID ${p.product} does not exist.`);
      }
      if (p.quantity < 1 || p.quantity > product.quantity) {
        throw new Error(`Invalid quantity for product with ID ${p.product}.`);
      }

      return { 
        product: p.product, 
        quantity: p.quantity, 
        deliveryStatus: 'Pending'  // Add the deliveryStatus here
      };
    });

    const newOrder = new Order({
      user: user._id,
      products: orderProducts,
      totalAmount,
      shippingDetails,
      paymentStatus
    });

    // Update product quantities after saving the order
    orderProducts.forEach(async (p) => {
      const product = productMap.get(p.product);
      const updatedQuantity = product.quantity - p.quantity;
      await Product.updateOne({ _id: product._id }, { quantity: updatedQuantity });
    });

    const savedOrder = await newOrder.save();
    return { status: 201, data: savedOrder };

  } catch (error) {
    console.error('Error while creating order:', error);
    return { status: 500, data: { error: 'An error occurred while creating the order.' } };
  }
};

export default createOrder;

