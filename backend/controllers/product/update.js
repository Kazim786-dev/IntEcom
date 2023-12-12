import fs from 'fs';

import cloudinary from '../../middleware/cloudinary.js';

import Product from '../../models/product';
import Wishlist from '../../models/wishlist';
import User from '../../models/user';
import { sendEmail } from '../../mail/index.js';

const updateProduct = async ({id, productData, imageFile, user}) => {
  if (user.role !== 'admin' && user.role !== 'seller') {
    return { status: 401, data: { error: 'Unauthorized' } };
  }

  const { description, price, quantity } = productData;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return { status: 404, data: { error: 'Product not found.' } };
    }
    const oldQuant= product.quantity

    let image=''
        if(imageFile){
          const uniqueId = Date.now().toString(); // Generate a unique identifier (timestamp in this case)
          const localFilePath = imageFile.path
          const cloudPath = "products/" + localFilePath.replace(/\\/g, "/") + uniqueId;
          // Upload the image to Cloudinary
          const result = await cloudinary.uploader.upload(localFilePath, { public_id: cloudPath });
  
          // Remove the temporary file
          fs.unlink(localFilePath, async (error) => {
            if (error) {
              return { status: 400, data: 'Error deleting file' };
            }
            else{
              image = result.secure_url;
              product.image = image
              product.description = description || product.description;
              product.price = price || product.price;
              product.quantity = quantity || product.quantity;
              product.uid = product.uid
              const updatedProduct = await product.save();

              // If the updated quantity is 1 or more, notify users whose wishlist contains this product
              if (quantity >= 1 && oldQuant == 0) {
                const wishlists = await Wishlist.find({ products: product._id }).populate('user');
                const userEmails = wishlists.map(wishlist => wishlist.user.email);

                userEmails.forEach(async (email) => {
                  const emailContent = `<p>Your favorite product "${product.name}" is back in stock! Check it out now.</p>`;
                  await sendEmail(email, 'Product Back in Stock', emailContent);
                });
              }


              return { status: 200, data: updatedProduct };
            }
          })
        }
        else{
          product.description = description || product.description;
          product.price = price || product.price;
          product.quantity = quantity || product.quantity;
          product.uid = product.uid
  
          const updatedProduct = await product.save();

          // If the updated quantity is 1 or more, notify users whose wishlist contains this product
          if (quantity >= 1 && oldQuant ==0) {
            const wishlists = await Wishlist.find({ products: product._id }).populate('user');
            const userEmails = wishlists.map(wishlist => wishlist.user.email);

            userEmails.forEach(async (email) => {
              const emailContent = `<p>Your favorite product "${product.name}" is back in stock! Check it out now.</p>`;
              await sendEmail(email, 'Product Back in Stock', emailContent);
            });
          }


          return { status: 200, data: updatedProduct };
        }
        // Return a pending status, as the response will be handled asynchronously
      return { status: 202};

  } catch (error) {
    throw new Error('An error occurred while updating the product.');
  }
};

  export default updateProduct