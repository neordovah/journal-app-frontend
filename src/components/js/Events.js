import React, { useState } from "react";
import "../scss/events.scss"

const Events = () => {

    const date = new Date()
    const [month, setMonth] = useState(date.getMonth() + 1)
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

    let monthArray = []
    for(let i = 0; i < daysInMonth; i++) {
        monthArray.push("")
    }

    const handleChangeMonth = (index) => {
        if((month + index > 12) || (month + index < 1)) return
        setMonth(month + index)
    }

    return (
        <div id="events">
            <div id="events-top">
                <h1>{date.getFullYear()}</h1>
                <span id="select-month">
                    <button onClick={() => handleChangeMonth(-1)}>left</button>
                    <p>{month}</p>
                    <button onClick={() => handleChangeMonth(+1)}>right</button>
                </span>
            </div>
            <div id="events-bottom">
                {monthArray.map((day, index) => {
                    return (
                        <div className="track-day" key={index+1}>
                            <p>{index+1}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Events