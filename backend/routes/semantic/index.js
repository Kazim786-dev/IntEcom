import {Router, response} from 'express'
const router = Router();
import axios from 'axios';

router.get("/", async (req, res) => {
    try {
        // GET request with query parameters
        const queryParams = req.query;

        axios.get('http://localhost:5000/search', { params: queryParams })
            .then(response => {
                return res.json(response.data);
            })
            .catch(error => {
                return res.json({ message: 'Error sending data to Python server:' });
            });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while searching semantically.' });
    }
});

router.post("/", async (req, res) => {
    try {
        const product = req.body.product; // Extract the product object directly
        axios.post('http://localhost:5000/add', product)
        .then(response => {
            return res.json(response.data);
        })
        .catch(error => {
            return res.json({ message: 'Error sending data to Python server' });
        });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while adding to database.' });
    }
});


export default router