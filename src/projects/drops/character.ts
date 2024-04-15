import * as THREE from "three";
import {Physic} from "../../utils/physic.ts";
import {inputInitialState, InputState, inputState} from "../../store/input-store.ts";
import {Collider, KinematicCharacterController, RigidBody, RigidBodyType} from "@dimforge/rapier3d";
import {Engine} from "../../engine.ts";
import {GLTF} from 'three/addons/loaders/GLTFLoader.js';
import {AnimationState, animationState, SCENES} from "../../store/animation-state.ts";

enum CharacterAnimation {
    Walk = "WALK",
    Idle = "IDLE_ANIM",
    Greeting = "GREETING"
}
export class Character {
    static _obj ?: GLTF
    public character ?: THREE.Mesh
    public characterRigidBody ?: RigidBody
    public characterRigidBodyType ?: RigidBodyType
    public colliderType ?: any
    public collider ?: Collider
    public pressedInputs = inputInitialState
    public characterController ?: KinematicCharacterController
    public mixer ?: THREE.AnimationMixer
    public animations ?: Map<string , THREE.AnimationAction>
    public currentAction ?: THREE.AnimationAction
    public animState ?: AnimationState
    constructor(private physic : Physic) {
        inputState.subscribe(input => {
            this.pressedInputs = input
            this.onInput(input)
        })


        this.animState = animationState.getState()
        animationState.subscribe(animState => {
            this.animState = animState
        })
    }

    instantiateAnimations(engine : Engine) {
        if(!Character._obj) return
        this.mixer = new THREE.AnimationMixer(engine.scene)
        this.animations = new Map();
        Character._obj.animations.forEach(clip => {
            this.animations!.set(clip.name , this.mixer!.clipAction(clip))
        })

        console.log(this.animations)
        this.animations.get(CharacterAnimation.Idle)?.play();
    }


    createMesh(engine : Engine) {
        if(!Character._obj) return
        this.character = new THREE.Mesh(
            new THREE.BoxGeometry(8,28 , 8),
            new THREE.MeshStandardMaterial({color : "green" , wireframe : true , visible : false})
        )
        this.character.position.set(70,10,160)
        engine.scene.add(this.character)
        this.characterRigidBodyType = this.physic._rappier.RigidBodyDesc.kinematicPositionBased()
        this.characterRigidBody = this.physic._world?.createRigidBody(this.characterRigidBodyType as any)
        this.colliderType = this.physic._rappier.ColliderDesc.cuboid(4,14,4);
        this.collider = this.physic._world?.createCollider(
            this.colliderType,
            this.characterRigidBody
        )
        this.characterRigidBody?.setTranslation(this.character.getWorldPosition(new THREE.Vector3()) , true)
        this.characterRigidBody?.setRotation(this.character.getWorldQuaternion(new THREE.Quaternion()) , true);

        this.characterController = this.physic._world?.createCharacterController(0.01)!
        this.characterController.setApplyImpulsesToDynamicBodies(true)
        this.characterController.enableAutostep(3 , 0.1 , false)
        this.characterController.enableSnapToGround(0.1)

        Character._obj.scene.scale.setScalar(15)
        Character._obj.scene.rotation.y = Math.PI
        Character._obj.scene.position.y -= 14
        this.character.add(Character._obj.scene)
        this.instantiateAnimations(engine)

    }

    playAnimation(name : CharacterAnimation) {
        const action = this.animations?.get(name);
        if(!action) return;
        action.stop();
        action.stopFading();
        action.reset();
        action.play();
        if(this.currentAction) action.crossFadeFrom(this.currentAction , 0.2 , true);

        this.currentAction = action
    }
    onInput(input : InputState) {
        if(
            input.forward ||
            input.backward ||
            input.left ||
            input.right
        ) {
            this.playAnimation(CharacterAnimation.Walk)
        } else {
            this.playAnimation(CharacterAnimation.Idle)
        }
    }

    loop(delta : number) {
        if(this.animState?.scene === SCENES.Gaming) {
            const movement = new THREE.Vector3(0,-1,0)
            if(this.pressedInputs.forward) {
                movement.z -= 3
            }
            if(this.pressedInputs.backward) {
                movement.z += 3
            }
            if(this.pressedInputs.left) {
                movement.x -= 3
            }
            if(this.pressedInputs.right) {
                movement.x += 3
            }

            if(movement.length() !== 0) {
                const angle = Math.atan2(movement.x , movement.z) + Math.PI
                const characterRotation = new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0,1,0),
                    angle
                )
                this.character!.quaternion.slerp(characterRotation , 0.8)
            }
            movement.normalize().multiplyScalar(0.5);
            movement.y -= 1;

            this.characterController?.computeColliderMovement(this.collider! , movement)

            const newPosition = new THREE.Vector3()
                .copy(this.characterRigidBody?.translation()!)
                .add(this.characterController?.computedMovement()!);

            this.characterRigidBody?.setNextKinematicTranslation(newPosition)
            this.character?.position.copy(this.characterRigidBody?.translation()!)
        }
        if(this.animState?.scene === SCENES.Introducing) {
            this.character?.rotation.set(0,Math.PI,0)
        }
        this.mixer?.update(delta);
    }
}