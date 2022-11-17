import React, { useState } from "react";
import "../scss/daily-todo.scss"

const DailyTodo = () => {

    const [todos, setTodos] = useState(null)

    return (
        <>
        <div id="page-main" className="page-todo">
            <h1 id="title">ToDo list</h1>
            
                <ul>
                    <form>
                        <li><input type="text"></input></li>
                        <button type="submit">Add ToDo</button>
                    </form>
                    {todos && todos.map(todo => {
                        return (
                            <li>{todo}</li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default DailyTodo