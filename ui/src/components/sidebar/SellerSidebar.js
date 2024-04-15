import React from 'react'

//comp
import SidebarItem from './sidebar-item'

//svg
import { ReactComponent as ArrowRight } from '../../static/images/svg/Arrow right short.svg'

import { Card } from 'react-bootstrap'

const Sidebar = ({ selectedItem, handleItemClick }) => {
	return (
		<Card className='h-100 ps-2 pt-3 border-0' style={{ overflow: 'auto' }}>
			<SidebarItem
				icon={<ArrowRight />}
				text="Products"
				isSelected={selectedItem === 'Products'}
				onItemClick={() => handleItemClick('Products')}
			/>
			<hr />
			<SidebarItem
				icon={<ArrowRight />}
				text="Process Orders"
				isSelected={selectedItem === 'Process'}
				onItemClick={() => handleItemClick('Process')}
			/>
			<hr />
			<SidebarItem
				icon={<ArrowRight />}
				text="Seller Analytics"
				isSelected={selectedItem === 'Analytics'}
				onItemClick={() => handleItemClick('Analytics')}
			/>
			<hr />
			<SidebarItem
				icon={<ArrowRight />}
				text="Discount Management"
				isSelected={selectedItem === 'Discount Management'}
				onItemClick={() => handleItemClick('Discount Management')}
			/>
			<hr />
			<SidebarItem
				icon={<ArrowRight />}
				text="End Sale"
				isSelected={selectedItem === 'End Sale'}
				onItemClick={() => handleItemClick('End Sale')}
			/>
			<hr />
			<SidebarItem
				icon={<ArrowRight />}
				text="Return Applications"
				isSelected={selectedItem === 'Return Applications'}
				onItemClick={() => handleItemClick('Return Applications')}
			/>
			<hr />
		</Card>
	)
}

export default Sidebar
