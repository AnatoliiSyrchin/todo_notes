import React from 'react'

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', project: 0, user: 0}
    }

    handleChange(event) {
        // console.log(event.target.name)
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event) {
        console.log(this.state.text)
        console.log(this.state.project)
        console.log(this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="text">text</label>
                    <input type="text" className="form-control" name="text"
                        value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="project">project</label>
                    <input type="number" className="form-control" name="project"
                        value={this.state.project} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="user">user</label>
                    <input type="number" className="form-control" name="user"
                        value={this.state.user} onChange={(event)=>this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default TodoForm;
