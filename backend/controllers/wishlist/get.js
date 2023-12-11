import Wishlist from '../../models/wishlist';

const getWishlist = async (user) => {
    try {


        const wishlist = await Wishlist.findOne({ user: user._id }).populate('products');
        if (!wishlist) {
            throw new Error('wishlist could not found.');
        }
        return {
            wishlist: wishlist.products
        }
    } catch (error) {
        throw new Error('internal server error');
    }
};

export default getWishlist;
