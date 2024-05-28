import React from 'react';
import './Sidebar.css';

const Sidebar = ({ items, onSelect }) => {
    return (
        <aside className="sidebar">
            {items.map((item, index) => (
                <div key={index} className="sidebar-icon" onClick={() => onSelect(item.key)}>
                    <i className={`fas ${item.icon}`}></i>
                    <span className="sidebar-label">{item.label}</span>
                </div>
            ))}
        </aside>
    );
};

export default Sidebar;
