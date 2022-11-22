import React, {useContext, useState, useEffect} from "react";
import {  Link } from "react-router-dom";
import "../scss/header.scss"
import Context from "./Context";

const Header = () => {

    let [login, setLogin, user, setUser, width, setWidth, showNav, setShowNav] = useContext(Context)
   // const [showNav, setShowNav] = useState(null)
    
    
    useEffect(()=> {
        setShowNav(width)
        console.log(width)
    }, [])

    console.log(showNav, width)

    const handleLogin = () => {
        if(login === true) {
            setLogin(false)
        }
    }

    return (
        <header id="header">
            <ul>
                <Link to="/">
                    <li id="homepage-btn">Journal</li>
                </Link>
                <Link to="/login">
                    <li id="login-btn" onClick={() => handleLogin()}>{login ? "Logout" : "Login"}</li>
                </Link>
                <button id="show-nav" className={(width)? "hidden" : "visible"} onClick={() => setShowNav(!showNav)}>O</button>
            </ul>
        </header>
    )
}

export default Header