import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import UserList from './components/User';
import Footer from './components/Footer';
import ProjectList from './components/Porject';
import TodoList from './components/Todo';
import axios from 'axios';


class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			'users': [],
			'projects': [],
			'todo': [],
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

		axios.get('http://localhost:8000/api/projects')
			.then(response => {
				const projects = response.data
				this.setState(
					{
						'projects': projects
					}
				)
			}).catch(error => console.error(error))

		axios.get('http://localhost:8000/api/todo')
			.then(response => {
				const todo = response.data
				this.setState(
					{
						'todo': todo
					}
				)
			}).catch(error => console.error(error))
	}

	render() {
		console.log(this.state)
		return (
			<div>
				<Menu />
				<UserList users={this.state.users} />

				<ProjectList projects={this.state.projects} />
				
				<TodoList todo={this.state.todo} />
				<Footer />
			</div>
		)
	}
}


export default App;
