import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import UserList from './components/User';
import Footer from './components/Footer';
import ProjectList from './components/Porject';
import TodoList from './components/Todo';
import ProjectInfo from './components/ProjectInfo';
import axios from 'axios';
import {Navigate, Route, Routes, BrowserRouter} from 'react-router-dom'
import NotFound404 from './components/NotFound4040';


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
						'users': users.results
					}
				)
			}).catch(error => console.error(error))

		axios.get('http://localhost:8000/api/projects')
			.then(response => {
				const projects = response.data
				this.setState(
					{
						'projects': projects.results
					}
				)
			}).catch(error => console.error(error))

		axios.get('http://localhost:8000/api/todo')
			.then(response => {
				const todo = response.data
				this.setState(
					{
						'todo': todo.results
					}
				)
			}).catch(error => console.error(error))
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Menu />
					<Routes>
						<Route path='/' element={<UserList users={this.state.users} />}/>

						<Route path='/projects' element={<ProjectList projects={this.state.projects} />}/>
						
						<Route path='/todo' element={<TodoList todo={this.state.todo} />} />

						<Route path='/users' element={<Navigate to="/"/>} />

						<Route path='/projects/:name' element={<ProjectInfo projects={this.state.projects} todo={this.state.todo}/>} />

						<Route path='/*' element={<NotFound404 location={window.location}/>} />
					</Routes>
				</BrowserRouter>
				<Footer />
			</div>
		)
	}
}


export default App;
