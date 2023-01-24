import { useState } from 'react';

export function APICreateForm(props) {
    const [valueFirstName, setValueFirstName] = useState('');
    const [valueLastName, setValueLastName] = useState('');
    const [valueAge, setValueAge] = useState('');

    function handleChangeFirstName(event) {
        setValueFirstName(event.target.value);
    }

    function handleChangeLastName(event) {
        setValueLastName(event.target.value);
    }

    function handleChangeAge(event) {
        setValueAge(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (props.name === 'put') {
            let data = new URLSearchParams();
            data.append("firstName", valueFirstName);
            data.append("lastName", valueLastName);
            data.append("age", valueAge);

            return await fetch(`http://145.24.222.202:8000/people/`+ props.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data,
            });
        } else if (props.name === 'post') {

            let data = new URLSearchParams();
            data.append("firstName", valueFirstName);
            data.append("lastName", valueLastName);
            data.append("age", valueAge);

            return await fetch(`http://145.24.222.202:8000/people/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data,
            });
        }
    }

    return (
        <form className={"epic-form"} onSubmit={handleSubmit}>
            <label>
                Voornaam:
                <input type="text" value={valueFirstName} onChange={handleChangeFirstName} />
            </label>
            <label>
                Achternaam:
                <input type="text" value={valueLastName} onChange={handleChangeLastName} />
            </label>
            <label>
                Leeftijd:
                <input type="text" value={valueAge} onChange={handleChangeAge} />
            </label>
            <input className={"back-button"} type="submit" value="Versturen" />
        </form>
    );
}