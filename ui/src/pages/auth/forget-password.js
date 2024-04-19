import React, { useState } from 'react'
import axios from 'axios'

// react-ootstrap
import { Form, Row, Col } from 'react-bootstrap'

//react-router-dom
import { Link,useNavigate } from 'react-router-dom'

import logo from '../../static/images/logo/logo.png'

//components
import AlertComp from '../../components/alert'
import CustomButton from '../../components/button'
import FormField from '../../components/input-field'
import FormContainer from '../../components/formContainer'

//function based component
function ForgetPasswordPage() {

	//states
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')
	const [alertText, setAlertText] = useState('')
	const [variant, setVariant] = useState()
	const [showAlert, setShowAlert] = useState(false)

	const handleSubmit = async(e) => {
		e.preventDefault()
		// Perform login logic here
		if(validateEmail()==false){
			return
		}
		try {
			const res = await axios.post(`${process.env.REACT_APP_DEV_BACKEND_URL}/users/verify-mail`, {
				email: email
			})

			if(res.status && res.status===200){
				setAlertText('Reset Password Instructions has been sent to your email address.')
				setShowAlert(true)
				setVariant('success')
			}
		} catch (error) {
			setVariant('danger')
			if(error.response?.status && error.response.status===404){
				setAlertText('User not found')
			}
			else{
				setAlertText('Error occured')
			}
			setShowAlert(true)
		}

		//clear all fields
		setEmail('')
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

	const handleEmailChange = (e) => {
		setEmail(e.target.value)
		setEmailError('')
	}

	return (
		<div className="w-full overflow-hidden">
			<div className="relative grid items-center justify-center w-full min-h-screen gap-10 lg:grid-cols-2 xl:gap-0">
				<div className=" ps-0 flex flex-col min-h-screen items-center justify-center" style={{backgroundColor:"#005A9C"}} >
					<img
						alt="Logo"
						// className=" object-cover"
						// height="374"
						src={logo}
						// width="600"
					/>
					<br/><br/>
					<h2 className="m-0 mt-5 d-flex align-items-center gap-3 font-semibold tracking-tighter text-secondary">
                            <span className='d-flex align-items-center gap-2 font-semibold '>
                                <span style={{color:'white', fontFamily:'Lucida Handwriting'}}>IntEcom</span>
                            </span>
                        <span className=' blockquote-footer tracking-tighter animate-pulse ' style={{marginBottom:'-16px', color:'#6f90af'}}>where fashion meets technology</span>
                    </h2>
				</div>
				<FormContainer heading="Forgot Password">
					<Form onSubmit={handleSubmit}>
						<Row>
							<FormField
								controlId="email"
								label="Enter email address"
								type="text"
								placeholder="Please enter your email"
								value={email}
								onChange={handleEmailChange}
							/>
							{emailError && <p className="text-danger">{emailError}</p>}

						</Row>
						
						<Row className='m-0 mt-4'>
							<CustomButton variant="primary" type="submit" className="w-100" 
								// isDisabled={emailError!=='' || email==''}
							>
								Forgot Password
							</CustomButton>
						</Row>
						<Row className="mt-3">
							<Col>
								<p className="text-center mb-0 text-styles">No, I remember my password! <Link to='/login' className="text-decoration-none">Login</Link></p>
							</Col>
						</Row>
					</Form>

					{showAlert && (
						<AlertComp 
							variant={variant} 
							text={alertText}
							onClose={() => setShowAlert(false)}
						/>
					)}

				</FormContainer>
			</div>
		</div>
	)
}

export default ForgetPasswordPage
