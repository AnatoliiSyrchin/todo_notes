import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', repository: ''}
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleUsersChange(event) {
        if (!event) {
            this.setState(
                {"users": []}
            );
        }
        this.setState(
            {"users": [...event.target.selectedOptions].map(item => parseInt(item.value))}
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repository, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">Project name </label>
                    <input type="text" className="form-control" name="name"
                        value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div>
                    <label for="repository">Repository </label>
                    <input type="url" className="form-control" name="repository"
                        value={this.state.repository} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div>
                    <label for="users">Users </label>
                    <select multiple onChange={(event)=>this.handleUsersChange(event)} name="users">
                        {this.props.users.map((item)=><option value={parseInt(item.id)}>{item.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm;
