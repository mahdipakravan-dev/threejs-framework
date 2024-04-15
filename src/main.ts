import "./styles/style.css"
import {Engine} from "./engine.ts";
import {DropsFactory} from "./projects/drops/drops.factory.ts";
import {gameState} from "./store/game-store.ts";
import {animationState, SCENES} from "./store/animation-state.ts";


const projectFactory = new DropsFactory();
const engine = new Engine(projectFactory);

setTimeout(() => {
    animationState.setState({
        scene : SCENES.Gaming
    })
} , 4000)

gameState.subscribe(state => {
    if(!state.physic_loading) engine.init()
})


