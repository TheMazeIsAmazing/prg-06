import "./style.css";
import {useState} from "react";

export function About(props) {
    const [count, setCount] = useState(0);
    const handleClick = () => {
        setCount(count + 1)
    }
    return (<div className="About"><h4>About {props.name}</h4><p className={ count > 10 && "epic"}>Zoveel Likes: {count}</p>
        <button onClick={handleClick}>Like</button>
    </div>);
}