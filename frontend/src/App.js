import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import UserList from './components/User';
import Footer from './components/Footer';
import axios from 'axios';


class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			'users': []
		}
	}

	componentDidMount() {
		axios.get('http://localhost:8000/api/users')
			.then(response => {
				const users = response.data
				this.setState(
					{
						'users': users
					}
				)
			}).catch(error => console.error(error))
	}

	render() {
		return (
			<div>
				<Menu />
				<UserList users={this.state.users} />
				<Footer />
			</div>
		)
	}
}


export default App;
