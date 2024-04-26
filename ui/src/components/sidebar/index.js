import React from 'react';

//comp
import SidebarItem from './sidebar-item';

import { Card } from 'react-bootstrap';
import './Sidebar.css'; // Importing custom CSS

const Sidebar = ({ sidebarItems, selectedItem, handleItemClick }) => {
	return (
		<Card className=' h-100 p-4 border-0 sidebar rounded-0' style={{
			overflowX: 'auto', maxHeight: '100%',
			// backgroundColor: '#ccd8f5',
			// backgroundImage: 'linear-gradient(147deg, #ccd8f5 0%, #edf1f4 65%)'
		}}>

			{sidebarItems.map((item) => (
				<>
					<SidebarItem
						key={item.id}
						icon={item.icon}
						text={item.text}
						isSelected={selectedItem === item.text}
						onItemClick={() => handleItemClick(item.text)}
					/>
					<hr className='my-2 text-light' />
				</>
			))}
		</Card>
	)
}

export default Sidebar;
