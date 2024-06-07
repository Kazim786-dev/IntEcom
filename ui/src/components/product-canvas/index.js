import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Container, Offcanvas, Row, Col } from 'react-bootstrap'

import AlertComp from '../alert'
import ImageUpload from '../image-upload'
import ProductForm from '../product-form'
import SpinnerComp from '../spinner'

//svg
import { ReactComponent as ArrowLeft } from '../../static/images/svg/Arrow left.svg'

const ProductCanvas = ({
	placement,
	show,
	setShow,
	product,
	handleShouldFetchAgain,
	token }) => {

	const [loading, setLoading] = useState(false)
	const [Errortext, setErrorText] = useState('')

	const [formData, setFormData] = useState({
		price: product?.price,
		quantity: product?.quantity,
		description: product?.description,
		image: product?.image,
		catagory: product?.catagory,
		model3D: product?.model3D,
	})

	const handleChange = (e) => {
		const { name, value, files } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: name === 'image' || name === 'model3D' ? files[0] : value,
		}))
	}

	const handleAddProduct = async (e) => {
		e.preventDefault()

		if (formData.quantity < 1 || formData.price < 1) {
			setErrorText('Quantity and price can\'t be less than 1')
			return
		}

		setLoading(true)
		setErrorText('')
        
		const Form = new FormData()
		Form.append('description', formData.description)
		Form.append('price', formData.price)
		Form.append('quantity', formData.quantity)
		Form.append('catagory', formData.catagory)
		if (formData.image) {
			Form.append('image', formData.image)
		}
		if (formData.model3D) {
			Form.append('model3D', formData.model3D)
		}

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DEV_BACKEND_URL}/products`,
				Form,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			if (response.status && (response.status === 201 || response.status === 202)) {
				handleShouldFetchAgain()
				setShow(false)
			}
			setTimeout(() => {
				setLoading(false)
			}, 1000)
		} catch (error) {
			if (error.response?.status && error.response.status === 401) {
				setErrorText('Unauthorized. Try login again')
			} else {
				setErrorText('Error occurred while creating the product.')
			}
			console.log(error)
			setTimeout(() => {
				setLoading(false)
			}, 1000)
		}
	}

	const handleEditProduct = async (e) => {
		e.preventDefault()

		if (formData.quantity < 1 || formData.price < 1) {
			setErrorText('Quantity and price can\'t be less than 1')
			return
		}

		setLoading(true)
		setErrorText('')
        
		const Form = new FormData()
		Form.append('description', formData.description)
		Form.append('price', formData.price)
		Form.append('quantity', formData.quantity)
		Form.append('catagory', formData.catagory)
		if (formData.image) {
			Form.append('image', formData.image)
		}
		if (formData.model3D) {
			Form.append('model3D', formData.model3D)
		}

		try {
			const response = await axios.put(
				`${process.env.REACT_APP_DEV_BACKEND_URL}/products/${product._id}`,
				Form,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			if (response.status && (response.status === 200 || response.status === 202)) {
				handleShouldFetchAgain()
				setShow(false)
			}
			setTimeout(() => {
				setLoading(false)
			}, 1000)
		} catch (error) {
			if (error.response?.status && error.response.status === 401) {
				handleShouldFetchAgain()
				setErrorText('Unauthorized. Try login again')
			} else {
				setErrorText('Error occurred while updating the product.')
			}
			console.error(error)
			setTimeout(() => {
				setLoading(false)
			}, 1000)
		}
	}

	return (
		<Offcanvas show={show} onHide={() => setShow(false)} placement={placement} style={{ width: '50%' }}>
			<Offcanvas.Body>
				{loading ? (
					<SpinnerComp />
				) : (
					<>
						<Container>
							<div className='d-flex align-items-center heading-container'>
								<ArrowLeft onClick={() => setShow(false)} style={{ cursor: 'pointer' }} />
								{product ? (
									<h3 className='ms-1'>Edit Product</h3>
								) : (
									<h3 className='ms-1'>Add Product</h3>
								)}
							</div>
							<hr />
							<Row>
								<Col md={4}>
									<ImageUpload handleChange={handleChange} product={product} />
								</Col>
								<Col md={8}>
									<ProductForm product={product} formData={formData} handleChange={handleChange} 
										handleSubmit={product ? handleEditProduct : handleAddProduct} />
								</Col>
							</Row>
						</Container>
						{Errortext !== '' && (
							<AlertComp
								variant='danger'
								text={Errortext}
								onClose={() => setErrorText('')}
							/>
						)}
					</>
				)}
			</Offcanvas.Body>
		</Offcanvas>
	)
}

export default ProductCanvas
