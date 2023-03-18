import React from 'react';
import {Link} from 'react-router-dom'


const menuStyle = {
    display: 'inline-block',
    margin: '10px',
}

class Menu extends React.Component {
    render() {
        return (
            <nav style={{backgroundColor: 'lightgrey'}}>
                <ul style={{padding: '10px'}}>
                    <li style={menuStyle}>
                        <Link to='/'>All users</Link>
                    </li>
                    <li style={menuStyle}>
                        <Link to='/projects'>Projects</Link>
                    </li>	
                    <li style={menuStyle}>
                        <Link to='/todo'>TODO</Link>
                    </li>
                    <li style={menuStyle}>
                        <Link to='/users'>Test redirect to users</Link>
                    </li>
                    <li style={menuStyle}>
                    {/* <button onClick={this.props.logout()}>Logout</button> */}
                        {this.props.is_auth ? <button onClick={() => this.props.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                    </li>
                </ul>
            </nav>
        )
    }
};

export default Menu;