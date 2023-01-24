import "./style.css";
import { useState } from 'react';

export async function deleteThing(props) {
    console.log(props.target.id)
    try {
        await fetch('http://145.24.222.202:8000/people/' + props.target.id, {
            method: "DELETE",
        });
        document.window = "/";
    } catch (error) {
        console.log(error);
    }
}

export function APIDelete(props) {
    const [people, setPeople] = useState(null)

    fetch('http://145.24.222.202:8000/people/' + props.id)
        .then(response => response.json())
        .then(data => setPeople(data))
        .catch(error => console.error(error))

    let button = null

    if (people !== null) {
        button = <button className={"delete-button"} id={people._id} onClick={deleteThing}>Verwijder</button>
    }
    return (
            button
    )
}

