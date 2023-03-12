import React from "react";


const TodoItem = ({todo}) => {
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
        </tr>
    )
}

const TodoList = ({todo}) => {
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
                {todo.map((todo) => <TodoItem todo={todo} />)}
            </table>
        </div>
    )
}

export default TodoList;