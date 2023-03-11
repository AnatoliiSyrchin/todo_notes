import React from "react";
import { useParams } from 'react-router-dom'


const ProjectTodo = ({one_todo}) => {
    return(
        <tr>
            <td> todo </td><td>{one_todo.text} ({one_todo.user.username})</td>
        </tr>
    )
}


const ProjectInfo = ({projects, todo}) => {
    let { name } = useParams();
    let project = projects.find(project => project.name === name)
    console.log(project)
    let project_todo = todo.filter(one_todo => one_todo.project === parseInt(project.id))
    return(
        <div>
            <h3>{project.name}</h3>
            <table>
                <th>Name</th><th>Info</th>
                <tr>
                    <td> Project name </td><td>{project.name}</td>
                </tr>
                <tr>
                    <td> Project repository </td><td>{project.repository}</td>
                </tr>
                <tr>
                    <td> Project users </td><td>{project.users.map(user => user.username + ' ')}</td>
                </tr>
                {project_todo.map(todo => <ProjectTodo one_todo={todo} />)}
            </table>
        </div>
    )
}

export default ProjectInfo;