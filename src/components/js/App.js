import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header"
import Login from "./Login";
import Homepage from "./Homepage"
import Navbar from "./Navbar";
import Footer from "./Footer"
import Context from "./Context";
import Notes from "./Notes";


const App = () => {
    const [login, setLogin] = useState(true)

    return (
        <>
        <Context.Provider value={[login, setLogin]}>
            <Header />
            <div id="wrapper">
                {login && <Navbar />}
                <Footer />
                <div id="page">
                    <Routes>
                        <Route exact path="/" element={login ? <Homepage /> : <Navigate to="/login" />}></Route>
                        <Route path="/login" element={login ? <Navigate to="/" /> : <Login />}></Route>
                        <Route path="/daily/todo" element={login ? <Notes /> : <Navigate to="/login" />}></Route>
                        <Route path="/daily/logs" element={login ? <Notes /> : <Navigate to="/login" />}></Route>
                        <Route path="/habit-tracker" element={login ? <Notes /> : <Navigate to="/login" />}></Route>
                        <Route path="/notes" element={login ? <Notes /> : <Navigate to="/login" />}></Route>
                        <Route path="/events" element={login ? <Notes /> : <Navigate to="/login" />}></Route>
                        <Route path="/logs" element={login ? <Notes /> : <Navigate to="/login" />}></Route>
                    </Routes>
                </div>
            </div>
        </Context.Provider>
        </>
    )
}

export default App