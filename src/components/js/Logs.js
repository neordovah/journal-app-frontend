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
        await axios.get("http://localhost:3001/logs").then(result => {
            setLogs(result.data)
            //console.log(result.data, logs)
            if(logs == false) {
                setMessage("empty...")
            } else {
                setMessage(null)
            }
        })
    }
     
    //console.log(logs)

    useEffect(() => {
        getLogs()
        
    }, [])
    //console.log(message)
    return (
        <div id="page-logs">
            {logs == false && <h1>{message}</h1>}
            {(logs != false) && logs.map((log, index) => {
                return (
                    <div id="log">
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