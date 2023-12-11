// Import your Wishlist model
import Wishlist from '../../models/wishlist';

const removeProductFromWishlist = async (user, productId) => {
    try {
        const wishlist = await Wishlist.findOne({ user: user._id });
        if (!wishlist) {
            throw new Error('Wishlist not found.');
        }
        wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
        await wishlist.save();
    } catch (error) {
        throw new Error('Internal server error');
    }
};

export default removeProductFromWishlist;
