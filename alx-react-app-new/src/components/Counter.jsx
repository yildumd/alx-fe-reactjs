import { useState } from "react"

export default function Counter(){

    const [count, setCount] = useState(0)

    function handleClick(action) {
        switch (action) {
            case "increment":
                setCount(count + 1)
                break
            case "decrement":
                setCount(count - 1)
                break
            case "reset":
                setCount(0)
                break
            default:
                break
        }
    }

    return(
        <div
        style = {{
            margin: "2rem"
        }}>
            <p>Current count: { count }</p>
            <button onClick = {() => handleClick("increment")}>Increment {"(+)"}</button>
            <button onClick = {() => handleClick("reset")}>Reset {"0"}</button>
            <button onClick = {() => handleClick("decrement")}>Decrement {"(-)"}</button>
        </div>
    )
}