import "./style.css";

import { useState } from 'react';

export function APIDetails(props) {
    const [people, setPeople] = useState(null)

    fetch('http://145.24.222.202:8000/people/' + props.id)
        .then(response => response.json())
        .then(data => setPeople(data))
        .catch(error => console.error(error))

    let listItems = []

    if (people !== null) {
        listItems.push(
            <tr key={people._id}>
                <td>{people.firstName}</td>
                <td>{people.lastName}</td>
                <td>{people.age}</td>
            </tr>);
    } else {
        listItems.push(
            <tr>
                <td colSpan={3}>Laden...</td>
            </tr>
        );
        listItems.push(
            <tr>
                <td colSpan={3}>Zie je dit te lang? Kijk in de console voor de fout.</td>
            </tr>
        );
    }
    return (
        <table>
            <thead>
            <tr>
                <th>Voornaam</th>
                <th>Achternaam</th>
                <th>Leeftijd</th>
            </tr>
            </thead>
            <tbody>
            {listItems}
            </tbody>
        </table>
    )
}