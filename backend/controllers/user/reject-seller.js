import { sendEmail } from '../../mail/index.js';
import User from '../../models/user';
const rejectSeller = async (sellerId) => {
    try {
        const seller = await User.findById(sellerId);
        if (!seller) {
            throw new Error('Seller not found');
        }
        seller.status = 'denied'; // Update the status to 'denied'
        const emailContent = `<h1>Dear <b>${seller.name}</b> we have an update on Your Seller Request!</h1><br/>
        <p>we regret to inform you that your request to become a seller on our platform has been declined by the admin.<br/>
        Sorry for your request disapproval.<br/>
        <b>Comments</b>: Better luck for the next time!</p>`;
        await sendEmail(seller.email, 'Upadte on Seller Account Request', emailContent);
        await seller.save();
        return { message: 'Seller rejected successfully' };
    } catch (error) {
        throw new Error('Failed to reject seller: ' + error.message);
    }
};

export default rejectSeller
