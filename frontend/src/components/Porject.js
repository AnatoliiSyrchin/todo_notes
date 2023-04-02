import React from "react";
import {Link} from 'react-router-dom'

const button = {
    backgroundColor: 'lightgrey',
    padding: '5px 10px',
    border: '1',
    borderRadius: '6px',
    fontSize: '16px',
}


class ProjectList extends React.Component {
    constructor(props) {
        super(props)
        this.search= ''
        this.state = {"projects": this.props.projects}
    }

    handleSubmit(event){
        let filtered_projects = this.props.projects.filter(project => project.name.includes(this.search))
        this.setState({"projects": filtered_projects})
        event.preventDefault()
    }

    handleChange(event) {
        this.search = event.target.value
    }

    ProjectItem({project, deleteProject}) {
        return (    
            <tr>
                <td>
                    <Link to={`/projects/${project.name}`} >{project.name}</Link>
                </td>
                <td>
                    {project.repository}
                </td>
                <td>
                    {project.users.map((one_user) => one_user.username + ' ')}
                </td>
                <td>
                    <button onClick={() => deleteProject(parseInt(project.id))}>Delete</button>
                </td>
            </tr>
        )
    }
    
    render() {
        return (
            <div>
                <h3>Projects</h3>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="text" name="search" onChange={(event)=>this.handleChange(event)} />
                    <input type="submit" value="Search" />
                </form>
                <table>
                    <th>
                        Name
                    </th>
                    <th>
                        Repository
                    </th>
                    <th>
                        Users
                    </th>
                    <th></th>
                    {this.search !== ''
                        ? this.state.projects.map((project) =>
                            <this.ProjectItem project={project} deleteProject={this.props.deleteProject}/>)
                        : this.props.projects.map((project) =>
                            <this.ProjectItem project={project} deleteProject={this.props.deleteProject}/>)
                    }
                </table>
                <Link to='/projects/create'><button style={button}>Create Project</button></Link>
            </div>
        )
    }
}

export default ProjectList;