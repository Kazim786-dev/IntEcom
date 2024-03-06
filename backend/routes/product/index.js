import { Router, response } from 'express';
import upload from '../../middleware/multer.js';
import VerifyRole from '../../middleware/role-verification.js';
import reportProduct from '../../controllers/product/report-product.js';
import multer from 'multer';
import { checkUserReports } from '../../controllers/product/is-reported_by_user.js';
const updateupload = multer()

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getReportedProducts,
  getProductsBySeller,
  blockProduct,
  cancelReport,
  loadNotOnDiscount,
  applyDiscount,
  loadOnDiscount,
  endDiscount,
  UserloadNotOnDiscount, 
  UserapplyDiscount, 
  UserloadOnDiscount, 
  UserendDiscount,
  getUniqueCategories
} from '../../controllers/product/index.js';


import authMiddleware from '../../middleware/auth.js'

const router = Router();

// Get Products by seller
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.user._id;  // Get the user ID from req.user
    const result = await getProductsBySeller({ query: req.query, userId: userId });
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

router.patch('/block/:productId', authMiddleware, async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await blockProduct(productId, req.user.user);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while blocking the product.' });
  }
});

router.delete('/cancel-report/:reportId', authMiddleware, async (req, res) => {
  const { reportId } = req.params;
  try {
    const result = await cancelReport(reportId, req.user.user);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while cancelling the report.' });
  }
});



router.get('/all-reports', authMiddleware, async (req, res) => {
  try {
    const result = await getReportedProducts(req.user.user);
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching reported products.' });
  }
});
// POST request to report a product
router.post('/report', authMiddleware, async (req, res) => {
  try {
    const result = await reportProduct(req.body, req.user); // Pass the request body and user info
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while reporting the product.' });
  }
});

// Get user-specific reports for a product
router.get('/reports/:productId', authMiddleware, async (req, res) => {
  try {
      const userId = req.user.user._id; // Assuming the user's ID is stored in req.user
      const productId = req.params.productId;
      const result = await checkUserReports(userId, productId);
      
      res.status(result.status).json(result.data);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching reports.' });
  }
});
// Get all Products
router.get('/allproducts', async (req, res) => {
  try {
    const result = await getProducts({query: req.query});
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get all Products filters
router.get('/all-filters', async (req, res) => {
  try {
    const result = await getUniqueCategories();
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get all Products not on sale
router.get('/not-on-discount', async (req, res) => {
  try {
    const result = await loadNotOnDiscount({query: req.query});
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});


// put Products on sale
router.post('/put-on-sale', async (req, res) => {
  const { productIds, offPercent, flag } = req.body;
  try {
    const result = await applyDiscount(productIds, offPercent, flag);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});


// Get all Products on sale
router.get('/on-discount', async (req, res) => {
  try {
    const result = await loadOnDiscount({query: req.query});
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// end sale
router.post('/end-sale', async (req, res) => {
  const { productIds, flag } = req.body;
  try {
    const offPercent = 0;
    const result = await endDiscount(productIds, offPercent, flag);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});








// Get all Products not on sale
router.get('/user-not-on-discount',authMiddleware, async (req, res) => {
  try {
    const { page = 1, size = 9 } = req.query;
    const userId = req.user.user._id;
    const result = await UserloadNotOnDiscount(page, size, userId);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});


// put Products on sale
router.post('/user-put-on-sale', authMiddleware, async (req, res) => {
  const { productIds, offPercent, flag } = req.body;
  try {
    const userId = req.user.user._id;
    const result = await UserapplyDiscount(productIds, offPercent, flag, userId);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});


// Get all Products on sale
router.get('/user-on-discount',authMiddleware, async (req, res) => {
  try {
    const { page = 1, size = 9 } = req.query;
    const userId = req.user.user._id;
    const result = await UserloadOnDiscount(page, size, userId);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// end sale
router.post('/user-end-sale',authMiddleware, async (req, res) => {
  const { productIds, flag } = req.body;
  try {
    const userId = req.user.user._id;
    const offPercent = 0;
    const result = await UserendDiscount(productIds, offPercent, flag, userId);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});






// Get Product by ID
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getProductById({id: id});
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching the product.' });
  }
});

// Create Product
router.post('/', authMiddleware, upload, async (req, res) => {
  const { user } = req.user;
  try {
    const result = await createProduct({productData: req.body, imageFile: req.file, user: user});
    return res.status(result.status).json(result.data);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'An error occurred while creating the product.' });
  }
});

// Update Product
router.put('/:id', authMiddleware, upload, async (req, res) => {
  const { id } = req.params;
  const { user } = req.user;

  try {
    const result = await updateProduct({id: id, productData: req.body, imageFile: req.file, user: user});
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the product.' });
  }
});

// Delete Product
router.delete('/:id', authMiddleware,  async (req, res) => {
  const { id } = req.params;
  const { user } = req.user;

  try {
    const result = await deleteProduct({id: id , user: user});
    return res.status(result.status).json(result.message);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while deleting the product.' });
  }
});



export default router;
