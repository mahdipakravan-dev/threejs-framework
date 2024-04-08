import * as THREE from "three";
import {Pane} from "tweakpane";
import {Pane as PaneType} from "tweakpane/dist/types/pane/pane";
import {LoaderFactory} from "./utils/loader.factory.ts";
import {InputController} from "./utils/input-controller.ts";
import {gameState} from "./store/game-store.ts";

const Clock = new THREE.Clock();

export class Engine {
    public scene: THREE.Scene;
    public renderer: THREE.WebGLRenderer;
    public canvas: HTMLElement;
    public pane: PaneType
    public engineFactory: EngineFactory;
    public loaderFactory: LoaderFactory

    constructor(engineFactory : EngineFactory) {
        this.scene = new THREE.Scene();
        this.canvas = document.getElementById("threejs")!;
        this.renderer = new THREE.WebGLRenderer({ canvas : this.canvas, antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.pane = new Pane();
        this.engineFactory = engineFactory
        this.loaderFactory = new LoaderFactory();
        new InputController();
    }

    public async init() {
        this.setup();
        this.bindEvents();

        await this.engineFactory.createMaterials(this)
        await this.engineFactory.createMeshes(this)
        await this.engineFactory.addLights(this)

        gameState.subscribe(async ({physic_loading , character_loading}) => {
            if(!physic_loading && !character_loading) {
                await this.engineFactory.init(this)
                this.start()
            }
        })

    }

    start() {
        return requestAnimationFrame(() => {
            this.engineFactory.animate(this , Clock.getDelta())
            this.start.bind(this)();
        });
    }
    private setup(): void {
        this.renderer.setSize(window.innerWidth, window.innerHeight );
        document.body.appendChild(this.renderer.domElement);
    }

    private bindEvents(): void {
        // window.addEventListener('resize', () => handleResize(this.camera , this.renderer));
    }
}
export abstract class EngineFactory {

    abstract init(engine : Engine): void | Promise<void>

    abstract createMeshes(engine : Engine): void | Promise<void>

    abstract createMaterials(engine : Engine): void | Promise<void>

    abstract addLights(engine : Engine) :void | Promise<void>

    abstract animate(engine : Engine , delta : number): void | Promise<void>
}
