import React, { useState } from "react";
import {  Link } from "react-router-dom";
import "../scss/header.scss"

const Register = () => {

    const [name, setName] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const handleLogin = (e) => {
        e.preventDefault()
    }

    return (
        <div id="page-login">
            <form>
            <label>Name
                <input type="text" name="name" autoComplete="off" onChange={(e) => setName(e.target.value)} /></label>
                <label>Username
                <input type="text" name="username" autoComplete="off" onChange={(e) => setUsername(e.target.value)} /></label>
                <label>Password
                <input type="text" name="username" autoComplete="off" onChange={(e) => setUsername(e.target.value)} /></label>
                <button type="submit" onClick={(e) => handleLogin(e)}>Register</button>
                <Link to="/login">
                    <p>Back to login</p>
                </Link>
            </form>
        </div>
    )
}

export default Register