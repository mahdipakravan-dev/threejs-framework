import * as THREE from "three";
import {Physic} from "../../utils/physic.ts";
import {inputInitialState, inputState} from "../../store/input-store.ts";
import {Collider, KinematicCharacterController, RigidBody, RigidBodyType} from "@dimforge/rapier3d";
import {Engine} from "../../engine.ts";

export class Character {
    public character ?: THREE.Mesh
    public characterRigidBody ?: RigidBody
    public characterRigidBodyType ?: RigidBodyType
    public colliderType ?: any
    public collider ?: Collider
    public pressedInputs = inputInitialState
    public characterController ?: KinematicCharacterController
    constructor(private physic : Physic) {
        inputState.subscribe(input => {
            this.pressedInputs = input
        })
    }


    createMesh(engine : Engine) {
        this.character = new THREE.Mesh(
            new THREE.BoxGeometry(8,8 , 8),
            new THREE.MeshStandardMaterial({color : "green"})
        )
        this.character.position.set(10,0,-10)

        engine.scene.add(this.character)
        this.characterRigidBodyType = this.physic._rappier.RigidBodyDesc.kinematicPositionBased()
        this.characterRigidBody = this.physic._world?.createRigidBody(this.characterRigidBodyType as any)
        this.colliderType = this.physic._rappier.ColliderDesc.cuboid(4,4,4);
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
    }

    loop() {
        const movement = new THREE.Vector3(0,-1,0)
        if(this.pressedInputs.forward) {
            movement.z -= 1
        }
        if(this.pressedInputs.backward) {
            movement.z += 1
        }
        if(this.pressedInputs.left) {
            movement.x -= 1
        }
        if(this.pressedInputs.right) {
            movement.x += 1
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
}