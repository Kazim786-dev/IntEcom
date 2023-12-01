import { Router } from 'express';
import {
    addProduct,
    getWishlist 
} from '../../controllers/wishlist/index.js';


const router = Router();




router.post('/add', async (req, res) => {
    const {  productId } = req.body;
    try {
        const result = await addProduct(req.user.user, productId);
        if (result.added) {
            res.status(200).json({ message: 'Product successfully added to wishlist' });
        } else {
            res.status(200).json({ message: 'Product already in wishlist' });
        }
    } catch (error) {
        if (error.message === 'Unauthorized') {
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});


router.get('/get', async (req, res) => {
    try {
        const result = await getWishlist(req.user.user);

            res.status(200).json(result.wishlist);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
});





export default router;
