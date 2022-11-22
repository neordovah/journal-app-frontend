import React, { useState, useEffect, useContext } from "react";
import "../scss/daily-todo.scss"
import axios from "axios";
import Context from "./Context";


const DailyTodo = () => {

    /*const [todos, setTodos] = useState(null)

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
    )*/

    const [todos, setTodos] = useState([])
    const [input, setInput] = useState(null)

    let [login, setLogin, user, setUser] = useContext(Context)

    const getTodos = () => {
        axios.get("http://localhost:3001/users").then(result => {
            result.data.map((person) => {
                if(person.username === user.username) { 
                    setTodos(person.todos)
                }
            })
        })
    }

    useEffect(() => {
        getTodos()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(input) {
            let newTodos = todos
            newTodos.push(input)
            setTodos(newTodos)
            await axios.put("http://localhost:3001/todos", {newTodos})
        }
        
    }
    console.log(todos)

    const handleDeleteTodo = (e) => {
        let delete_index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement) - 2
        let newTodos = todos.filter((todo, index) => {
            if(index !== delete_index) {
                return todo
            }
        })
        axios.put("http://localhost:3001/todos", {newTodos})
        setTodos(newTodos) 
        console.log(delete_index)
    }

    return (
        <><div id="page-main" className="page-todo">
            <h1 id="title">Daily ToDos</h1>
                    <form>
                        <input type="text" onChange={(e) => setInput(e.target.value)}></input>
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Add todo</button>
                    </form>
                    {todos && todos.map((todo, index) => {
                        return (
                            <div className="note" key={index}>
                                <p key={index}>{todo}</p>
                                <button onClick={(e) => handleDeleteTodo(e)}>x</button>
                            </div>
                        )
                    })}
            </div>
        </>
    )

}

export default DailyTodo