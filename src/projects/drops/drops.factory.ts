import * as THREE from "three";
import {Engine, EngineFactory} from "../../engine.ts";
import {BackgroundStreet} from "../../textures/background-street.ts";
import {Physic} from "../../utils/physic.ts";
import {EarthMaterial} from "../../textures/earth.ts";
import {Character} from "./character.ts";
import {gameState} from "../../store/game-store.ts";
import {DropsCamera} from "./camera.ts";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader().setPath("models");

export class DropsFactory extends EngineFactory {
    public physic : Physic;
    public character ?: Character;
    public camera ?: DropsCamera

    constructor() {
        super();
        this.physic = new Physic();

        gltfLoader.load('/character/character.glb' , (loaded) => {
            Character._obj = loaded
            gameState.setState({character_loading : false})
        } , (progress) => {
            console.log("progress",progress)
        })
    }

    init() {
        this.character = new Character(this.physic)
        this.camera = new DropsCamera(this.character)
    }

    async createMeshes(engine){
        try {
            this.camera?.init(engine)
            const groundMesh = new THREE.Mesh(
                new THREE.BoxGeometry(10,1,10),
                new THREE.MeshStandardMaterial({color : "#8a8a8a"}),
            )
            groundMesh.position.y = -4.5;
            groundMesh.scale.x += 8
            groundMesh.scale.z += 8
            const stairOne = new THREE.Mesh(
                new THREE.BoxGeometry(60 , 4 , 10),
                new THREE.MeshStandardMaterial({color : "#4f4f1c"})
            )
            const stairTwo = new THREE.Mesh(
                new THREE.BoxGeometry(60 , 2 , 10),
                new THREE.MeshStandardMaterial({color : "#4f4f1c"})
            )
            const stairThree = new THREE.Mesh(
                new THREE.BoxGeometry(60 , 1 , 10),
                new THREE.MeshStandardMaterial({color : "#4f4f1c"})
            )
            stairOne.position.set(-4,-2,20)
            stairTwo.position.set(-4,-3,10)
            stairThree.position.set(-4,-4,0)
            this.physic.addPhysicalRigid(groundMesh , "fixed" , "cuboid");
            this.physic.addPhysicalRigid(stairOne , "fixed" , "cuboid");
            this.physic.addPhysicalRigid(stairTwo , "fixed" , "cuboid");
            this.physic.addPhysicalRigid(stairThree , "fixed" , "cuboid");
            engine.scene.add(groundMesh)
            engine.scene.add(stairOne , stairTwo , stairThree)

            for(let i=0 ; i <= 100; i++) {
                const sphereMesh = new THREE.Mesh(
                    new THREE.BoxGeometry(2,2),
                    EarthMaterial._obj
                )
                sphereMesh.position.set(
                    (Math.random() - 0.5) * 10,
                    (Math.random() + 5) * 10,
                    (Math.random() - 0.5) * 10
                )
                sphereMesh.scale.set(
                    Math.random() + 0.5,
                    Math.random() + 0.5,
                    Math.random() + 0.5,
                )
                sphereMesh.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                )
                engine.scene.add(sphereMesh)
                this.physic.addPhysicalRigid(sphereMesh , "dynamic" , "cuboid")
            }

            this.character?.createMesh(engine)
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
        const ambientLight = new THREE.AmbientLight(0xffffff , 1);
        engine.scene.add(ambientLight);
    }
    animate(engine : Engine) {
        this.physic.loop();
        this.character?.loop();
        this.camera?.loop(engine)
    }
}