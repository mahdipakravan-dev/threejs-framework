import * as THREE from "three";
import {OrbitControls} from 'three-orbitcontrols-ts';
import {Pane} from "tweakpane";
import {Pane as PaneType} from "tweakpane/dist/types/pane/pane";
import {handleResize} from "./listeners/resize.ts";
import {LoaderFactory} from "./utils/loader.factory.ts";
import {InputController} from "./utils/input-controller.ts";

export class Engine {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;
    public canvas: HTMLElement;
    public control: OrbitControls;
    public pane: PaneType
    public engineFactory: EngineFactory;
    public loaderFactory: LoaderFactory

    constructor(engineFactory : EngineFactory) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight , 2 , 5000);
        // this.camera.position.set(30,100,-100)
        this.camera.position.y += 10
        this.camera.position.x += 40
        this.camera.position.z = -100
        this.canvas = document.getElementById("threejs")!;
        this.renderer = new THREE.WebGLRenderer({ canvas : this.canvas, antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.control = new OrbitControls(this.camera , this.renderer.domElement);
        this.control.enableDamping = true
        this.control.enableRotate = true
        this.control.enablePan = true
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
    }

    start() {
        return requestAnimationFrame(() => {
            this.control.update();
            this.engineFactory.animate(this)
            this.renderer.render(this.scene, this.camera);

            this.start.bind(this)();
        });
    }
    private setup(): void {
        this.camera.position.z = 5;

        this.renderer.setSize(window.innerWidth, window.innerHeight );
        document.body.appendChild(this.renderer.domElement);
    }

    private bindEvents(): void {
        window.addEventListener('resize', () => handleResize(this.camera , this.renderer));
    }
}
export abstract class EngineFactory {

    abstract createMeshes(engine : Engine): void | Promise<void>

    abstract createMaterials(engine : Engine): void | Promise<void>

    abstract addLights(engine : Engine) :void | Promise<void>

    abstract animate(engine : Engine): void | Promise<void>
}
