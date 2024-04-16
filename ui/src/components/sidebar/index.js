import React from 'react';

//comp
import SidebarItem from './sidebar-item';

import { Card } from 'react-bootstrap';
import './Sidebar.css'; // Importing custom CSS

const Sidebar = ({ sidebarItems, selectedItem, handleItemClick }) => {
	return (
		<Card className=' h-100 p-4 border-0 min-h-screen sidebar' style={{ overflowX: 'auto' }}>

			{sidebarItems.map((item) => (
				<>
					<SidebarItem
						key={item.id}
						icon={item.icon}
						text={item.text}
						isSelected={selectedItem === item.text}
						onItemClick={() => handleItemClick(item.text)}
					/>
					<hr className='my-2'/>
				</>
			))}
		</Card>
	)
}

export default Sidebar;
