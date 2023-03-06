import React from 'react';


const menuStyle = {
    display: 'inline-block',
    margin: '10px',
}

const Menu = () => {
    return (
        <nav style={{backgroundColor: 'lightgrey'}}>
            <ul style={{padding: '10px'}}>
                <li style={menuStyle}>
                <a href='http://localhost:3000/'>All users</a>
                </li>
                <li style={menuStyle}>
                    <a href='http://localhost:3000/'>Projects</a>
                </li>
                <li style={menuStyle}>
                    <a href='http://localhost:3000/'>TODO</a>
                </li>
            </ul>
        </nav>
    )
};

export default Menu;