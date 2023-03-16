import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header"
import Login from "./Login";
import Homepage from "./Homepage"
import Navbar from "./Navbar";
import Footer from "./Footer"
import Context from "./Context";
import Notes from "./Notes";
import HabitTracker from "./Habit-tracker";
import Events from "./Events";
import DailyLogs from "./DailyLogs";
import DailyTodo from "./DailyTodo";
import Logs from "./Logs";
import Register from "./Register"


const App = () => {
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(null)
    const [width, setWidth] = useState(null)
    const [showNav, setShowNav] = useState(null)

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        let screenWidth = width
        if(screenWidth > 500) {
            setWidth(true)
            setShowNav(true)
        } else {
            setWidth(false)
            setShowNav(false)
        }
      }

      useEffect(() => {
        getWindowDimensions()
        window.addEventListener('resize', getWindowDimensions)
      }, [])
    return (
        <>
        <Context.Provider value={[login, setLogin, user, setUser, width, setWidth, showNav, setShowNav]}>
            <Header />
            <div id={login ? "wrapper" : "wrapper-login"}>
                {login && <Navbar />}
                <Footer />

                    <Routes>
                        <Route exact path="/" element={login ? <Homepage /> : <Navigate to="/login" />}></Route>
                        <Route path="/login" element={login ? <Navigate to="/" /> : <Login />}></Route>
//                         <Route path="/daily/todo" element={login ? <DailyTodo /> : <Navigate to="/login" />}></Route>
                        <Route path="/daily/logs" element={login ? <DailyLogs /> : <Navigate to="/login" />}></Route>
                        <Route path="/habit-tracker" element={login ? <HabitTracker /> : <Navigate to="/login" />}></Route>
                        <Route path="/notes" element={login ? <Notes /> : <Navigate to="/login" />}></Route>
                        <Route path="/events" element={login ? <Events /> : <Navigate to="/login" />}></Route>
                        <Route path="/logs" element={login ? <Logs /> : <Navigate to="/login" />}></Route>
                        <Route path="/register" element={login ? <Homepage /> : <Register />}></Route>
                    </Routes>

            </div>
        </Context.Provider>
        </>
    )
}

export default App
