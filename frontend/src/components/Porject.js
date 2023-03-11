import React from "react";
import {Link} from 'react-router-dom'


const ProjectItem = ({project}) => {
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
        </tr>
    )
}

const ProjectList = ({projects}) => {
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
                {projects.map((project) => <ProjectItem project={project} />)}
            </table>
        </div>
    )
}

export default ProjectList;