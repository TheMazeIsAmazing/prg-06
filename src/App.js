import { APIPull } from "./APIPull";
import { APIDetails } from "./APIDetails";
import { APIDelete } from "./APIDelete";
import { APICreateForm } from "./APICreateForm";

import "./style.css";

let params = new URLSearchParams(location.search);
let id = null;
if (params.get('id')) {
    id = params.get('id')
}

export default function App() {
    if (id) {
        return (
            <div className="App">
                <h1>Één Mens met id: {id}</h1>
                <p>Een geavanceerd detailoverzicht</p>
                <a className={"back-button"} href={"/"}>Terug naar alles</a>
                <APIDelete id={id}></APIDelete>
                <APIDetails id={id}></APIDetails>
                <h2>Verander informatie van dit mens</h2>
                <APICreateForm id={id} name={"put"}></APICreateForm>
            </div>
        );
    } else {
        return (
            <div className="App">
                <h1>Meerdere Mensen</h1>
                <p>Het meest coole overzicht</p>
                <APIPull></APIPull>
                <h2>Nieuw Mens</h2>
                <APICreateForm name={"post"}></APICreateForm>
            </div>
        );
    }

}