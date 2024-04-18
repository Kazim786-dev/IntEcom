/* eslint-disable react/prop-types */
import React from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'

const FormContainer = ({
	children,
	heading }) => {

	return (
		// <Container className='auth-form-container'>
		<Container className='py-3'>
			{/* <h1 className="text-animation display-4">
				<span className="text-primary"><b>I</b></span>
				<span className="text-primary"><b>n</b></span>
				<span className="text-primary"><b>t</b></span>
				<span className="text-danger"><b>E</b></span>
				<span className="text-danger"><b>c</b></span>
				<span className="text-danger"><b>o</b></span>
				<span className="text-danger"><b>m</b></span>
			</h1> */}
			<Row>
				{/* <Col xs={12} md={6} className="image-column">
					<div className="background-image"></div>
				</Col> */}
				<Col>
					<div className='px-5'>
						<div className="text-center text-primary">
							<h2>{heading}</h2>
						</div>
						<div className="d-flex justify-content-end align-items-center">
							<Card className="w-100 p-4 pt-3 mt-3">
								{/* <Card className='form-card p-4 pt-3'> */}
								{children}
							</Card>
						</div>
					</div>
				</Col>
			</Row>

		</Container>
	)
}

export default FormContainer
