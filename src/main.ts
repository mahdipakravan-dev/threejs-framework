import "./style.css"
import {Engine} from "./engine.ts";
import {ObjectFactory} from "./object.factory.ts";
import {gameState} from "./store/game-store.ts";

console.log(gameState.getState());

const projectFactory = new ObjectFactory();
const engine = new Engine(projectFactory);
engine.init().then(() => {
    engine.start();
})

