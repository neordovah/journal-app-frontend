import React, {useContext} from "react";
import {  Link } from "react-router-dom";
import "../scss/header.scss"
import Context from "./Context";

const Header = () => {

    let [login, setLogin, user] = useContext(Context)

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
            </ul>
        </header>
    )
}

export default Header