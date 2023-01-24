import { About } from "./About";
import { Pokedex } from "./Pokedex";
import { APIPull } from "./APIPull";
import { APIDetails } from "./APIDetails";

import "./style.css";

let params = new URLSearchParams(location.search);
let id = null;
if (params.get('id')) {
    console.log(params.get('id'));
    id = params.get('id')
}

export default function App() {
    if (id) {
        return (
            <div className="App">
                <h1>1 Mens</h1>
                <p>Een geavanceerd detailoverzicht</p>
                <a href={"/"}>Terug naar alles</a>
                <APIDetails id={id}></APIDetails>
            </div>
        );
    } else {
        return (
            <div className="App">
                <h1>Mensen</h1>
                <p>Het meest coole overzicht</p>
                {/*<About name="MIJ!"></About>*/}
                {/*<About name="HOI"></About>*/}
                {/*<Pokedex></Pokedex>*/}
                <APIPull></APIPull>
            </div>
        );
    }

}