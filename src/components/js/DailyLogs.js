import React, { useEffect, useState, useContext } from "react";
import "../scss/daily-logs.scss"
import axios from "axios";
import Context from "./Context";

const DailyLogs = () => {

    let [login, setLogin, user, setUser] = useContext(Context)

    const [dailyLogs, setDailyLogs] = useState(null)
    const [dailyRating, setDailyRating] = useState(50)
    const [dailyHappy, setDailyHappy] = useState([null, null, null])
    const [dailyJournal, setDailyJournal] = useState(null)
    const [dailyDate, setDailyDate] = useState(null)
    const [alert, setAlert] = useState(false)

    //const [dailyLogsDB, setDailyLogsDB] = useState(null)

    const getDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;
        return formattedToday
    }

    const getDailyLogs = async (callback) => {
        
        await axios.get("http://localhost:3001/dailyLogs").then(result => {
            //console.log(result.data[0].dailyLogs)
            if(!result.data) {
                return
            }
            else if(result.data) {
                let dailyLogsDB = (result.data.dailyLogs[0])
                console.log(dailyLogsDB)
                if(callback) { 
                    let date = getDate()
                    setDailyDate(date)
                    if(dailyLogsDB) {
                       // console.log(dailyLogsDB)
                        //console.log(date, dailyLogsDB.date)
                        if(date === dailyLogsDB.date) {
                            setDailyLogs(dailyLogsDB)
                            setDailyRating(dailyLogsDB.rating)
                            setDailyHappy([...dailyLogsDB.happy])
                            setDailyJournal(dailyLogsDB.journal)
                        }
                    }
                }
            }
        }) 
    }

    useEffect(() => {
        getDailyLogs(true)        
    }, [])

    useEffect(() => {
        setDailyLogs({rating: dailyRating, happy: dailyHappy, journal: dailyJournal, date: dailyDate})
    }, [dailyRating, dailyHappy, dailyJournal]) 

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(dailyHappy[0] && dailyHappy[1] && dailyHappy[2] && dailyJournal) {
            axios.put("http://localhost:3001/dailyLogs", {dailyLogs})
            axios.put("http://localhost:3001/logs", {dailyLogs})
            setAlert({state: true, msg: "Submitted successfuly!"})
            setTimeout(() => {
                setAlert(false)
            }, 3000)
        }
        else {
            setAlert({state: true, msg: "All fields must be provided!"})
            setTimeout(() => {
                setAlert(false)
            }, 3000)
        }
    }

    const handleHappyArray = (e, index) => {
        let newArray = dailyHappy
        newArray[index] = e.target.value
        setDailyHappy([...newArray])
    }    


    return (
        <div id="page-main" className="page-daily-logs">
            <h1 id="title">Daily logs</h1>
            <form>
                <p>How would you rate this day?</p>
                <input type="range" value={dailyRating} onChange={(e) => 
                    {setDailyRating(e.target.value)
                    e.target.value = dailyRating}}></input>
                <p>Write three things that made you happy today:</p>
                <ul>
                    <li><input type="text" value={dailyHappy[0]} onChange={(e) => {
                        handleHappyArray(e, 0)
                    }}></input></li>
                    <li><input type="text" value={dailyHappy[1]} onChange={(e) => {
                        handleHappyArray(e, 1)
                        
                        }}></input></li>
                    <li><input type="text" value={dailyHappy[2]} onChange={(e) => {
                        handleHappyArray(e, 2)
                
                        }}></input></li>
                </ul>
                <p>Journal</p>
                <textarea value={dailyJournal} onChange={(e) => {
                    setDailyJournal(e.target.value)
                    e.target.value = dailyJournal
                    }}></textarea>
<div id="alert-submitted" className={alert.state ? "daily-visible" : "daily-hidden"}>
                <p id="alert-msg">{alert.state && alert.msg}</p>
            </div>
                <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>
            
        </div>
    )
}

export default DailyLogs