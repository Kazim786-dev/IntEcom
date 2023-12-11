import fs from 'fs';

import cloudinary from '../../middleware/cloudinary.js';

import Product from '../../models/product';

import User from '../../models/user'; // Import the User model

const createProduct = async ({productData, imageFile, user}) => {
  if (user.role !== 'admin' && user.role !== 'seller' ) {
    return { status: 401, data: { error: 'Unauthorized' } };
  }

  const { name, description, price, quantity, size, color } = productData;

  try {
    if (quantity < 1) {
      return { status: 400, data: { error: "Quantity can't be less than 1." } };
    }

    let image = '';
    // Check if an image was uploaded
    if (imageFile) {
      const uniqueId = Date.now().toString(); // Generate a unique identifier
      const localFilePath = imageFile.path;
      const cloudPath = "products/" + localFilePath.replace(/\\/g, "/") + uniqueId;

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(localFilePath, { public_id: cloudPath });

      // Remove the temporary file
      fs.unlink(localFilePath, async (error) => {
        if (error) {
          console.log(error);
          throw new Error('Error in file');
        } else {
          // Retrieve the image URL from the Cloudinary response
          image = result.secure_url;

          // Fetch the user based on user._id and set it in the product
          const existingUser = await User.findById(user._id);
          if (!existingUser) {
            return { status: 404, data: { error: 'User not found' } };
          }

          const newProduct = new Product({
            name,
            description,
            price,
            quantity,
            image,
            user: existingUser._id, // set the user reference
            // Add other fields as necessary
          });

          const savedProduct = await newProduct.save();

          return { status: 201, data: savedProduct };
        }
      });

    } else {
      return { status: 400, data: 'Error: Image not provided' };
    }

    // Return a pending status, as the response will be handled asynchronously
    return { status: 202 };
  } catch (error) {
    console.log(error);
    throw new Error('An error occurred while creating the product.');
  }
};

export default createProduct