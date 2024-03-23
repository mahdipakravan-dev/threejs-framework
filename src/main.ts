import "./style.css"
import {Engine} from "./engine.ts";
import {ObjectFactory} from "./object.factory.ts";
import {gameState} from "./store/game-store.ts";

gameState.subscribe(state => {
    console.log(state)
})

const projectFactory = new ObjectFactory();
const engine = new Engine(projectFactory);
engine.init().then(() => {
    engine.start();
})

