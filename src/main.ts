import "./styles/style.css"
import {Engine} from "./engine.ts";
import {ObjectFactory} from "./object.factory.ts";
import {ObjectPhysic} from "./physics/object.physic.ts";


const projectFactory = new ObjectFactory();
const physicFactory = new ObjectPhysic();
const engine = new Engine(projectFactory , physicFactory);
engine.init().then(() => {
    engine.start();
})

