import React, { useState } from "react";
import "../scss/notes.scss"


const Notes = () => {

    const [notes, setNotes] = useState(["a", 2])

    return (
        <>
            <h1 id="title">Notes</h1>
            <div id="page-main" className="page-notes">
                <ul>
                    <form>
                        <li><input type="text"></input></li>
                        <button type="submit">Add note</button>
                    </form>
                    {notes && notes.map(note => {
                        return (
                            <li>{note}</li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Notes