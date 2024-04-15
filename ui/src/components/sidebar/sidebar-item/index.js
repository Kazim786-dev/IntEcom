import React from 'react';
import './SidebarItem.css'; // Importing custom CSS

const SidebarItem = ({ icon, text, isSelected, onItemClick }) => {
    return (
        <div
            className={`sidebar-item ${isSelected ? 'active' : ''}`}
            onClick={onItemClick}
        >
            {icon}
            <span className="ms-2">{text}</span>
        </div>
    )
}

export default SidebarItem;
