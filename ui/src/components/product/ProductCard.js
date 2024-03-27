import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const ProductCard = ({
	product,
	addToCart,
	addToWishlist,
	name,
	addedToCart,
	isInWishlist,
}) => {
	const navigate = useNavigate()
	const location = useLocation()
	const { wishlist } = location.state ?? {}
	const handleAddToCart = (event) => {
		event.stopPropagation()  // Prevent event bubbling up to the parent
		if (name === '') {
			navigate('/login')
		} else {
			addToCart(product)
		}
	}

	const handleAddToWishlist = (event) => {
		event.stopPropagation()  // Prevent event bubbling up to the parent
		if (name === '') {
			navigate('/login')
		} else {
			addToWishlist(product)
		}
	}

	const navigateToProductDetail = () => {
		navigate(`/product-detail/${product._id}`, { state: { wishlist: wishlist } })
	}

	return (
		<Card className="product-card py-3 px-3 pb-0" onClick={navigateToProductDetail}>
			<Card.Img variant="top" src={product.image} className="product-card-img" />
			<Card.Body className="px-0 d-flex flex-column justify-content-between">
				<Card.Text className='text-styles' style={{ color: '#212529', fontWeight: '500', height: '50px', overflow: 'hidden' }}>
					{product.description}
				</Card.Text>
				<div>
					<Card.Text className='text-styles' style={{ fontWeight: '700', fontSize: '14px' }}>
						Price: <span className="heading-styles">${product.price.toFixed(2)}</span>
					</Card.Text>
					<div className="d-flex justify-content-end gap-4">
						{product.quantity < 1 ? (
							<Button variant="primary" disabled>
								Out of Stock
							</Button>
						) : addedToCart ? (
							<Button variant="primary" onClick={handleAddToCart} disabled>
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
							disabled={isInWishlist(product._id)}
						>
							{isInWishlist(product._id) ? 'Added to Wishlist' : 'Add to Wishlist'}
						</Button>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default ProductCard
