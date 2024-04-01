import * as THREE from "three";
import {Character} from "./character.ts";
import {Engine} from "../../engine.ts";

export class DropsCamera {
    public camera : THREE.Camera;
    constructor(
        public character : Character
    ) {
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight , 1 , 600);
        this.camera.position.y = 0
        this.camera.position.z = 100
    }

    loop(engine : Engine) {
        const characterRigidBody = this.character.characterRigidBody
        if(characterRigidBody) {
            const characterPosition = characterRigidBody.translation()
            characterPosition.z += 60
            characterPosition.y += 100

            const cameraLookAt = new THREE.Vector3().copy(characterRigidBody.translation())

            this.camera.position.copy(characterPosition)
            this.camera.lookAt(cameraLookAt)
        }
        engine.renderer.render(engine.scene, this.camera);
    }
}