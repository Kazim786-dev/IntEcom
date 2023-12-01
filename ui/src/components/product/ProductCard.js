/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({
    product,
    addToCart,
    addToWishlist,
    name,
    addedToCart,
    isInWishlist,
}) => {

	const navigate = useNavigate()

	const handleAddToCart = () => {
		if (name == '')
			navigate('/login')
		else {
			addToCart(product)
		}
	}

	const handleAddToWishlist = () => {
        if (name === '') {
            navigate('/login');
        } else {
            addToWishlist(product);
        }
    };

	return (

		<Card className="product-card py-3 px-3 pb-0">
			<Card.Img variant="top" src={product.image} className="product-card-img" />
			<Card.Body className="px-0 d-flex flex-column justify-content-between">
				<Card.Text className='text-styles' style={{ color: '#212529', fontWeight: '500' }}>{product.description}</Card.Text>

				<Row>
					<Row>
						<Card.Text className='text-styles' style={{ fontWeight: '700', fontSize: '14px' }}>
							Price: <span className="heading-styles">${product.price.toFixed(2)}</span>
						</Card.Text>
					</Row>
					<Row className='m-0 p-0 mt-2'>
						<Col className="d-flex justify-content-end gap-4">
							{product.quantity < 1 ? (
								<Button variant="primary" disabled>
									Out of Stock
								</Button>
							) :
								addedToCart ? (
									<Button variant="primary" onClick={handleAddToCart}>
									Added
									</Button>
								) : (
									<Button variant="primary" onClick={handleAddToCart}>
									Add to Cart
									</Button>
								)}
								<Button 
									variant="secondary"
									onClick={handleAddToWishlist}
									disabled={isInWishlist(product._id)} // Update the disabled state based on isInWishlist
								>
									{isInWishlist(product._id) ? 'Added to Wishlist' : 'Add to Wishlist'}
								</Button>
						</Col>
					</Row>
				</Row>
			</Card.Body>
		</Card>
	)
}

export default ProductCard
