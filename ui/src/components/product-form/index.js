import React from 'react'
import { Form, Button } from 'react-bootstrap'
import FormField from '../input-field'

const ProductForm = ({product, formData, handleChange, handleSubmit}) => {
	return (
		<Form onSubmit={handleSubmit}>
			<FormField
				required
				controlId={'description'}
				label={'Product Name'}
				type='text'
				as={'textarea'}
				className={'mb-3'}
				value={formData.description}
				onChange={handleChange}
				name='description'
				placeholder={'Cargo Trousers for Men - 6 Pocket Trousers - 6 Pocket Cargo Trousers'}
			/>
			<FormField
				required
				controlId={'price'}
				label={'Price'}
				type='number'
				className={'mb-3'}
				value={formData.price}
				onChange={handleChange}
				name='price'
				placeholder={'PKR 100.00'}
				min={'0'}
			/>
			<FormField
				required
				controlId={'quantity'}
				label={'Quantity'}
				type='number'
				className={'mb-4'}
				value={formData.quantity}
				onChange={handleChange}
				name='quantity'
				placeholder={'100'}
				min='1'
			/>
			<FormField
				required
				controlId={'catagory'}
				label={'Catagory'}
				type='text'
				className={'mb-4'}
				value={formData.catagory}
				onChange={handleChange}
				name='catagory'
				placeholder={'Clothing'}
			/>
			<Form.Group controlId="model3D" className="mb-4">
				<Form.Label>3D Model (optional)</Form.Label>
				<Form.Control
					type="file"
					name="model3D"
					onChange={handleChange}
					accept=".glb,.gltf,.obj"
				/>
			</Form.Group>
			<div className='d-flex justify-content-end'>
				<Button className='w-25 py-2' variant='primary' type='submit'>
					{product ? 'Update' : 'Save'}
				</Button>
			</div>
		</Form>
	)
}

export default ProductForm 