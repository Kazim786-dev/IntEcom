
import User from '../../models/user';

const acceptSeller = async (sellerId) => {
    try {
        const seller = await User.findById(sellerId);
        if (!seller) {
            throw new Error('Seller not found');
        }
        seller.status = 'active'; // Update the status to 'active'
        await seller.save();
        return { message: 'Seller accepted successfully' };
    } catch (error) {
        throw new Error('Failed to accept seller: ' + error.message);
    }
};

  export default acceptSeller
