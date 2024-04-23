/* eslint-disable react/prop-types */
import React from 'react'
import { Table } from 'react-bootstrap'

const DetailsTable = ({
	data,
	columns,
	striped = true,
	borderless = true
}) => {

	const tableClassName = `rounded custom-table ${striped ? 'table-striped' : ''} ${borderless ? 'table-borderless' : ''}`;

	return (
		//borderless striped 
		<Table striped borderless responsive hover>
			<thead>
				<tr>
					{columns.map((column, index) => (
						<th key={index} className="header-cell text-primary font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
							{column.header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.length > 0 &&
					data.map((item, index) => (
						<tr style={{
							height: '60px',
							backgroundColor: '#cfd1d6',
							backgroundImage: 'linear-gradient(147deg, #cfd1d6 0%, #edf1f4 74%)'

						}} key={index}>
							{columns.map((column, idx) => (
								<td key={idx} style={{ width: column.width, backgroundColor: 'transparent' }}>
									{column.render(item, index)}
								</td>
							))}
						</tr>
					))}
			</tbody>
		</Table>
	)
}

export default DetailsTable