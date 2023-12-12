import { sendEmail } from '../../mail/index.js';

import User from '../../models/user';

const acceptSeller = async (sellerId) => {
    try {
        const seller = await User.findById(sellerId);
        if (!seller) {
            throw new Error('Seller not found');
        }
        seller.status = 'active'; // Update the status to 'active'
        // Compose the email content
        const emailContent = `<h1>Welcome <b>${seller.name}</b> to this amazing e-commerce platform.</h1><br/>
        <p>We are absolutely thrilled to inform you that your request has been approved by the admin<br/>
        Congratulations on successfully creating your account. <b>Happy Selling! 🎉</b><br/>
        <b>Note</b>: Do not share your password with anyone</p>`;
        await sendEmail(seller.email, 'Welcome to Our E-commerce Platform', emailContent);

        await seller.save();
        return { message: 'Seller accepted successfully' };
    } catch (error) {
        throw new Error('Failed to accept seller: ' + error.message);
    }
};

  export default acceptSeller
