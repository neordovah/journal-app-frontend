import React, { useState } from "react";
import "../scss/notes.scss"


const Notes = () => {

    const [notes, setNotes] = useState(["a", 2])

    return (
        <><div id="page-main" className="page-notes">
            <h1 id="title">Notes</h1>
            
                <ul>
                    <form>
                        <li><input type="text"></input></li>
                        <button type="submit">Add note</button>
                    </form>
                    {notes && notes.map(note => {
                        return (
                            <li key={note}>{note}</li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Notes