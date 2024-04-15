import * as THREE from "three";
import {Engine, EngineFactory} from "../../engine.ts";
import {BackgroundStreet} from "../../textures/background-street.ts";
import {Physic} from "../../utils/physic.ts";
import {EarthMaterial} from "../../textures/earth.ts";
import {Character} from "./character.ts";
import {gameState} from "../../store/game-store.ts";
import {DropsCamera} from "./camera.ts";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {Enviournment} from "./enviournment.ts";

const gltfLoader = new GLTFLoader().setPath("models");

export class DropsFactory extends EngineFactory {
    public physic : Physic;
    public character ?: Character;
    public camera ?: DropsCamera
    public enviournment ?: Enviournment;

    constructor() {
        super();
        this.physic = new Physic();

        gltfLoader.load("/area/area.glb" , (loaded) => {
            console.log('Area Loaded ' , loaded)
            Enviournment._obj = loaded
        })
        gltfLoader.load('/character/character.glb' , (loaded) => {
                Character._obj = loaded
                gameState.setState({character_loading : false})
            } ,
            () => {}
        )
    }

    init() {
        this.character = new Character(this.physic)
        this.enviournment = new Enviournment(this.physic)
        this.camera = new DropsCamera(this.character)
        console.log('INIT ' , this.enviournment)
    }

    async createMeshes(engine){
        console.log('CreateMeshes ' , this.enviournment)
        try {
            this.camera?.init(engine)
            this.character?.createMesh(engine)
            this.enviournment?.createMesh(engine)
        } catch (e) {
            console.error('CRASHED ' , e)
        }
    }
    createMaterials(engine) {
        new BackgroundStreet();
        new EarthMaterial()

        engine.scene.background = BackgroundStreet._obj
        engine.scene.environment = BackgroundStreet._obj
    }
    addLights(engine) {
        const directLight = new THREE.DirectionalLight(0xffffff , 1);
        directLight.position.set(10,2,1);
        directLight.castShadow = true
        directLight.shadow.camera.top = 30
        directLight.shadow.camera.right = 30
        directLight.shadow.camera.left = -30
        directLight.shadow.camera.bottom = -30
        directLight.shadow.bias = -0.002
        directLight.shadow.normalBias = -0.011
        engine.scene.add(directLight);
    }
    animate(engine : Engine , delta : number) {
        this.physic.loop();
        this.character?.loop(delta);
        this.enviournment?.loop()
        this.camera?.loop(engine)
    }
}