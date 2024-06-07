import fs from 'fs';
import axios from 'axios';
import 'dotenv/config';
import cloudinary from '../../middleware/cloudinary.js';
import Product from '../../models/product';
import User from '../../models/user'; // Import the User model

// getting environment variable
const { Flask_URL } = process.env;

const createProduct = async ({ productData, imageFile, modelFile, user }) => {
  if (user.role !== 'admin' && user.role !== 'seller') {
    return { status: 401, data: { error: 'Unauthorized' } };
  }

  const { name, description, price, quantity, size, color, category } = productData;

  try {
    if (quantity < 1) {
      return { status: 400, data: { error: "Quantity can't be less than 1." } };
    }

    let image = '';
    let modelPath = '';
    const uniqueId = Date.now().toString(); // Generate a unique identifier

    // Check if an image was uploaded
    if (imageFile) {
      const localFilePath = imageFile.path;
      const cloudPath = "products/images/" + uniqueId;

      try {
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, { public_id: cloudPath });
        // Retrieve the image URL from the Cloudinary response
        image = result.secure_url;

        // Remove the temporary file
        fs.unlinkSync(localFilePath);
      } catch (error) {
        console.log('Error uploading image:', error);
        throw new Error('Invalid image file');
      }
    } else {
      return { status: 400, data: 'Error: Image not provided' };
    }

    // Check if a 3D model file was uploaded
    if (modelFile) {
      const localFilePath = modelFile.path;
      const cloudPath = "products/models/" + uniqueId;

      try {
        // Upload the 3D model to Cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
          public_id: cloudPath,
          resource_type: 'raw'
        });
        // Retrieve the model URL from the Cloudinary response
        modelPath = result.secure_url;

        // Remove the temporary file
        fs.unlinkSync(localFilePath);
      } catch (error) {
        console.log('Error uploading model:', error);
        throw new Error('Invalid model file');
      }
    }

    // Fetch the user based on user._id and set it in the product
    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return { status: 404, data: { error: 'User not found' } };
    }

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      originalPrice: price,
      quantity,
      image,
      modelPath: modelPath || null, // Set the modelPath, allow null
      user: existingUser._id, // set the user reference
      uid: uniqueId,
    });

    const savedProduct = await newProduct.save();

    // adding to vector Database
    axios.post(`${Flask_URL}/add`, savedProduct)
      .then(response => {
        // Handle response
      }).catch(e => {
        // Handle error
      });

    return { status: 201, data: savedProduct };
  } catch (error) {
    console.log(error);
    throw new Error('An error occurred while creating the product.');
  }
};

export default createProduct;
