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

        this.control?.update();

        if(characterRigidBody) {
            const characterPosition = characterRigidBody.translation();
            const characterRotation = characterRigidBody.rotation();

            const cameraOffset = new THREE.Vector3(200,160,200);
            cameraOffset.applyQuaternion(characterRotation)
            cameraOffset.add(characterPosition)

            const targetOffset = new THREE.Vector3(0,10,0)
            targetOffset.applyQuaternion(characterRotation)
            targetOffset.add(characterPosition)

            this.camera.position.lerp(cameraOffset , 0.5)
            this.control?.target.lerp(targetOffset , 0.5)
        }

        engine.renderer.render(engine.scene, this.camera);
    }
}