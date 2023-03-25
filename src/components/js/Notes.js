import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../scss/notes.scss"
import e from "cors";
import Context from "./Context";


const Notes = () => {

    const [notes, setNotes] = useState([])
    const [input, setInput] = useState("")

    let [login, setLogin, user, setUser] = useContext(Context)

    const getNotes = () => {
        axios.get("https://journal-app-xud3.onrender.com/users").then(result => {
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
        if(input !== "") {
            let newNotes = notes
            newNotes.push(input)
            setNotes([...newNotes])
            axios.put("https://journal-app-xud3.onrender.com/notes", {newNotes})
            setInput("")
        }
    }

    const handleDeleteNote = (e) => {
        let delete_index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement) - 1
        let newNotes = notes.filter((note, index) => {
            if(index !== delete_index) {
                return note
            }
        })
        axios.put("https://journal-app-xud3.onrender.com/notes", {newNotes})
        setNotes(newNotes)
    }

    return (
        <><div id="page-main" className="page-notes">
            <h1 id="title">Notes</h1>
            
                <ul>
                    <form>
                        <li><input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input></li>
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Add note</button>
                    </form>
                    {notes && notes.map((note, index) => {
                        return (
                            <div className="note" key={index}>
                                <button onClick={(e) => handleDeleteNote(e)}>x</button>
                                <li key={index}>{note}</li>
                            </div>
                            
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Notes
