import React from 'react'

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', project: props.projects[0].id, user: props.users[0].id}
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.text, this.state.project, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="text">Text </label>
                    <input type="text" className="form-control" name="text"
                        value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div>
                    <label for="project">Project </label>
                    <select onChange={this.handleChange} name="project">
                        {this.props.projects.map((item)=><option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div>
                    <label for="user">User </label>
                    <select onChange={this.handleChange} name="user">
                        {this.props.users.map((item)=><option value={item.id}>{item.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default TodoForm;
