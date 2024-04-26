import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import HeartIcon from '../../static/icons/heart'
import ShoppingCartIcon from '../../static/icons/cart'
import './style.css'
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
		<Card className="product-card bg-light border pb-0"
			style={{ cursor: 'pointer', border: 'none', boxShadow: '0px 1px 1px rgba(0,0,0,0.15)', padding: '3px', position: 'relative' }}
			onClick={navigateToProductDetail} >
			{product.isOnSale && (
				<div className="sale-badge">
					{product.offPercent}% OFF
				</div>
			)}
			<Card.Img variant="top" src={product.image} className="product-card-img" />
			<hr className='mb-1 mt-3' />
			<Card.Body className="product-card-body rounded pt-0 pb-3 px-2 d-flex flex-column justify-content-between">
				<Card.Text className=' text-light pr-1 m-0' style={{ height: '27px', overflow: 'hidden' }}>
					{product.description}
				</Card.Text>
				<Card.Title className='mb-4 text-light text-2xl font-semibold'>
					PKR {product.price.toFixed(2)}
				</Card.Title>
				<div className="d-flex justify-content-start mt-0 gap-2">
					{product.quantity < 1 ? (
						<Button size='sm' variant='info' disabled>
							Out of Stock
						</Button>
					) : addedToCart ? (
						<Button size='sm' variant='info' onClick={handleAddToCart} disabled>
							Added to Cart
						</Button>
					) : (
						<Button size='sm' variant='' className='bg-black text-light d-flex items-center gap-1'
							onClick={handleAddToCart}
						>
							<ShoppingCartIcon className="w-4 h-4" /> {/* Heart icon */}
							Add to Cart
						</Button>
					)}
					<Button
						size='sm'
						// variant='outline-primary'
						variant='primary'
						className='d-flex items-center gap-1'
						onClick={handleAddToWishlist}
						disabled={isInWishlist(product._id)}
						style={{ display: 'flex', alignItems: 'center' }} // Apply flexbox styles directly
					>
						<HeartIcon className="w-4 h-4" /> {/* Heart icon */}
						<span>
							{isInWishlist(product._id) ? 'Added' : 'Wishlist'}
						</span>
					</Button>
				</div>
			</Card.Body>
		</Card>
	)
}

export default ProductCard


// import React from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { useNavigate, useLocation } from 'react-router-dom';

// const ProductCard = ({
//   product,
//   addToCart,
//   addToWishlist,
//   addedToCart,
//   isInWishlist,
// }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { wishlist } = location.state ?? {};

//   const handleAddToCart = (event) => {
//     event.stopPropagation();
//     if (!name) {
//       navigate('/login');
//     } else {
//       addToCart(product);
//     }
//   };

//   const handleAddToWishlist = (event) => {
//     event.stopPropagation();
//     if (!name) {
//       navigate('/login');
//     } else {
//       addToWishlist(product);
//     }
//   };

//   const navigateToProductDetail = () => {
//     navigate(`/product-detail/${product._id}`, { state: { wishlist } });
//   };

//   return (
//     <Card
//       className="product-card shadow-lg rounded-lg overflow-hidden"
//       onClick={navigateToProductDetail}
//     >
//       <Card.Img variant="top" src={product.image} className="product-card-img" />
//       <Card.Body className="px-4 py-3">
//         <Card.Text className="text-gray-800 text-base h-16 overflow-hidden">
//           {product.description}
//         </Card.Text>
//         <div className="flex justify-between items-center mt-4">
//           <div className="text-xl font-bold text-gray-900">
//             Price: ${product.price.toFixed(2)}
//           </div>
//           <div className="flex gap-4">
//             {product.quantity < 1 ? (
//               <Button variant="primary" disabled className="px-4 py-2">
//                 Out of Stock
//               </Button>
//             ) : addedToCart ? (
//               <Button variant="primary" disabled className="px-4 py-2">
//                 Added
//               </Button>
//             ) : (
//               <Button
//                 variant="primary"
//                 onClick={handleAddToCart}
//                 className="px-4 py-2"
//               >
//                 Add to Cart
//               </Button>
//             )}
//             <Button
//               variant="secondary"
//               onClick={handleAddToWishlist}
//               disabled={isInWishlist(product._id)}
//               className="px-4 py-2"
//             >
//               {isInWishlist(product._id) ? 'Added to Wishlist' : 'Add to Wishlist'}
//             </Button>
//           </div>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ProductCard;
