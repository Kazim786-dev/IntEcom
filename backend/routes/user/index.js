import { Router } from 'express';
import authMiddleware from '../../middleware/auth'

const router = Router();

//controller functions
import {
    getUserById,
    updateUser,
    verifyMail,
    updatePassword,
    getSellers,
    acceptSeller,
    rejectSeller
  } from '../../controllers/user/index.js';

// User routes
router.post('/verify-mail', async (req, res) => {
  const { email } = req.body;

  try {
    const result = await verifyMail({email:email});
    return res.status(result.status).json(result.message);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while verifying email.' });
  }
});

router.get('/sellers',authMiddleware, async (req, res) => {

  try {
      const page = parseInt(req.query.page) || 1;
      const size = parseInt(req.query.size) || 10;
      const result = await getSellers(page, size);
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Update Password
router.patch('/update-password', async (req, res) => {
  const { token, newPassword } = req.body;
  
  try {
    const result = await updatePassword({token: token, newPassword: newPassword});
    return res.status(result.status).json(result.message);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating password.' });
  }
});


// Accept Seller
router.patch('/sellers/accept/:id', authMiddleware, async (req, res) => {
  try {
      const sellerId = req.params.id;
      await acceptSeller(sellerId);
      res.status(200).json({ message: 'Seller accepted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Error accepting seller' });
  }
});

// Reject Seller
router.patch('/sellers/reject/:id', authMiddleware, async (req, res) => {
  try {
      const sellerId = req.params.id;
      await rejectSeller(sellerId);
      res.status(200).json({ message: 'Seller rejected successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Error rejecting seller' });
  }
});

// Get User by ID
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getUserById({id:id});
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
});

// Update User
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, email, password, mobile } = req.body;

  try {
    const result = await updateUser({id: id, userData: { name, email, password, mobile } });
    return res.status(result.status).json(result.message);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
});


export default router;