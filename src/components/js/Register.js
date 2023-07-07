import React, { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../scss/register.scss"



const Register = () => {

    const [name, setName] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confPassword, setConfPassword] = useState(null)
    const [alert, setAlert] = useState({state: false, msg: ""})

    let navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        
        
        setAlert({state: true, msg: "Connecting to db..."})
                setAlert(false)
        
        if (!name || !username || !password) {
            setAlert({state: true, msg: "All values must be provided!"})
            setTimeout(() => {
                setAlert(false)
              }, 3000)
              return
        }
        else if (password !== confPassword) {
            setAlert({state: true, msg: "Passwords don't match!"})
            setTimeout(() => {
                setAlert(false)
            }, 3000)
            return
        }
        else if(name && username && password) {
            const asyncFunction = async () => {
                let alreadyExists = 0
                await axios.get("https://journal-app-xud3.onrender.com/users").then(result => {
                    result.data.map((user) => {
                        if(user.username === username) {
                            setAlert({state: true, msg: "This username already exists!"})
                            setTimeout(() => {
                                setAlert(false)
                            }, 3000)
                            alreadyExists = 1
                        }
                    })
                })
                if(alreadyExists === 1 ) return
                await axios.post("https://journal-app-xud3.onrender.com/register", {name, username, password})
                setAlert({state: true, msg: "Account created!"})
                setTimeout(() => {
                    setAlert(false)
                    navigate(`/login`)
                }, 3000)
            }
            asyncFunction()
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
                <input type="password" name="password" autoComplete="off" onChange={(e) => setPassword(e.target.value)} /></label>
                <label>Confirm password
                <input type="password" name="conf-password" autoComplete="off" onChange={(e) => setConfPassword(e.target.value)} /></label>
                <button type="submit" onClick={(e) => handleRegister(e)}>Register</button>
                <Link to="/login">
                    <p>Back to login</p>
                </Link>
            </form>
        </div>
    )
}

export default Register
