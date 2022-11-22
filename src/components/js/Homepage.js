import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../scss/homepage.scss"


const Homepage = () => {

    const [quote, setQuote] = useState(null)
    const [author, setAuthor] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:3001/quote").then(result => {
            setQuote(result.data[0].q)
            setAuthor(result.data[0].a)
        })
    }, [])
    

    return (

        <div id="page">
            <div id="quote">
                { quote ? <h1>{quote}</h1> : <h1>loading...</h1> }
                { author ? <h1 id="home-author">-{author}</h1> : "" }
            </div>
        </div>

    )
}

export default Homepage