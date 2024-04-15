import React from 'react'

const SidebarItem = ({ icon, text, isSelected, onItemClick }) => {
	return (
		<div
			className={`d-flex gap-1 align-items-center pointer-cursor ${isSelected ? 'text-primary' : ''}`}
			onClick={onItemClick}
		>
			{/* {icon}
			<span className="">{text}</span> */}
			<div style={{ flexShrink: 0 }}>{icon}</div> {/* Ensure icon does not shrink */}
				{text}
		</div>
	)
}

export default SidebarItem
