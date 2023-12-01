import Wishlist from '../../models/wishlist';

const getWishlist = async (user) => {
    try {

        // Authentication and Authorization checks here
        // For example, check if req.user.id === userId
        console.log(user._id);
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
