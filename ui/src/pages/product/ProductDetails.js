import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDetails.css';

import { Container, Row, Col, Button, Card, Image, Badge } from 'react-bootstrap';
import SpinnerComp from '../../components/spinner';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add as addToCartAction, increase as increaseInCart } from '../../redux/slice/cart/cart-slice';

const ProductDetailPage = ({ user }) => {
    const location = useLocation();
    const { wishlist, productId } = location.state;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.products);
    const [reporting, setReporting] = useState(false);
    const [isProductInWishlist, setIsProductInWishlist] = useState(false);

    const isProductInCart = cartProducts.some(item => item._id === productId);

    useEffect(() => {
        //set the state by checking if the passed state (i.e., array of products in wishlist) contain the current product
        setIsProductInWishlist( wishlist.some(item => item._id === productId))

        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/products/${productId}`,{
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

        fetchProductDetails();
    }, [productId, user.token]);

    const handleAddToCart = () => {
        const item = { ...product, orderQuantity: 1 }; // Assuming orderQuantity
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
            },{
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setIsProductInWishlist(true)
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };
    const handleReportProduct = () => {
        setReporting(true);
      };

    if (loading) {
        return <SpinnerComp />;
    }

    return (
        <Container className="mt-5">
            <br/>
            {product && (
                <Card className="product-detail-card">
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={6}>
                            <Card.Body>
                                <br/>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>
                                    <strong>Price:</strong> ${product.price.toFixed(2)}
                                </Card.Text>
                                <Card.Text>
                                    <Badge bg="secondary">{product.color}</Badge>
                                    <Badge bg="secondary">{product.size}</Badge>
                                </Card.Text>
                                <Button 
                                    variant="primary" 
                                    onClick={handleAddToCart} 
                                    disabled={isProductInCart}
                                >
                                    {isProductInCart ? 'In Cart' : 'Add to Cart'}
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
                                    disabled={reporting}
                                    className="ms-2"
                                    >
                                    {reporting ? 'Reported' : 'Report Product'}
                                </Button>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            )}
        </Container>
    );
};

export default ProductDetailPage;
