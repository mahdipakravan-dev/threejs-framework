import * as THREE from "three";
import {EngineFactory} from "./engine.ts";
import {BackgroundStreet} from "./textures/background-street.ts";
import {Physic} from "./utils/physic.ts";

export class DropsFactory extends EngineFactory {
    public physic : Physic;

    constructor() {
        super();
        this.physic = new Physic();
    }

    async createMeshes(engine){
        try {
            const groundMesh = new THREE.Mesh(
                new THREE.BoxGeometry(10,1,10),
                new THREE.MeshStandardMaterial({color : "#8a8a8a"}),
            )
            groundMesh.position.y -= 10;
            this.physic.addPhysicalRigid(groundMesh , "fixed" , "cuboid");
            engine.scene.add(groundMesh)

            const cubeMesh = new THREE.Mesh(
                new THREE.BoxGeometry(1,1,1),
                new THREE.MeshBasicMaterial({color : "blue"})
            )
            const cubeMesh2 = new THREE.Mesh(
                new THREE.BoxGeometry(1,1,1),
                new THREE.MeshBasicMaterial({color : "red"})
            )
            cubeMesh2.position.x += 3
            engine.scene.add(cubeMesh , cubeMesh2)
            this.physic.addPhysicalRigid(cubeMesh , "dynamic" , "cuboid")
            this.physic.addPhysicalRigid(cubeMesh2 , "dynamic" , "cuboid")
        } catch (e) {
            console.error('CRASHED ' , e)
        }
    }
    createMaterials(engine) {
        new BackgroundStreet();

        engine.scene.background = BackgroundStreet._obj
        engine.scene.environment = BackgroundStreet._obj
    }
    addLights(engine) {
        const ambientLight = new THREE.AmbientLight(0xffffff , 5);
        const directLight = new THREE.DirectionalLight(0xffffff , 1);

        engine.scene.add(ambientLight , directLight);
    }
    animate() {
        this.physic.loop();
    }
}