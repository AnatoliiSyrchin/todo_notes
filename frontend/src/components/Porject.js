import React from "react";
import {Link} from 'react-router-dom'

const button = {
    backgroundColor: 'lightgrey',
    padding: '5px 10px',
    border: '1',
    borderRadius: '6px',
    fontSize: '16px',
}


const ProjectItem = ({project, deleteProject}) => {
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

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <h3>Projects</h3>
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
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'><button style={button}>Create Project</button></Link>
        </div>
    )
}

export default ProjectList;