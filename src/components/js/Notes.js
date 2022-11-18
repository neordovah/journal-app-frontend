import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../scss/notes.scss"
import e from "cors";
import Context from "./Context";


const Notes = () => {

    const [notes, setNotes] = useState([])
    const [input, setInput] = useState(null)

    let [login, setLogin, user, setUser] = useContext(Context)

    useEffect(() => {
        axios.get("http://localhost:3001/users").then(result => {
            result.data.map((person) => {
                if(person.username === user.username) { 
                    setNotes(person.notes)
                }
            })
        })
    }, [notes])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(input) {
            let newNotes = notes
            newNotes.push(input)
            setNotes(newNotes)
            axios.put("http://localhost:3001/notes", {newNotes})

        }
    }

    const handleDeleteNote = (e) => {
        let delete_index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement) - 1
        let newNotes = notes.filter((note, index) => {
            if(index !== delete_index) {
                return note
            }
        })
        setNotes(newNotes)
        axios.put("http://localhost:3001/notes", {newNotes})
    }

    return (
        <><div id="page-main" className="page-notes">
            <h1 id="title">Notes</h1>
            
                <ul>
                    <form>
                        <li><input type="text" onChange={(e) => setInput(e.target.value)}></input></li>
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Add note</button>
                    </form>
                    {notes && notes.map(note => {
                        return (
                            <div className="note" key={note}>
                                <li key={note}>{note}</li>
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