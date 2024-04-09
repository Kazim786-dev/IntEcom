/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import axios from 'axios'

// react-bootstrap
import { Form, Row, Col } from 'react-bootstrap'

//react-router-dom
import { Link } from 'react-router-dom'

//components
import AlertComp from '../../components/alert'
import CustomButton from '../../components/button'
import FormField from '../../components/input-field'
import FormContainer from '../../components/formContainer'

//redux
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slice/auth/user-slice'

//function based component
const LoginPage = () => {

	//states
	// Create an object to store the form data
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		remember: false,
	})
	const [emailError, setEmailError] = useState('')
	const [showAlert, setShowAlert] = useState(false)
	const dispatch = useDispatch()

	// Destructure the form data object
	const { email, password, remember } = formData

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (validateEmail() == false) {
			return
		}

		try {
			const res = await axios.post(`${process.env.REACT_APP_DEV_BACKEND_URL}/auth/signin`, {
				email: email,
				password: password
			})

			if (res.data.token) {
				dispatch(login({
					email,
					password,
					name: res.data.user.name,
					mobile: res.data.user.mobile,
					token: res.data.token,
					rememberMe: formData.remember,
					role: res.data.user.role
				}))
				setShowAlert(false)
			}
		} catch (error) {
			setShowAlert(true) // Set showAlert to true to show the alert
		}

		// Clear all fields by resetting the form data state
		setFormData({
			email: '',
			password: '',
			remember: false,
		})
	}

	const validateEmail = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			setEmailError('Enter a valid email address')
		} else {
			setEmailError('')
			return true
		}
		return false
	}

	const handleFieldChange = (e) => {
		const { name, value } = e.target
		if (name == 'email') {
			setEmailError('')
		}
		setFormData({
			...formData,
			[name]: value,
		})
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
							<h1 className="text-3xl font-bold">Welcome to IntEcom</h1>
							<p className="text-gray-500 dark:text-gray-400">The best products delivered to your door</p>
						</div>
						<form onSubmit={handleSubmit} className='items-start'>
							<div className="flex flex-col space-y-3">
								<FormField
									controlId="email"
									label="Email"
									type="text"
									placeholder="james@gmail.com"
									name="email"
									value={email}
									onChange={handleFieldChange}
								/>
								{emailError && <p className="text-danger">{emailError}</p>}
								<FormField
									controlId="password"
									label="Password"
									type="password"
									placeholder=""
									name="password"
									value={password}
									onChange={handleFieldChange}
								/>
								<CustomButton variant="primary" type="submit" className="w-full mt-3">
									Login
								</CustomButton>
								<Row className="mt-3">
									<Form.Group controlId="remember" className="mb-3">
										<Form.Check className='font-semibold' type="checkbox" name="remember" label="Remember me" checked={remember} onChange={handleFieldChange} />
									</Form.Group>
								</Row>
								<div className="text-start">
									<Link to='/forget-pass' className="text-black">Forgot your password?</Link>
								</div>
								<div className="border-t text-center border-gray-200 dark:border-gray-800">
									<p className="text-sm text-gray-500 dark:text-gray-400">
										Don't have an account?
										<Link className="underline underline-offset-2" to={'/signup'}>
											Sign up
										</Link>
									</p>
								</div>
							</div>
						</form>
						{showAlert && (
							<AlertComp variant="danger" text="Wrong username password, please enter correct credentials" onClose={() => setShowAlert(false)} />
						)}
					</div>
				</div>
			</div>
		</div>



	)
}

export default LoginPage
