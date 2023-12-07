import Product from '../../models/product'; // Import your Product model
import Report from '../../models/report'; // Import your Report model

const reportProduct = async (reportData, user) => {
  try {
    const { productId, reportText } = reportData;

    // Create a new report instance
    const newReport = new Report({
      product: productId,
      user: user.user._id, // Assuming the user's ID is available in the request
      text: reportText
    });

    // Save the report to the database
    await newReport.save();

    // Update the product's status to "Reported"
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { status: 'Reported' },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      throw new Error('Product not found.');
    }

    return { status: 200, data: { message: 'Product reported successfully' } };
  } catch (error) {
    throw new Error('An error occurred while reporting the product.');
  }
};

export default reportProduct;
