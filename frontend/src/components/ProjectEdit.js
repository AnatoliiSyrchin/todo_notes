import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const ProjectEdit = (props) => {
    let {id} = useParams()
    const navigate = useNavigate();
    let project = props.projects.find(item => item.id === parseInt(id))
    const projectUsers = project.users.map(item => parseInt(item.id))
    const [name, setName] = useState(project.name)
    const [repository, setRepository] = useState(project.repository)
    const [users, setUsers] = useState(projectUsers)

    function handleSubmit (event) {
        // console.log(name, repository, users)
        props.editProject(project.id, name, repository, users)
        event.preventDefault()
        navigate('/projects')
    };

    function handleChange (event) {
        if (event.target.name === 'name') {
            setName(event.target.value)
        }
        if (event.target.name === 'repository') {
            setRepository(event.target.value)
        }
        if (event.target.name === 'users') {
            setUsers([...event.target.selectedOptions].map(item => parseInt(item.value)))
        }
        
    };

    return(
        <div>
            <h3>{project.name}</h3>
            <form onSubmit={(event)=> handleSubmit(event)}>
                <div className="form-group">
                    <label for="name">Project name </label>
                    <input type="text" className="form-control" name="name"
                        value={name} onChange={(event)=>handleChange(event)} />
                </div>
                <div>
                    <label for="repository">Repository </label>
                    <input type="url" className="form-control" name="repository"
                        value={repository} onChange={(event)=>handleChange(event)} />
                </div>
                <div>
                    <label for="users">Users </label>
                    <select defaultValue={users} multiple onChange={(event)=>handleChange(event)} name="users">
                        {props.users.map((item)=><option value={parseInt(item.id)}>{item.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        </div>
    )
}

// defaultValue={[project.users.map(item => parseInt(item.id))]}
// class ProjectEdit extends React.Component {
//     constructor(props) {
//         super(props)

//         console.log(this.props)
//         this.id = this.props.match.params.id
//         // console.log(this.id)
//         this.project = this.props.projects.find(project => project.id === this.id)
//     }

//     render() {
//         return(
//             <div>
//                 <h3>{this.project.name}</h3>
//                 <table>
//                     <th>Name</th><th>Info</th>
//                     <tr>
//                         <td> Project name </td><td>{this.project.name}</td>
//                     </tr>
//                     <tr>
//                         <td> Project repository </td><td>{this.project.repository}</td>
//                     </tr>
//                     <tr>
//                         <td> Project users </td><td>{this.project.users.map(user => user.username + ' ')}</td>
//                     </tr>
//                 </table>
//             </div>
//         )
//     }
// }

export default ProjectEdit;
