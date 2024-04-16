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
						<th key={index} className="header-cell text-primary">
							{column.header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.length > 0 &&
						data.map((item, index) => (
							<tr style={{ height: '60px' }} key={index}>
								{columns.map((column, idx) => (
									<td key={idx} style={{ width: column.width }}>
										{column.render(item,index)}
									</td>
								))}
							</tr>
						))}
			</tbody>
		</Table>
	)
}

export default DetailsTable