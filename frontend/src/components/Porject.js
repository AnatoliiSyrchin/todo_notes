import React from "react";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repository}
            </td>
            <td>
                {project.users.map((one_user) => {
                    return one_user.username + ' '
                })}
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