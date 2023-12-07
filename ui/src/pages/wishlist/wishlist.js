import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import { ReactComponent as Trash } from '../../static/images/svg/Trash.svg';
import { useNavigate } from 'react-router-dom';
import SpinnerComp from '../../components/spinner';

import './wishlist.css';

const Wishlist = ({ user }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_DEV_BACKEND_URL}/wishlist/get`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (response.status === 200) {
          setWishlistItems(response.data);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_DEV_BACKEND_URL}/wishlist/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setWishlistItems(wishlistItems.filter(item => item._id !== productId));
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  const handleShopNow = (productId) => {
    // Navigate to the product detail page and pass productId and wishlist
    navigate(`/product-detail/${productId}`, { state: { wishlist: wishlistItems, productId } });
  };

  if (loading) {
    return <SpinnerComp />;
  }

  return (
    <div>
      <br/>
      <Container className="wishlist-container">
        <h2 className="mb-4">Your Wishlist</h2>
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item, index) => (
            <Card className="wishlist-item" key={index}>
              <Row className="align-items-center">
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid className="wishlist-item-img" />
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{`Color: ${item.color}, Size: ${item.size}`}</Card.Text>
                  </Card.Body>
                </Col>
                <Col md={2} className="d-flex justify-content-between align-items-center">
                  <Button variant="link" onClick={() => handleRemove(item._id)}>
                    <Trash />
                  </Button>
                  <Button variant="primary" onClick={() => handleShopNow(item._id)}>
                    Shop Now
                  </Button>
                </Col>
              </Row>
            </Card>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </Container>
    </div>
  );
};

export default Wishlist;
