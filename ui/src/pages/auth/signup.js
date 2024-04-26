import React, { useState } from 'react'
import axios from 'axios'
import image from '../../static/images/ecom1.png'
import logo from '../../static/images/logo/logo.png'

// react-bootstrap
import { Form, Row, Col,Button } from 'react-bootstrap'

//react-router-dom
import { Link, useNavigate } from 'react-router-dom'

//components
import AlertComp from '../../components/alert'
import FormField from '../../components/input-field'
import FormContainer from '../../components/formContainer'

function SignUpPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        role: 'customer', // default role
    });
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAlert(false);
        setAlertText('');
        setErrors({}); // Reset errors

        if (!validateInput()) return; // Validation function

        try {
            const response = await axios.post(`${process.env.REACT_APP_DEV_BACKEND_URL}/auth/signup`, formData);
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Something went wrong!';
            setShowAlert(true);
            setAlertText(message);
        }
    };

    const validateInput = () => {
        let isValid = true;
        const { name, email, password } = formData;
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;
        const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()-_+=]).{8,}/;

        if (!emailRegex.test(email)) {
            setErrors(prev => ({ ...prev, email: 'Enter a valid email address.' }));
            isValid = false;
        }
        if (!passwordRegex.test(password)) {
            setErrors(prev => ({ ...prev, password: 'Password must contain at least one uppercase, one lowercase, one number, one symbol, and be at least 8 characters long.' }));
            isValid = false;
        }
        if (name.trim().length < 3) {
            setErrors(prev => ({ ...prev, name: 'Name must contain at least 3 characters.' }));
            isValid = false;
        }
        return isValid;
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

	return (
		<div className="w-full overflow-hidden">
			<div className="relative grid justify-center w-full min-h-screen gap-10 lg:grid-cols-2 xl:gap-0">
				<div className="ps-0 flex flex-col min-h-screen items-center justify-center" style={{backgroundColor:"#005A9C"}} >
					<img
						alt="Logo"
						className=" object-cover"
						// height="374"
						src={logo}
						// width="600"
					/>
					<br/>
					<br/>
					<h2 className="m-0 mt-5 d-flex align-items-center gap-3 font-semibold tracking-tighter text-secondary">
                            <span className='d-flex align-items-center gap-2 font-semibold '>
                                <span style={{color:'white', fontFamily:'Lucida Handwriting'}}>IntEcom</span>
                            </span>
                        <span className=' blockquote-footer tracking-tighter animate-pulse ' style={{marginBottom:'-16px', color:'#6f90af'}}>where shopping meets technology</span>
                    </h2>
                </div>
                <div className="flex items-center justify-center p-6 lg:p-10">
                    <div className="mx-auto w-full max-w-md px-4 py-2 space-y-8 landing rounded-2">
                        <h1 className="text-3xl font-bold text-purple-700">
                            Welcome to IntEcom
                            <p className="text-light text-sm font-normal dark:text-light">
                                The best products delivered to your door
                            </p>
                        </h1>
                        
                        <Form onSubmit={handleSubmit} className='items-start'>
                            <div className="flex flex-col space-y-3">
                                <FormField
                                    size='sm'
                                    controlId="name"
                                    label="Fullname"
                                    type="text"
                                    placeholder="James Smith"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFieldChange}
                                    error={errors.name}
                                />
                                <FormField
                                    size='sm'
                                    controlId="email"
                                    label="Email"
                                    type="email"
                                    placeholder="james@gmail.com"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFieldChange}
                                    error={errors.email}
                                />
                                <FormField
                                    size='sm'
                                    controlId="password"
                                    label="Password"
                                    type="password"
                                    placeholder="**************"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleFieldChange}
                                    error={errors.password}
                                />
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
                                <Form.Group as={Row} className="mt-2">
                                    <Col>
                                        <Form.Label className='font-semibold text-purple-400'>Role</Form.Label>
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
                                </Form.Group>
                                <Row className="m-0 mt-3 mb-4">
                                    <Button variant="primary" type="submit" className="w-100">
                                        SignUp
                                    </Button>
                                </Row>
                                {showAlert && (
                                    <AlertComp
                                        variant="danger"
                                        text={alertText}
                                        onClose={() => setShowAlert(false)}
                                    />
                                )}
                            </div>
                        </Form>
                        <div className="border-t text-center border-gray-200 dark:border-gray-800">
                            <p className="text-sm text-gray-400 dark:text-gray-400">
                                Already have an account?
                                <Link className="underline underline-offset-2" to="/login">Sign in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
