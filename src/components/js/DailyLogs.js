import React, { useState } from "react";
import "../scss/daily-logs.scss"

const DailyLogs = () => {

    return (
        <div id="page-main" className="page-daily-logs">
            <form>
                <p>How would you rate this day from 1 to 5?</p>
                <input type="number"></input>
                <p>What made you happy today?</p>
                <input type="text"></input>
                <p>Journal</p>
                <input type="text"></input>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default DailyLogs