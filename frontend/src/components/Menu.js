import React from 'react';


const menuStyle = {
    display: 'inline-block',
    margin: '10px',
}

const Menu = () => {
    return (
        <nav style={{backgroundColor: 'lightgrey'}}>
            <ul style={{padding: '10px'}}>
                <li style={menuStyle}>All User</li>
                <li style={menuStyle}>Projects</li>
                <li style={menuStyle}>TODO</li>
            </ul>
        </nav>
    )
};

export default Menu;