import Wishlist from '../../models/wishlist';

const addProduct = async (user, productId) => {
    if (user.role !== 'customer') {
        throw new Error('Unauthorized');
    }

    try {
        
        // Find the wishlist of the user or create a new one if it doesn't exist
        let wishlist = await Wishlist.findOne({ user: user._id });
        if (!wishlist) {
            wishlist = new Wishlist({ user: user._id, products: [] });
            await wishlist.save();
        }
        // Check if the product is already in the wishlist, if not, add it
        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
            return { added: true };
        }
        else{
            return { added: false };
        }
    } catch (error) {
        console.log(error)
        throw new Error('An error occurred while fetching orders.');
      }
}

export default addProduct;
