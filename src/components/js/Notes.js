import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../scss/notes.scss"
import e from "cors";
import Context from "./Context";


const Notes = () => {

    const [notes, setNotes] = useState([])
    const [input, setInput] = useState(null)

    let [login, setLogin, user, setUser] = useContext(Context)

    const getNotes = () => {
        axios.get("http://localhost:3001/users").then(result => {
            result.data.map((person) => {
                if(person.username === user.username) { 
                    setNotes(person.notes)
                }
            })
        })
    }

    useEffect(() => {
        getNotes()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(input) {
            let newNotes = notes
            newNotes.push(input)
            setNotes([...newNotes])
            axios.put("http://localhost:3001/notes", {newNotes})
        }
        
    }
    console.log(notes)

    const handleDeleteNote = (e) => {
        let delete_index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement) - 1
        let newNotes = notes.filter((note, index) => {
            if(index !== delete_index) {
                return note
            }
        })
        axios.put("http://localhost:3001/notes", {newNotes})
        setNotes(newNotes)
    }

    return (
        <><div id="page-main" className="page-notes">
            <h1 id="title">Notes</h1>
            
                <ul>
                    <form>
                        <li><input type="text" onChange={(e) => setInput(e.target.value)}></input></li>
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Add note</button>
                    </form>
                    {notes && notes.map((note, index) => {
                        return (
                            <div className="note" key={index}>
                                <li key={index}>{note}</li>
                                <button onClick={(e) => handleDeleteNote(e)}>x</button>
                            </div>
                            
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Notes