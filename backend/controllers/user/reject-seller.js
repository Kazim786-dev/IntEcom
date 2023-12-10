
import User from '../../models/user';
const rejectSeller = async (sellerId) => {
    try {
        const seller = await User.findById(sellerId);
        if (!seller) {
            throw new Error('Seller not found');
        }
        seller.status = 'denied'; // Update the status to 'denied'
        await seller.save();
        return { message: 'Seller rejected successfully' };
    } catch (error) {
        throw new Error('Failed to reject seller: ' + error.message);
    }
};

export default rejectSeller
