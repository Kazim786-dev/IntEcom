import { React, useState, useMemo } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import NavbarSider from '../../components/navbar-sider/navbarSider'

import { Container, Form, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
//svg
import { ReactComponent as ArrowLeft } from '../../static/images/svg/Arrow left.svg'
import { ReactComponent as ColorIcon } from '../../static/images/svg/Ellipse 1.svg'
import { ReactComponent as Decrease } from '../../static/images/svg/Minus.svg'
import { ReactComponent as Increase } from '../../static/images/svg/Plus.svg'
import { ReactComponent as Trash } from '../../static/images/svg/Trash.svg'
import { HomeIcon, PackageIcon, BoxIcon, ShoppingCartIcon, UserIcon, HeartIcon } from '../../static/icons/navicons.js';


//components
import AlertComp from '../../components/alert'
import CustomButton from '../../components/button'
import DetailsTable from '../../components/table'
import DeleteConfirmationModal from '../../components/modal/delete-confirmation'
import SpinnerComp from '../../components/spinner'

//redux
import { remove, increase, decrease, placeOrder, updateQuantity } from '../../redux/slice/cart/cart-slice'
import { useDispatch, useSelector } from 'react-redux'

// Import the PaymentForm component
import PaymentForm from '../checkout/paymentForm' // Adjust the path as needed
const stripePromise = loadStripe('pk_test_51OHrp2GPQMuSMoo9D37NyaFjrEBynzU7R9G97MOQyg07osataoLH51UKHgp4zovjokjt4gsHUb93TMXry9TrfwVl00qd0jwf9c')

const ShoppingCart = ({ user }) => {
	const taxRate = 0.05 // Assuming tax rate of 10%

	// states
	const [deleteItemId, setDeleteItemId] = useState(null)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [orderPlaced, setOrderPlaced] = useState(false)
	const [orderError, setOrderError] = useState(false)
	const [errorText, setErrorText] = useState('')
	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	//redux State
	const cartItems = useSelector((state) => state.cart.products)

	const [showPaymentForm, setShowPaymentForm] = useState(false)

	// Modify handlePlaceOrder to just show the payment form
	const handleContinueToCheckout = () => {
		setShowPaymentForm(true)
	}

	// Function to handle quantity increase
	const handleIncrease = (itemId) => {
		const product = cartItems.find((product) => product._id === itemId)
		if (product && (product.orderQuantity + 1) > product.quantity) {
			setOrderError(true)
			setErrorText('Not enough quantity. Available Quantity is ' + product.quantity)
			setTimeout(() => {
				setOrderError(false)
			}, 2000)
		}
		else {
			dispatch(increase(itemId))
		}
	}

	// Function to handle quantity decrease
	const handleDecrease = (itemId) => {
		dispatch(decrease(itemId))
	}

	// Function to calculate subtotal
	const calculateSubTotal = useMemo(() => {
		const subTotal = cartItems.reduce((total, item) => total + (item.price * item.orderQuantity), 0)
		return subTotal
	}, [cartItems])

	const total = useMemo(() => {
		const subTotal = calculateSubTotal
		const tax = (subTotal * taxRate)
		return subTotal + tax
	}, [cartItems])

	const handleDelete = (itemId) => {
		setDeleteItemId(itemId)
		setShowDeleteModal(true)
	}

	const handleDeleteConfirmation = () => {
		if (deleteItemId) {
			// setCartItems((prevItems) => prevItems.filter((item) => item._id !== deleteItemId))
			dispatch(remove(deleteItemId))
			setDeleteItemId(null)
			setShowDeleteModal(false)
		}
	}
	const handleQuantityChange = (e, itemId) => {
		const newQuantity = parseInt(e.target.value, 10);
		const product = cartItems.find((product) => product._id === itemId);
		if (newQuantity >= 1) {
			if (product && newQuantity > product.quantity) {
				setOrderError(true);
				setErrorText('Not enough quantity. Available Quantity is ' + product.quantity)
				setTimeout(() => {
					setOrderError(false);
				}, 2000);
			} else {
				dispatch(updateQuantity({ itemId, newQuantity }));
			}
		}
	};
	// table column styling
	const columns = [
		// {
		// 	header: (
		// 		<Form.Check type="checkbox" />
		// 	),
		// 	width: '10px',
		// 	render: () => (
		// 		<Form.Check type="checkbox" />
		// 	),
		// },
		{
			header: 'Product',
			width: '25rem',
			render: (item) => (
				<div className="row align-items-center">
					<div className="col-auto pe-0">
						<Image src={item.image} alt="Product" className='table-product-img' />
					</div>
					<div className="col">
						<span>{item.description}</span>
					</div>
				</div>
			),
		},
		{
			header: 'Color',
			width: '9rem',
			render: (item) => (
				<>
					<ColorIcon width="22" height="21" fill={item.color} />
					{item.color}
				</>
			),
		},
		{
			header: 'Size',
			width: '9rem',
			render: (item) => item.size,
		},
		{
			header: 'Qty',
			width: '25%',
			render: (item) => (
				<div className="d-flex align-items-center">
					<button
						className="btn btn-sm"
						style={{ borderColor: '#DFDFDF' }}
						onClick={() => handleDecrease(item._id)}
					>
						<Decrease />
					</button>
					<input
						type="number"
						className="form-control quantity-input mx-3"
						value={item.orderQuantity}
						onChange={(e) => handleQuantityChange(e, item._id)}
						min="1"
						max={item.quantity} // Assuming you have a stock property
						style={{
							width: '80px',
							textAlign: 'center',
							borderRadius: '4px',
							borderColor: '#DFDFDF',
						}}
					/>
					<button
						className="btn btn-sm"
						style={{ borderColor: '#DFDFDF' }}
						onClick={() => handleIncrease(item._id)}
					>
						<Increase />
					</button>
				</div>
			),
		},
		{
			header: 'Price',
			render: (item) => `$${item.price.toFixed(2)}`,
		},
		{
			header: '',
			render: (item) => (
				// <Trash onClick={() => handleDelete(item._id)} style={{ cursor: "pointer", textAlign: "center", marginRight:"1rem" }}/>
				<button onClick={() => handleDelete(item._id)} style={{ backgroundColor: 'inherit', border: 'none', marginRight: '1rem' }}><Trash /></button>
			),
			width: '12px',
			//   style: { textAlign: "center", cursor: "pointer" },
		},
	]
	const cartLength = cartItems.length;

	const navlinks = [
		// { text: 'Home', link:'/', icon: <HomeIcon className="h-4 w-4" />, badge: '12' },
		{ text: 'Products', link: '/products', icon: <PackageIcon className="h-4 w-4" /> },

		{ text: 'Cart', link: '/cart', icon: <ShoppingCartIcon className="h-4 w-4" />, badge: cartLength > 0 ? cartLength : null },
		{ text: 'Wishlist', link: '/wishlist', icon: <HeartIcon className="h-4 w-4" /> },
		{ text: 'Account', dropdownItems: ['Logout'], to: '/login', icon: <UserIcon className="h-4 w-4" /> },
	]
	return (
		<>
			{loading ? (
				<SpinnerComp />
			) : (

				<Container fluid className="pt-0 p-5 mt-5">


					<div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
						<div style={{ overflowY: 'auto', flex: 3 }}>
							<div className="d-flex align-items-center heading-container">
								<Link to='/products'><ArrowLeft style={{ cursor: 'pointer' }} /></Link>
								<h1 className="cart-heading ">Your Shopping Bag</h1>
							</div>
							<DetailsTable data={cartItems} columns={columns} />
						</div>

						<div style={{
							flex: 1,
							backgroundColor: '#f8f9fa', // bg-light equivalent
							boxShadow: '0 2px 4px rgba(0,0,0,.2)',
							padding: '1rem',
							textAlign: 'left',
							height: '40rem',
							alignContent: 'center'
						}}>
							<h1 className="cart-heading " >Order Summary</h1>
							<br /><br />
							<div><p>Total Items:</p><b>{cartLength}</b></div><hr />
							<div><p>Sub Total:</p><b>${calculateSubTotal.toFixed(2)}</b></div><hr />
							<div><p>Service fee:</p><b>${(calculateSubTotal * taxRate).toFixed(2)}</b></div><hr />
							<div><p>Total:</p><b>${total.toFixed(2)}</b></div><hr />
							<br />
							<br />

							<div className="d-flex justify-content-center">
								<CustomButton
									isDisabled={cartItems.length <= 0}
									variant="outline-primary"
									onClick={handleContinueToCheckout}
								>
									<span className={'font-bold'}>Continue</span>
								</CustomButton>
							</div>
						</div>
					</div>



					{showPaymentForm && (
						<Elements stripe={stripePromise}>
							<PaymentForm
								setShowPaymentForm={setShowPaymentForm}
								user={user}
								total={total}
								cartItems={cartItems}
							/>
						</Elements>
					)}

					{showDeleteModal && <DeleteConfirmationModal showDeleteModal={showDeleteModal}
						setShowDeleteModal={setShowDeleteModal} handleDeleteConfirmation={handleDeleteConfirmation} />}

					{orderPlaced && (
						<AlertComp
							variant="success"
							text="Awesome, Your order has been placed successfully."
							onClose={() => setOrderPlaced(false)}
						/>
					)}
					{orderError && (
						<AlertComp
							variant="danger"
							text={errorText}
							onClose={() => setOrderError(false)}
						/>
					)}
				</Container>
			)}
		</>
	)
}

export default ShoppingCart
