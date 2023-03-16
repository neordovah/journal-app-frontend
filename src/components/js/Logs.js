import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import "../scss/logs.scss"
import Context from "./Context";


const Logs = () => {

    const [logs, setLogs] = useState([])
    let [login, setLogin, user, setUser] = useContext(Context)
    let [message, setMessage] = useState(null)

    const getLogs = async () => {
        //setMessage("loading...")
        await axios.get("https://journal-app-xud3.onrender.com/logs").then(result => {
            setLogs(result.data)
            if(logs == false) {
                setMessage("empty...")
            } else {
                setMessage(null)
            }
        })
    }

    useEffect(() => {
        getLogs()
        
    }, [])

    
    return (
        <div id="page-main" className="page-logs">
            <h1 id="title">Logs</h1>
            {logs == false && <h1>{message}</h1>}
            {(logs != false) && logs.reverse().map((log, index) => {
                return (
                    <div id="log" key={index}>
                        <h1 id="log-date">{log.date}</h1>
                        <p>Rating for this day was: {log.rating}%</p>
                        <p>Three things that made you happy this day:</p>
                        <ul>
                            {log.happy?.map((element) => {
                                return (
                                    <li>{element}</li>
                                )
                            })}
                        </ul>
                        <p>{log.journal}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Logs

/*

            */
