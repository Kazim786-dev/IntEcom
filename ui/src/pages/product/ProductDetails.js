import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './ProductDetails.css';
import { Container, Row, Col, Button, Card, Image, Badge, Modal, Form } from 'react-bootstrap';
import SpinnerComp from '../../components/spinner';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add as addToCartAction, increase as increaseInCart } from '../../redux/slice/cart/cart-slice';

const ProductDetailPage = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.products);
    const [reporting, setReporting] = useState(false);
    const [hasUserReported, setHasUserReported] = useState(false);
    const [isProductInWishlist, setIsProductInWishlist] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [reportText, setReportText] = useState('');

    const wishlist = location.state?.wishlist || [];
    const productId = location.state?.productId || null;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const isProductInCart = cartProducts.some(item => item._id === productId);

    useEffect(() => {

        if (productId) {
            setIsProductInWishlist(wishlist.some(item => item._id === productId));

            const fetchProductDetails = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/products/${productId}`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                    if (response.status === 200) {
                        setProduct(response.data);
                    }
                } catch (error) {
                    console.error('Error fetching product details:', error);
                } finally {
                    setLoading(false);
                }
            };

            const checkUserReports = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/products/reports/${productId}`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                    if (response.data.userHasReported) {
                        setHasUserReported(true);
                    }
                } catch (error) {
                    console.error('Error checking user reports:', error);
                }
            };

            fetchProductDetails();
            checkUserReports();
        } else {
            setLoading(false);
            navigate('/products');
            // Optionally, redirect to home or show an error message
        }
        
    }, [productId, user.token]);

    const handleAddToCart = () => {
        const item = { ...product, orderQuantity: 1 };
        if (!isProductInCart) {
            dispatch(addToCartAction(item));
        } else {
            dispatch(increaseInCart(productId));
        }
    };

    const handleAddToWishlist = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_DEV_BACKEND_URL}/wishlist/add`, {
                productId: product._id
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setIsProductInWishlist(true);
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    const handleReportProduct = () => {
        setShowModal(true);
    };

    const handleConfirmReport = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_DEV_BACKEND_URL}/products/report`, {
                productId: product._id,
                reportText: reportText,
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setReporting(true);
        } catch (error) {
            console.error('Error reporting product:', error);
        } finally {
            setShowModal(false);
            setReportText('');
        }
    };

    if (loading) {
        return <SpinnerComp />;
    }

    return (
        <Container className="mt-5">
            <br/>
            <br/>
            {product && (
                <Card className="product-detail-card">
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={6}>
                            <Card.Body>
                            <br/><br/>
                                <br/>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>
                                    <strong>Price:</strong> ${product.price.toFixed(2)}
                                </Card.Text>
                                <Card.Text >
                                    <Badge bg="secondary" className='pad'>{product.color}</Badge>
                                    <Badge bg="secondary" className='pad'>{product.size}</Badge>
                                </Card.Text>
                                <Button 
                                    variant="primary" 
                                    onClick={handleAddToCart} 
                                    disabled={isProductInCart || product.quantity==0}
                                >
                                    {isProductInCart ? 'In Cart' : 'Add to Cart'}
                                    {product.quantity==0 ? 'Out of Stock' : 'Add to Cart'}
                                </Button>
                                <Button 
                                    variant="success" 
                                    onClick={handleAddToWishlist} 
                                    disabled={isProductInWishlist}
                                    className="ms-2"
                                >
                                    {isProductInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                                </Button>
                                <Button 
                                    variant="danger" 
                                    onClick={handleReportProduct} 
                                    disabled={reporting || hasUserReported}
                                    className="ms-2"
                                >
                                    {hasUserReported ? 'Reported' : 'Report Product'}
                                </Button>
                                <br/><br/><br/><br/><br/><br/><br/><br/>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            )}

            {/* Modal for reporting the product */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Report Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Reason for Reporting</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                                placeholder="Enter your reason here..."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleConfirmReport}>
                        Confirm Report
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProductDetailPage;
