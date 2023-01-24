import "./style.css";
import {useState} from "react";

export function Pokedex() {
    const [inputValue, setInputValue] = useState("");
    const onChangeHandler = (event) => {
        setInputValue(event.target.value);
    };
    return (<div className="Pokedex"><input type="text" onChange={onChangeHandler} value={inputValue}/></div>);
}