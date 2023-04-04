import React from "react";
import {Link} from 'react-router-dom'

const button = {
    backgroundColor: 'lightgrey',
    padding: '5px 10px',
    border: '1',
    borderRadius: '6px',
    fontSize: '16px',
}

const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.createdAt}
            </td>
            <td>
                {todo.user.username}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.isActive ? 'Active' : 'Deleted'}
            </td>
            <td>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todo, deleteTodo}) => {
    return (
        <div>
            <h3>TODO</h3>
            <table>
                <th>
                    Text
                </th>
                <th>
                    Created at
                </th>
                <th>
                    User
                </th>
                <th>
                    Project
                </th>
                <th>
                    Status
                </th>
                <th></th>
                {todo.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo} />)}
            </table>
            <Link to='/todo/create'><button style={button}>Create TODO</button></Link>
        </div>
    )
}

export default TodoList;