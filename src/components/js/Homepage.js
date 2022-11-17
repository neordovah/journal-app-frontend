import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";


const Homepage = () => {

    const [quote, setQuote] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:3001/").then(result => {
            console.log(result.data[0].q)
            setQuote(result.data[0].q)
        })
    }, [])
    

    return (

        <div id="page">
            <div id="quote">
                { quote ? <h1>{quote}</h1> : <h1>loading...</h1> }
            </div>
        </div>

    )
}

export default Homepage