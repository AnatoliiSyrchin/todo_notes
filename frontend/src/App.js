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
import ProjectForm from './components/ProjectForm';
import TodoList from './components/Todo';
import TodoForm from './components/TodoForm';
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
			'username': '',
			'access_token':'',
			'refresh_token':'',
		}
	}

	get_token (username, password) {
		axios.post('http://localhost:8000/api/token/',
			{username: username, password: password},
			{headers: {
				"Content-Type": "application/json"
			}})
			.then(response => {
				this.set_tokens(username, response.data)
			}).catch(error => alert('Wrong login or password'))
	}

	get_new_access_token(refresh_token, username) {
		axios.post('http://localhost:8000/api/token/refresh/',
			{refresh: refresh_token},
			{headers: {
				"Content-Type": "application/json"
			}})
			.then(response => {
				this.setState({'access_token': response.data['access'], 'username': username}, ()=>this.load_data())
			}).catch(error => {
				alert('Wrong refresh token')
				console.error(error)
			})
	}

	set_tokens(username, tokens) {
		const cookies = new Cookies()
		cookies.set('username', username)
		cookies.set('access_token', tokens['access'])
		cookies.set('refresh_token', tokens['refresh'])
		this.setState({'username': username, 'access_token': tokens['access'], 'refresh_token': tokens['refresh']}, ()=>this.load_data())
	}

	is_authenticated() {
		return this.state.access_token !== ''
	}

	logout() {
		this.set_tokens('', {'access':'', 'refresh':''})
	}

	get_token_from_storage() {
		const cookies = new Cookies()
		const refresh_token = cookies.get('refresh_token')
		const username = cookies.get('username')
		if (refresh_token) {
			this.get_new_access_token(refresh_token, username)
		} else this.load_data()
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
	
	deleteTodo(id) {
		const headers = this.get_headers()
		axios.delete(`http://localhost:8000/api/todo/${id}`, {headers})
		.then(response => {
			this.load_data()
		}).catch(error => console.log(error))
	}

	createTodo(text, project, user) {
		const headers = this.get_headers()
		const data = {text: text, project: project, isActive: true, user: user}
		axios.post('http://localhost:8000/api/todo/', data, {headers})
			.then(response => {
				this.load_data()
			}).catch(error => console.log(error))
	}

	createProject(name, repository, users) {
		const headers = this.get_headers()
		const data = {name: name, repository: repository, users: users}
		axios.post('http://localhost:8000/api/projects/', data, {headers})
			.then(response => {
				this.load_data()
			}).catch(error => console.log(error))
	}

	deleteProject(id) {
		const headers = this.get_headers()
		axios.delete(`http://localhost:8000/api/projects/${id}`, {headers})
		.then(response => {
			this.load_data()
		}).catch(error => console.log(error))
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<Menu is_auth={this.is_authenticated()} username={this.state.username} logout={() => this.logout()}/>
					<Routes>
						<Route path='/' element={<UserList users={this.state.users} />}/>

						<Route path='/projects' element={<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>}/>

						<Route path='/projects/create' element={<ProjectForm users={this.state.users} createProject={(name, repository, users) => this.createProject(name, repository, users)}/>} />
						
						<Route path='/todo' element={<TodoList todo={this.state.todo} deleteTodo={(id) => this.deleteTodo(id)}/>} />

						<Route path='/todo/create' element={<TodoForm projects={this.state.projects} users={this.state.users} createTodo={(text, project, user) => this.createTodo(text, project, user)}/>} />

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
