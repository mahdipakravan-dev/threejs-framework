import "./styles/style.css"
import {Engine} from "./engine.ts";
import {DropsFactory} from "./projects/drops/drops.factory.ts";
import {gameState} from "./store/game-store.ts";


const projectFactory = new DropsFactory();
const engine = new Engine(projectFactory);

gameState.subscribe(state => {
    if(!state.physic_loading) engine.init().then(() => {
        engine.start()
    })
})


