import * as THREE from "three";
import {Character} from "./character.ts";
import {Engine} from "../../engine.ts";
import {OrbitControls} from "three-orbitcontrols-ts";
import {AnimationState, animationState, SCENES} from "../../store/animation-state.ts";
import {RigidBody} from "@dimforge/rapier3d";

export class DropsCamera {
    public camera : THREE.Camera;
    public control?: OrbitControls;
    public animState ?: AnimationState

    constructor(
        public character : Character
    ) {
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight , 1 , 600);
        this.camera.position.y = 0
        this.camera.position.z = 100


        this.animState = animationState.getState()
        animationState.subscribe(animState => {
            this.animState = animState
        })
    }

    init(engine : Engine) {
        this.control = new OrbitControls(this.camera , engine.renderer.domElement);
        this.control.enableDamping = true
        this.control.enableRotate = true
        this.control.enablePan = true

        this.loopInIntroducing(engine)
    }

    loopInGame(characterRigidBody : RigidBody) {
        const characterPosition = characterRigidBody.translation();
        const characterRotation = characterRigidBody.rotation();

        const cameraOffset = new THREE.Vector3(0,60,140);
        cameraOffset.applyQuaternion(characterRotation)
        cameraOffset.add(characterPosition)

        const targetOffset = new THREE.Vector3(0,10,0)
        targetOffset.applyQuaternion(characterRotation)
        targetOffset.add(characterPosition)

        this.camera.position.lerp(cameraOffset , 0.5)
        this.control?.target.lerp(targetOffset , 0.5)
    }

    loopInIntroducing(engine : Engine) {
        const directLight = new THREE.DirectionalLight(0xffffff , 1);
        directLight.position.set(10,2,100);
        directLight.castShadow = true
        directLight.shadow.camera.top = 30
        directLight.shadow.camera.right = 30
        directLight.shadow.camera.left = -30
        directLight.shadow.camera.bottom = -30
        directLight.shadow.bias = -0.002
        directLight.shadow.normalBias = -0.011
        engine.scene.add(directLight);

        const cameraOffset = new THREE.Vector3(170,30,310);
        const targetOffset = new THREE.Vector3(0,10,0)

        this.camera.position.lerp(cameraOffset , 0.5)
        this.control?.target.lerp(targetOffset , 0.5)

    }

    loop(engine : Engine) {
        const characterRigidBody = this.character.characterRigidBody

        this.control?.update();

        console.log(this.animState?.scene)
        if(characterRigidBody) {
            switch (this.animState?.scene) {
                case SCENES.Gaming:
                    this.loopInGame(characterRigidBody)
                    break
                case SCENES.Introducing:
                    // this.loopInIntroducing()
                    break
            }
        }

        engine.renderer.render(engine.scene, this.camera);
    }
}