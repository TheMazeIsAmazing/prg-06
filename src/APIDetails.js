import "./style.css";

import React, {useState, useEffect} from 'react';

export function APIDetails(props) {
    const [people, setPeople] = useState(null)
    const [isFetching, setIsFetching] = useState(true);

    fetch('http://145.24.222.202:8000/people/' + props.id)
        .then(response => response.json())
        .then(data => {
            setPeople(data);
            setIsFetching(false);
        })
        .catch(error => {
            console.error(error);
            setIsFetching(false);
        });

    useEffect(() => {
        if (!isFetching && people === null) {
            document.window = "/";
        }
    }, [people, isFetching]);

    let tableItems = []

    if (people !== null) {
        tableItems.push(
            <tr key={people._id}>
                <td>{people.firstName}</td>
                <td>{people.lastName}</td>
                <td>{people.age}</td>
            </tr>
        );
    } else {
        tableItems.push(
            <tr key={22}>
                <td colSpan={3}>Laden...</td>
            </tr>
        );
        tableItems.push(
            <tr key={23}>
                <td colSpan={3}>Zie je dit te lang? Kijk in de console voor de fout.</td>
            </tr>
        );
    }
    return (
        <table>
            <thead>
            <Columns/>
            </thead>
            <tbody>
            {tableItems}
            </tbody>
        </table>
    )
}

class Columns extends React.Component {
    render() {
        return (
            <>
                <tr>
                    <th>Voornaam</th>
                    <th>Achternaam</th>
                    <th>Leeftijd</th>
                </tr>
            </>
        );
    }
}