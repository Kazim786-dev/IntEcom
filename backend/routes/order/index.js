// Importing necessary modules and functions
import { Router } from 'express';
import {
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    getAllUserOrders,
    getAllOrderProducts,
    getOrderSummary,
    checkout,
    getSellerOrders,
    updateOrderDeliveryStatus
} from '../../controllers/order/index.js';

import VerifyRole from '../../middleware/role-verification.js';
import authMiddleware from '../../middleware/auth.js'

const router = Router();

// Route for fetching all orders (accessible only to admin)
router.get('/', VerifyRole({ roleToCheck: 'admin' }), async (req, res) => {
    // Extracting query parameters from the request
    const { searchQuery, page = 1, size = 9 } = req.query;
    const { role } = req.user.user;

    try {
        // Calling the controller function to get all orders
        const result = await getAllOrders({ role, searchQuery, page, size });
        // Sending the response with the retrieved data
        res.status(result.status).json(result.data);
    } catch (error) {
        // Handling errors and sending an appropriate response
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Route for fetching orders specific to a user
router.get('/user-orders', async (req, res) => {
    // Extracting user role and query parameters from the request
    const { role } = req.user.user;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 8;

    try {
        // Calling the controller function to get user-specific orders
        const result = await getAllUserOrders({ role, user: req.user.user, page, pageSize });
        res.status(result.status).json(result.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching orders.' });
    }
});

// Route for fetching order summary (accessible only to admin)
router.get('/summary', VerifyRole({ roleToCheck: 'admin' }), async (req, res) => {
    try {
        // Calling the controller function to get order summary
        const result = await getOrderSummary();
        res.status(result.status).json(result.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the order summary.' });
    }
});

// Route to get orders for a specific seller
router.get('/seller-orders', authMiddleware, async (req, res) => {
    const userId = req.user.user._id;  // Get the user ID from req.user
    const {orderNumber} = req.query
    try {
        const result = await getSellerOrders(userId, orderNumber);
        res.status(result.status).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching the orders.' });
    }

});

router.post('/order-products', async (req, res) => {
    // Extracting products from the request body
    const { products } = req.body;
    try {
        // Calling the controller function to get order products
        const result = await getAllOrderProducts({ products });
        res.status(result.status).json(result.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Route for creating a new order
router.post('/', async (req, res) => {
    try {
        // Calling the controller function to create a new order
        const result = await createOrder({ user: req.user.user, body: req.body });
        res.status(result.status).json(result.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the order. ' + error.message });
    }
});
// In your order routes file (e.g., orderRoutes.js)
router.patch('/ship/:orderId', authMiddleware, async (req, res) => {
    try {

        
        const result = await updateOrderDeliveryStatus(req.params.orderId, req.user.user._id, 'Shipped');
        res.status(result.status).json(result.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.patch('/deliver/:orderId', authMiddleware, async (req, res) => {
    try {
        const result = await updateOrderDeliveryStatus(req.params.orderId, req.user.user._id, 'Delivered');
        res.status(result.status).json(result.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for updating an existing order (accessible only to admin)
router.put('/:id', VerifyRole({ roleToCheck: 'admin' }), async (req, res) => {
    const { id } = req.params;
    try {
        // Calling the controller function to update the order
        const result = await updateOrder(id, req.body);
        res.status(result.status).json(result.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the order.' });
    }
});

// Route for deleting an order (accessible only to admin)
router.delete('/:id', VerifyRole({ roleToCheck: 'admin' }), async (req, res) => {
    const { id } = req.params;
    try {
        // Calling the controller function to delete the order
        const result = await deleteOrder(id);
        res.status(result.status).json(result.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the order.' });
    }
});

// Route for creating a payment intent during checkout
router.post('/create-payment-intent', checkout.createPaymentIntent);

// Exporting the router for use in other files
export default router;
