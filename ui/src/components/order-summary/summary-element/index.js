import React from 'react'

const SummaryElement = ({title, count, className}) => {
	return (
		<div className={className}>
			<p className='m-0 text-secondary font-semibold' style={{ fontFamily: 'Arial, sans-serif' }}>{title}</p>
			<h4 className='m-0 cart-heading' style={{ fontFamily: 'Arial, sans-serif' }}>{count}</h4>
		</div>
	)
}

export default SummaryElement
