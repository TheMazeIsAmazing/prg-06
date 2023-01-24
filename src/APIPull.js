import "./style.css";

import { useState } from 'react';

export function APIPull() {
    const [people, setPeople] = useState(null)
    fetch('http://145.24.222.202:8000/people')
        .then(response => response.json())
        .then(data => setPeople(data))
        .catch(error => console.error(error))
    let listItems = []
    let currentID = 1;
    if (people !== null) {
        people.items.forEach(function (item) {
            listItems.push(
                <tr key={item._id}>
                    <td>{currentID}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.age}</td>
                    <td><a href={"/?id=" + item._id}>Link</a></td>
                </tr>);
            currentID++
        });
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Voornaam</th>
                    <th>Achternaam</th>
                    <th>Leeftijd</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
        </table>
    )
}