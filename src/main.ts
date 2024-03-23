import "./style.css"
import {Engine} from "./engine.ts";
import {ObjectFactory} from "./object.factory.ts";


const projectFactory = new ObjectFactory();
const engine = new Engine(projectFactory);
engine.init().then(() => {
    engine.start();
})

