import "./style.css"
import {Engine} from "./engine.ts";
import {MilkyWayFactory} from "./milkyway.factory.ts";

const projectFactory = new MilkyWayFactory();
const engine = new Engine(projectFactory);
engine.start();

