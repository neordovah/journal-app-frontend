import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../scss/navbar.scss"
import Context from "./Context";

const Navbar = () => {

    let [login, setLogin, user, setUser, width, setWidth, showNav, setShowNav] = useContext(Context)

    const [dailyExpand, setDailyExpand] = useState(false)


    return (
        <nav id="navbar" className={showNav ? "visible" : "hidden"}>
            <ul>
                <div id="daily" onMouseLeave={() => setDailyExpand(!dailyExpand)}>
                <Link>
                    <li id="daily-btn" onMouseEnter={() => setDailyExpand(!dailyExpand)} >Daily</li>
                </Link>
                <div id="daily-sub" className={dailyExpand ? "visible" : "hidden"}>
//                     <Link to="/daily/todo">
//                         <li id="daily-todo-btn">To Do</li>
//                     </Link>
                    <Link to="/daily/logs">
                        <li id="daily-logs-btn">Logs</li>
                    </Link>
                </div></div>
                <Link to="/habit-tracker/">
                    <li id="habit-tracker-btn">Habit tracker</li>
                </Link>
                <Link to="/notes">
                    <li id="notes-btn">Notes</li>
                </Link>
                
                <Link to="/logs">
                    <li id="logs-btn">Check logs</li>
                </Link>
            </ul>
        </nav>
    )
}
                /*<Link to="/events">
                    <li id="events-btn">Events</li>
                </Link>*/

export default Navbar
