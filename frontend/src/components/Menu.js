import React from 'react';
import {Link} from 'react-router-dom'


const menuStyle = {
    display: 'inline-block',
    margin: '10px',
}

const button = {
    backgroundColor: 'lightgrey',
    padding: '5px 10px',
    border: '1',
    borderRadius: '6px',
    fontSize: '16px',
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
                    <li style={menuStyle}>Hello {this.props.is_auth ? this.props.username : 'stranger'}</li>
                    <li style={menuStyle}>
                        {this.props.is_auth ?
                                <button style={button} onClick={() => this.props.logout()}>Logout</button> :
                                <Link to='/login'><button style={button}>Login</button></Link>
                        }
                    </li >
                </ul>
            </nav>
        )
    }
};

export default Menu;