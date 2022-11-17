import React, { useState } from "react";
import "../scss/habit-tracker.scss"


const HabitTracker = () => {

    const [habits, setHabits] = useState([2, 3, "a"])

    const date = new Date()
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    console.log(daysInMonth)
    let monthArray = []
    for(let i = 0; i < daysInMonth; i++) {
        monthArray.push("")
    }


    return (
        <div id="page-main" className="page-habit">
            <form>
                <input type="text"></input>
                <button type="submit">Add habit</button>
            </form>
            {habits.map(habit => {
                return (
                    <div id="habit">
                        <p>habit title</p>
                        {monthArray.map((day, index) => {
                            return (
                                <div className="track-day" key={index+1}>
                                    <p>{index+1}</p>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default HabitTracker;