import * as THREE from "three";
import {EngineFactory} from "./engine.ts";
import {BackgroundStreet} from "./textures/background-street.ts";
import {Physic} from "./utils/physic.ts";
import {EarthMaterial} from "./textures/earth.ts";

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
            groundMesh.scale.x += 4
            groundMesh.scale.z += 4
            this.physic.addPhysicalRigid(groundMesh , "fixed" , "cuboid");
            engine.scene.add(groundMesh)

            for(let i=0 ; i <= 10; i++) {
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
        const ambientLight = new THREE.AmbientLight(0xffffff , 5);
        const directLight = new THREE.DirectionalLight(0xffffff , 1);

        engine.scene.add(ambientLight , directLight);
    }
    animate() {
        this.physic.loop();
    }
}