import React, { useState, useContext } from "react";
import {  Link, useNavigate } from "react-router-dom";
import "../scss/login.scss"
import axios from "axios";
import Context from "./Context";

const Login = () => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [alert, setAlert] = useState({state: false, msg: ""})

    let [login, setLogin, user] = useContext(Context)

    let navigate = useNavigate()
    
    const handleLogin = (e) => {
        e.preventDefault()
        if( username && password) {
            axios.post("http://localhost:3001/login", {username, password}).then(result => {
            console.log(result)
                if(result.data !== "error") {
                    user = result
                    setLogin(true)
                    setAlert(false)
                    navigate(`/`)
                }
            })

        } 
    }

    return (
        <div id="page-login">
            <form>
                <div id="alert" className={alert.state ? "alert-visible" : "alert-hidden"}>{alert.msg}</div>    
                <label>Username
                <input type="text" name="username" autoComplete="off" onChange={(e) => setUsername(e.target.value)} /></label>
                <label>Password
                <input type="text" name="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} /></label>
                <button type="submit" onClick={(e) => handleLogin(e)}>Login</button>
                <Link to="/register">
                    <p>Don't have an account? Register</p>
                </Link>
            </form>
        </div>
    )
}

export default Login