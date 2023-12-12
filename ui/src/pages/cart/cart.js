import { React, useState, useMemo } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { Container, Form, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

//svg
import { ReactComponent as ArrowLeft } from '../../static/images/svg/Arrow left.svg'
import { ReactComponent as ColorIcon } from '../../static/images/svg/Ellipse 1.svg'
import { ReactComponent as Decrease } from '../../static/images/svg/Minus.svg'
import { ReactComponent as Increase } from '../../static/images/svg/Plus.svg'
import { ReactComponent as Trash } from '../../static/images/svg/Trash.svg'


//components
import AlertComp from '../../components/alert'
import CustomButton from '../../components/button'
import DetailsTable from '../../components/table'
import DeleteConfirmationModal from '../../components/modal/delete-confirmation'
import SpinnerComp from '../../components/spinner'

//redux
import { remove, increase, decrease, placeOrder } from '../../redux/slice/cart/cart-slice'
import { useDispatch, useSelector } from 'react-redux'

// Import the PaymentForm component
import PaymentForm from '../checkout/paymentForm'; // Adjust the path as needed
const stripePromise = loadStripe('pk_test_51OHrp2GPQMuSMoo9D37NyaFjrEBynzU7R9G97MOQyg07osataoLH51UKHgp4zovjokjt4gsHUb93TMXry9TrfwVl00qd0jwf9c');

const ShoppingCart = ({ user }) => {
	const taxRate = 0.1 // Assuming tax rate of 10%

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

	const [showPaymentForm, setShowPaymentForm] = useState(false);

	// Modify handlePlaceOrder to just show the payment form
	const handleContinueToCheckout = () => {
		setShowPaymentForm(true);
	};

	// Function to handle quantity increase
	const handleIncrease = (itemId) => {
		const product = cartItems.find((product) => product._id === itemId)
		if (product && (product.orderQuantity + 1) > product.quantity) {
			setOrderError(true)
			setErrorText('Not enough quantity')
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
					<button className="btn btn-sm" style={{ borderColor: '#DFDFDF' }} onClick={() => handleDecrease(item._id)}>
						<Decrease />
					</button>
					<div
						className="border-outline"
						style={{
							border: '1px solid #DFDFDF',
							borderRadius: '4px',
							display: 'inline-block',
							margin: '0rem 0.625rem',
							padding: '0.38rem 1.875rem',
						}}
					>
						<span className="mx-3">{item.orderQuantity}</span>
					</div>
					<button className="btn btn-sm " style={{ borderColor: '#DFDFDF' }} onClick={() => handleIncrease(item._id)}>
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

	return (
		<>
			{loading ? (
				<SpinnerComp />
			) : (
				<Container fluid className="pt-0 p-5 mt-5">
					<div className="d-flex align-items-center heading-container">
						<Link to='/products'><ArrowLeft style={{ cursor: 'pointer' }} /></Link>
						<h1 className="cart-heading ">Your Shopping Bag</h1>
					</div>

					<div style={{ height: '19rem', overflowY: 'auto' }}>
						<DetailsTable data={cartItems} columns={columns} />
					</div>

					<div className="total-container">
						<div ><p>Sub Total:</p><b>${calculateSubTotal.toFixed(2)}</b></div>
						<div ><p>Tax:</p><b>${(calculateSubTotal * taxRate).toFixed(2)}</b></div>
						<div ><p>Total:</p><b>${total.toFixed(2)}</b></div>
					</div>
					<div className="d-flex justify-content-end">
						<CustomButton
							className="custom-button"
							isDisabled={cartItems.length <= 0}
							variant="primary"
							onClick={handleContinueToCheckout}
						>
							Continue to Checkout
						</CustomButton>
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
	);
};

export default ShoppingCart;
