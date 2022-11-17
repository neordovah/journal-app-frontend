import React, {useContext} from "react";
import {  Link } from "react-router-dom";
import "../scss/header.scss"
import Context from "./Context";

const Header = () => {

    let [login, setLogin] = useContext(Context)

    return (
        <header id="header">
            <ul>
                <Link to="/">
                    <li id="homepage-btn">Journal</li>
                </Link>
                <Link to="/login">
                    <li id="login-btn" onClick={() => setLogin(!login)}>{login ? "Logout" : "Login"}</li>
                </Link>
            </ul>
        </header>
    )
}

export default Header