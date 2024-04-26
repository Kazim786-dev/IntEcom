import React from 'react'
import { Spinner } from 'react-bootstrap'

const SpinnerComp = ({ style }) => {

	const defaultStyle = {
		height: '100vh',
	};

	// Merge default styles with the styles passed via props (if any)
	const containerStyle = { ...defaultStyle, ...style };
	return (
		<div className='d-flex justify-content-center align-items-center' style={containerStyle}>
			<Spinner animation="border" variant="light" />
		</div>
	)
}

export default SpinnerComp