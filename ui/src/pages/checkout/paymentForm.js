import React, { useState } from 'react'
import axios from 'axios'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap'
import './PaymentForm.css' // This will be your custom CSS file
import { useNavigate } from 'react-router-dom'
import AlertComp from '../../components/alert'

//redux
import { remove, increase, decrease, placeOrder } from '../../redux/slice/cart/cart-slice'
import { useDispatch, useSelector } from 'react-redux'

const countryOptions = [
	{ code: 'US', name: 'United States' },
	{ code: 'UK', name: 'United Kingdom' },
	{ code: 'PK', name: 'Pakistan' },
	{ code: 'JP', name: 'Japan' },
	// ... other countries
]

const PaymentForm = ({ user, total, cartItems, setShowPaymentForm }) => {
	const stripe = useStripe()
	const elements = useElements()
	const dispatch = useDispatch()
	const navigate = useNavigate()


	const [shippingInfo, setShippingInfo] = useState({
		name: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		country: 'US',
	})

	const [orderPlaced, setOrderPlaced] = useState(false)
	const [orderError, setOrderError] = useState(false)
	const [errorText, setErrorText] = useState('')
	const [loading, setLoading] = useState(false)
	const handleInputChange = (event) => {
		const { name, value } = event.target
		setShippingInfo({ ...shippingInfo, [name]: value })
	}

	const handlePaymentSubmit = async (event) => {
		event.preventDefault()

		if (!stripe || !elements) {
			return
		}

		// Replace with your backend endpoint
		const paymentIntentEndpoint = `${process.env.REACT_APP_DEV_BACKEND_URL}/orders/create-payment-intent`

		try {
			const amountInCents = Math.round(total * 100)

			const { data } = await axios.post(paymentIntentEndpoint, {
				amount: amountInCents, // Stripe expects amount in cents
				currency: 'usd',
			}, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			})
			const cardElement = elements.getElement(CardElement)
			const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
				payment_method: {
					card: cardElement,
					billing_details: {
						name: shippingInfo.name,
						address: {
							line1: shippingInfo.address,
							city: shippingInfo.city,
							state: shippingInfo.state,
							postal_code: shippingInfo.zip,
							country: shippingInfo.country,
						},
					},
				},
			})

			if (paymentResult.error) {
				setOrderError(true)
				setErrorText(paymentResult.error.message)
			} else {
				console.log('Payment successful!', paymentResult)

				// Call the placeOrder function after successful payment
				try {
					const products = cartItems.map((product) => ({
						product: product._id,
						quantity: product.orderQuantity,
					}))
					const ProductsforReceipt = cartItems.map((product) => ({
						id: product._id,
						name: product.name,
						price: product.price,
						quantity: product.orderQuantity,
					}))

					const orderSuccessful = dispatch(
						placeOrder(products, total, user.token, shippingInfo, 'Paid')
					)
					if (orderSuccessful) {
						setOrderPlaced(true)
						setOrderError(false)
						setErrorText('')
						
						navigate('/order-confirm', {
							state:{
								shippingInfo,
								products:ProductsforReceipt,
								total
							}
						})
						setTimeout(() => {
							setLoading(false)
						}, 1000)
					} else {
						setOrderError(true)
						setErrorText('Error occured in placing the order')
						setOrderPlaced(false)
						setTimeout(() => {
							setLoading(false)
						}, 1000)
					}
				} catch (error) {
					setOrderError(true)
					setErrorText(error.message || 'Order Placement error')
				}
			}
		} catch (error) {
			setOrderError(true)
			setErrorText(error.message || 'Payment error')
		}
	}

	return (
		<div className="payment-form-slide">
			<Container>
				<div className="d-flex ">
					<h2 className="mb-4">Shipping and Payment</h2>
					<Button className="ms-auto p-2 h-50" variant="primary" onClick={() => setShowPaymentForm(false)}>
						Close
					</Button>
				</div>
				<Form onSubmit={handlePaymentSubmit}>
					{/* Shipping Details */}
					<fieldset>
						<legend>Shipping Details</legend><br /><br />
						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm={2}>Name</Form.Label>
							<Col sm={10}>
								<Form.Control type="text" name="name" onChange={handleInputChange} />
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm={2}>Address</Form.Label>
							<Col sm={10}>
								<Form.Control type="text" name="address" onChange={handleInputChange} />
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm={2}>City</Form.Label>
							<Col sm={10}>
								<Form.Control type="text" name="city" onChange={handleInputChange} />
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm={2}>State</Form.Label>
							<Col sm={10}>
								<Form.Control type="text" name="state" onChange={handleInputChange} />
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm={2}>Zip</Form.Label>
							<Col sm={10}>
								<Form.Control type="text" name="zip" onChange={handleInputChange} />
							</Col>
						</Form.Group>

						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm={2}>Country</Form.Label>
							<Col sm={10}>
								<Form.Control
									as="select"
									name="country"
									value={shippingInfo.country}
									onChange={handleInputChange}
								>
									{countryOptions.map((option) => (
										<option key={option.code} value={option.code}>
											{option.name}
										</option>
									))}
								</Form.Control>
							</Col>
						</Form.Group>
					</fieldset>

					{/* Payment Details */}
					<br /><br /><br /><legend>Payment Details</legend><br /><br />
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm={2}>Card Information</Form.Label>
						<Col sm={10}>
							<InputGroup>
								<CardElement className="form-control" />
							</InputGroup>
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3">
						<Form.Label column sm={2}>Name on Card</Form.Label>
						<Col sm={10}>
							<Form.Control type="text" name="Name on Card" onChange={handleInputChange} />
						</Col>
					</Form.Group>

					<br /><br /><br /><Button type="submit" variant="primary" disabled={!stripe}>
						Confirm Payment
					</Button>
				</Form>
				{orderPlaced && (
					<AlertComp variant="success" text="Awesome, Your order has been placed successfully." onClose={() => setOrderPlaced(false)} />
				)}
				{orderError && (
					<AlertComp variant="danger" text={errorText} onClose={() => setOrderError(false)} />
				)}
			</Container>
		</div>
	)
}

export default PaymentForm








