import React, { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../scss/register.scss"


const Register = () => {

    const [name, setName] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [alert, setAlert] = useState({state: false, msg: ""})

    let navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        if(name && username && password) {
            axios.post("http://localhost:3001/register", {name, username, password})
            setAlert({state: true, msg: "Account created!"})
            setTimeout(() => {
                setAlert(false)
                navigate(`/login`)
              }, 3000)
            
        } else {
            setAlert({state: true, msg: "All values must be provided!"})
            setTimeout(() => {
                setAlert(false)
              }, 3000)
        }
    }

    return (
        <div id="page-login">
            <form>
            <div id="alert" className={alert.state ? "alert-visible" : "alert-hidden"}>{alert.msg}</div>    
            <label>Name
                <input type="text" name="name" autoComplete="off" onChange={(e) => setName(e.target.value)} /></label>
                <label>Username
                <input type="text" name="username" autoComplete="off" onChange={(e) => setUsername(e.target.value)} /></label>
                <label>Password
                <input type="text" name="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} /></label>
                <button type="submit" onClick={(e) => handleRegister(e)}>Register</button>
                <Link to="/login">
                    <p>Back to login</p>
                </Link>
            </form>
        </div>
    )
}

export default Register