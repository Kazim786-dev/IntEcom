import React from 'react';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import { ReactComponent as Trash } from '../../static/images/svg/Trash.svg';
import './Wishlist.css'; // Custom CSS file for Wishlist

const Wishlist = ({ wishlistItems, handleRemove }) => {
  return (
    <Container className="wishlist-container">
      <h2 className="mb-4">Your Wishlist</h2>
      {wishlistItems.length > 0 ? (
        wishlistItems.map((item, index) => (
          <Card className="wishlist-item" key={index}>
            <Row className="align-items-center">
              <Col md={4}>
                <Image src={item.image} alt={item.name} fluid />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
              </Col>
              <Col md={2}>
                <Button variant="link" onClick={() => handleRemove(item._id)}>
                  <Trash />
                </Button>
              </Col>
            </Row>
          </Card>
        ))
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </Container>
  );
};

export default Wishlist;
