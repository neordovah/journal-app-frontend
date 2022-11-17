import React, { useState } from "react";
import {  Link } from "react-router-dom";
import "../scss/login.scss"

const Login = () => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    
    const handleLogin = (e) => {
        e.preventDefault()
    }

    return (
        <div id="page-login">
            <form>
                <label>Username
                <input type="text" name="username" autoComplete="off" onChange={(e) => setUsername(e.target.value)} /></label>
                <label>Password
                <input type="text" name="username" autoComplete="off" onChange={(e) => setUsername(e.target.value)} /></label>
                <button type="submit" onClick={(e) => handleLogin(e)}>Login</button>
                <Link to="/register">
                    <p>Don't have an account? Register</p>
                </Link>
            </form>
        </div>
    )
}

export default Login