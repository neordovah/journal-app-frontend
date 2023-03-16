import React, { useState, useEffect } from "react";
import "../scss/habit-tracker.scss"
import axios from "axios";


const HabitTracker = () => {

    const [habits, setHabits] = useState([])
    const [input, setInput] = useState(null)

    const date = new Date()
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    

    const getHabits = () => {
        axios.get("https://journal-app-xud3.onrender.com/habits").then(result => {
            setHabits(result.data)
        })
    }

    useEffect(() => {
        getHabits()
    }, [])

    const handleDeleteHabit = (e) => {
        let delete_index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement) - 2
        let newHabits = habits.filter((habit, index) => {
            if(index !== delete_index) {
                return habit
            }
        })
        setHabits(newHabits)
        axios.put("https://journal-app-xud3.onrender.com/habits", {newHabits}) 
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(input) {
            let newHabits = habits

            let monthArray = []
            for(let i = 0; i < daysInMonth; i++) {
                monthArray.push(false)
            }
            newHabits.push({title: input, days: monthArray})
            setHabits([...newHabits])
            console.log(newHabits)
            axios.put("https://journal-app-xud3.onrender.com/habits", {newHabits})
        }
    }

    const handleChangeDay = (e) => {
        let change_index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement) - 2
        let habit_index = Array.from(e.target.parentElement.parentElement.parentElement.children).indexOf(e.target.parentElement.parentElement) - 2
        let newHabits = habits
        newHabits[habit_index].days[change_index] = !newHabits[habit_index].days[change_index]
        setHabits([...newHabits])
        axios.put("https://journal-app-xud3.onrender.com/habits", {newHabits})
    }


    return (
        <div id="page-main" className="page-habit">
            <h1 id="title">Habit tracker</h1>
            <form>
                <input type="text" onChange={(e) => setInput(e.target.value)}></input>
                <button type="submit" onClick={(e) => handleSubmit(e)}>Add habit</button>
            </form>
            {habits?.map((habit, index) => {
                return (
                    <div id="habit" key={index}>
                        <button onClick={(e) => handleDeleteHabit(e)}>x</button>
                        <h1 id="habit-title">{habit.title}</h1>
                        {habit.days.map((day, index) => {
                            return (
                                <button key={index+1} className={day ? "track-day clicked" : "track-day not-clicked"} onClick={(e) => handleChangeDay(e)}>
                                    <p>{index+1}</p>
                                </button>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default HabitTracker;
