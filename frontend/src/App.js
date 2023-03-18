import React from 'react';
import axios from 'axios';
import {Navigate, Route, Routes, BrowserRouter} from 'react-router-dom'
import Cookies from 'universal-cookie'

// import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import UserList from './components/User';
import Footer from './components/Footer';
import ProjectList from './components/Porject';
import TodoList from './components/Todo';
import ProjectInfo from './components/ProjectInfo';
import LoginForm from './components/Auth';
import NotFound404 from './components/NotFound4040';



class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			'users': [],
			'projects': [],
			'todo': [],
			'access_token':'',
			'refresh_token':'',
		}
	}

	get_token (username, password) {
		const headers = this.get_headers()
		axios.post('http://localhost:8000/api/token/',
			{username: username, password: password},
			{headers})
			.then(response => {
				this.set_token(response.data)
			}).catch(error => alert('Wrong login or password'))
	}

	set_token(tokens) {
		const cookies = new Cookies()
		cookies.set('access_token', tokens['access'])
		cookies.set('refresh_token', tokens['refresh'])
		this.setState({'access_token': tokens['access'], 'refresh_token': tokens['refresh']}, ()=>this.load_data())
	}

	is_authenticated() {
		return this.state.access_token !== ''
	}

	logout() {
		this.set_token({'access':'', 'refresh':''})
	}

	get_token_from_storage() {
		const cookies = new Cookies()
		const access_token = cookies.get('access_token')
		const refresh_token = cookies.get('refresh_token')
		this.setState({'access_token': access_token, 'refresh_token': refresh_token}, ()=>this.load_data())
	}
	
	get_headers() {
		let headers = {
			"Content-Type": "application/json"
		}
		if (this.is_authenticated()) {
			headers['Authorization'] = 'Bearer ' + this.state.access_token
		}
		return headers
	}
	
	load_data() {
		const headers = this.get_headers()
		axios.get('http://localhost:8000/api/users', {headers})
			.then(response => {
				const users = response.data
				this.setState(
					{
						'users': users.results
					}
				)
			}).catch(error => {
				console.error(error)
				this.setState({users: []})
			})

		axios.get('http://localhost:8000/api/projects', {headers})
			.then(response => {
				const projects = response.data
				this.setState(
					{
						'projects': projects.results
					}
				)
			}).catch(error => {
				console.error(error)
				this.setState({projects: []})
			})

		axios.get('http://localhost:8000/api/todo', {headers})
			.then(response => {
				const todo = response.data
				this.setState(
					{
						'todo': todo.results
					}
				)
			}).catch(error => {
				console.error(error.message)
				this.setState({todo: []})
			})

	}

	componentDidMount() {
		this.get_token_from_storage() 
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Menu is_auth={this.is_authenticated()} logout={() => this.logout()}/>
					<Routes>
						<Route path='/' element={<UserList users={this.state.users} />}/>

						<Route path='/projects' element={<ProjectList projects={this.state.projects} />}/>
						
						<Route path='/todo' element={<TodoList todo={this.state.todo} />} />

						<Route path='/users' element={<Navigate to="/"/>} />

						<Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)}/>} />

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
