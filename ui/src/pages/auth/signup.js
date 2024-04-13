import React, { useState } from 'react'
import axios from 'axios'

// react-bootstrap
import { Form, Row, Col } from 'react-bootstrap'

//react-router-dom
import { Link, useNavigate } from 'react-router-dom'

//components
import AlertComp from '../../components/alert'
import CustomButton from '../../components/button'
import FormField from '../../components/input-field'
import FormContainer from '../../components/formContainer'

//function based component
function SignUpPage() {

	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		mobile: '',
		role: 'customer', // default role

	})
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [nameError, setNameError] = useState('')
	const [showAlert, setShowAlert] = useState(false)
	const [alertText, setAlertText] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		setShowAlert(false)
		setAlertText('')

		if (validateEmail() == false || validatePassword() == false) {
			return
		}

		// Name validation: Check if name is not empty and has at least 3 characters (excluding spaces)
		if (formData.name.trim().length < 3) {
			setNameError('Name should contain at least 3 letters (excluding spaces).')
			return
		}

		try {
			const res = await axios.post(`${process.env.REACT_APP_DEV_BACKEND_URL}/auth/signup`, {
				name: formData.name,
				email: formData.email,
				password: formData.password,
				mobile: formData.mobile,
				role: formData.role, // sending role to backend

			})
			if (res.status && res.status === 201) {
				navigate('/login')
			}
		}
		catch (error) {
			if (error.response && error.response.data && error.response.data.message) {
				setAlertText(error.response.data.message)
				setShowAlert(true)
			}
			else {
				setAlertText('Something went wrong!')
				setShowAlert(true)
			}
		}

		setFormData({
			name: '',
			email: '',
			password: '',
			mobile: '',
		})
		setPasswordError('')
		setEmailError('')
	}

	const validateEmail = () => {
		// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/
		if (!emailRegex.test(formData.email)) {
			setEmailError('Enter a valid email address')
		} else {
			setEmailError('')
			return true
		}
		return false
	}

	const validatePassword = () => {
		const hasUppercase = /[A-Z]/.test(formData.password)
		const hasLowercase = /[a-z]/.test(formData.password)
		const hasNumber = /\d/.test(formData.password)
		const hasSymbol = /[~`!@#$%^&*()-_+=]/.test(formData.password)

		if (!(hasUppercase && hasLowercase && hasNumber && hasSymbol)) {
			setPasswordError(
				'Password must contain a capital letter, small letter, number, and symbol'
			)
		} else {
			setPasswordError('')
			return true
		}
		return false
	}

	const handleFieldChange = (e) => {
		const { name, value } = e.target
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	return (
		<div className="w-full overflow-hidden px-6">
			<div className="relative grid items-center justify-center w-full min-h-screen gap-10 lg:grid-cols-2 xl:gap-0">
				<div className="hidden ps-5 lg:flex items-center justify-center">
					<img
						alt="Product"
						className="aspect-[600/374] object-cover bg-gray-100"
						// height="374"
						src="/ecom.png"
					// width="600"
					/>
				</div>
				<div className="flex items-center justify-center p-6 lg:p-10">
					<div className="mx-auto w-full max-w-md px-4 space-y-8">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold" style={{color: '#005A9C',
                            fontStyle: 'italic', }}>Welcome to IntEcom</h1>
							<p className="text-gray-500 dark:text-gray-400">The best products delivered to your door</p>
						</div>
						<form onSubmit={handleSubmit} className='items-start'>
							<div className="flex flex-col space-y-3">

								<Form onSubmit={handleSubmit}>
									<Row>
										<FormField
											size='sm'
											controlId="name"
											label="Fullname"
											type="text"
											placeholder="James Smith"
											name="name"
											value={formData.name}
											onChange={handleFieldChange}
										/>
										{nameError && <p className="text-danger">{nameError}</p>}
									</Row>
									<Row className="mt-2">
										<FormField
											size='sm'
											controlId="email"
											label="Email"
											type="text"
											placeholder="james@gmail.com"
											name="email"
											value={formData.email}
											onChange={handleFieldChange}
										/>
										{emailError && <p className="text-danger">{emailError}</p>}
									</Row>
									<Row className="mt-2">
										<FormField
											size='sm'
											controlId="password"
											label="Password"
											type="password"
											placeholder="**************"
											name="password"
											value={formData.password}
											onChange={handleFieldChange}
										/>
										{passwordError && <p className="text-danger">{passwordError}</p>}
									</Row>
									<Row className="mt-2">
										<FormField
											size='sm'
											controlId="mobile"
											label="Mobile"
											type="text"
											placeholder="+913216537857"
											name="mobile"
											value={formData.mobile}
											onChange={handleFieldChange}
										/>
									</Row>
									<Row className="mt-2">
										<Col>
											<Form.Label className='font-semibold'>Role</Form.Label>
											<Form.Select
												size='sm'
												aria-label="Select Role"
												name="role"
												value={formData.role}
												onChange={handleFieldChange}
											>
												<option value="customer">Customer</option>
												<option value="seller">Seller</option>
											</Form.Select>
										</Col>
									</Row>
									<Row className="m-0 mt-3 mb-4">
										<CustomButton variant="primary" type="submit" className="w-100">
											SignUp
										</CustomButton>
									</Row>
									{/* <Row className="mt-3">
										<Col>
											<p className="text-center mb-0 text-styles">
												Already have an account!
												<Link to="/login" className="text-decoration-none">
													Login
												</Link>
											</p>
										</Col>
									</Row> */}
									<div className="border-t text-center border-gray-200 dark:border-gray-800">
										<p className="text-sm text-gray-500 dark:text-gray-400">
											Already have an account?
											<Link className="underline underline-offset-2" to={'/login'}>
												Sign in
											</Link>
										</p>
									</div>
								</Form>

								{showAlert && (
									<AlertComp
										variant="danger"
										text={alertText}
										onClose={() => setShowAlert(false)}
									/>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

				)
}

				export default SignUpPage
