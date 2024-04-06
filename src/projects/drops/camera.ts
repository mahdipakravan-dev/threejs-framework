import * as THREE from "three";
import {Character} from "./character.ts";
import {Engine} from "../../engine.ts";
import {OrbitControls} from "three-orbitcontrols-ts";

export class DropsCamera {
    public camera : THREE.Camera;
    public control?: OrbitControls;
    constructor(
        public character : Character
    ) {
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight , 1 , 600);
        this.camera.position.y = 0
        this.camera.position.z = 100
    }

    init(engine : Engine) {
        this.control = new OrbitControls(this.camera , engine.renderer.domElement);
        this.control.enableDamping = true
        this.control.enableRotate = true
        this.control.enablePan = true
    }

    loop(engine : Engine) {

        const characterRigidBody = this.character.characterRigidBody
        if(characterRigidBody) {
            const characterPosition = characterRigidBody.translation()
            characterPosition.z += 60
            characterPosition.y += 80

            const cameraLookAt = new THREE.Vector3().copy(characterRigidBody.translation())

            // this.camera.position.copy(characterPosition)
            // this.camera.lookAt(cameraLookAt)
        }
        this.control?.update();

        engine.renderer.render(engine.scene, this.camera);
    }
}