/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

//react-bootstrap
import { Form } from 'react-bootstrap'

const FormField = ({ 
	className, 
	controlId, 
	label, 
	name, 
	value, 
	type,
	as,
	onBlur, 
	placeholder,
	min,
	onChange,
	children }) => {
    
	return (
		<Form.Group controlId={controlId} className={className}>
			<Form.Label className="text-styles input-field text-light">{label}</Form.Label>
			<Form.Control
				type={type}
				as={as}
				placeholder={placeholder}
				min={min !== undefined ? min : null}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				required
			/>
			{children}
		</Form.Group>
	)
}

export default FormField
