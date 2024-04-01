import type {RigidBody, World} from "@dimforge/rapier3d";
import * as THREE from "three";
import {gameActions, gameState} from "../store/game-store.ts";

export class Physic {
    public _world : World | undefined;
    public _rappier : any | undefined;
    public rigidBody ?: RigidBody
    public meshMap : Map<any,any>;
    constructor() {
        gameActions.updatePhysicLoading(true);
        this.meshMap = new Map()
        import('@dimforge/rapier3d').then((RAPIER) => {
            let gravity = {x: 0, y: -10.81, z: 0};
            this._rappier = RAPIER
            this._world = new RAPIER.World(gravity);

            gameActions.updatePhysicLoading(false);
        });
    }

    addPhysicalRigid(mesh : THREE.Mesh , type : "dynamic" | "fixed" , collider : "cuboid"| "ball" | "trimesh") {
        let rigidBodyType;
        if(type === "dynamic") {
            rigidBodyType = this._rappier.RigidBodyDesc.dynamic()
        } else if(type === "fixed") {
            rigidBodyType = this._rappier.RigidBodyDesc.fixed()
        }
        this.rigidBody = this._world?.createRigidBody(rigidBodyType)!

        let colliderType : any;
        switch (collider) {
            case "cuboid": {
                const meshSize = this.computeCuboidDimension(mesh)
                if (meshSize) colliderType = this._rappier.ColliderDesc.cuboid(
                    meshSize.x / 2,
                    meshSize.y / 2,
                    meshSize.z / 2,
                )
                this._world?.createCollider(colliderType , this.rigidBody)
                break
            }
            case "ball" : {
                const meshSize = this.computeBallDimension(mesh);
                if (meshSize) colliderType = this._rappier.ColliderDesc.ball(1)
                this._world?.createCollider(colliderType , this.rigidBody)
                break
            }
        }

        this.rigidBody?.setTranslation(mesh.getWorldPosition(new THREE.Vector3()) , true)
        this.rigidBody?.setRotation(mesh.getWorldQuaternion(new THREE.Quaternion()) , true);

        //add to meshMap
        this.meshMap.set(mesh , this.rigidBody)
    }

    computeCuboidDimension(mesh : THREE.Mesh) {
        mesh.geometry.computeBoundingBox();
        const size = mesh.geometry.boundingBox?.getSize(new THREE.Vector3());
        size!.multiply(mesh.getWorldScale(new THREE.Vector3()));
        return size;
    }

    computeBallDimension(mesh : THREE.Mesh) {
        mesh.geometry.computeBoundingSphere();
        const radius = mesh.geometry.boundingSphere?.radius || 1;
        const worldScale = mesh.getWorldScale(new THREE.Vector3());
        const maxScale = Math.max(worldScale.x , worldScale.y , worldScale.z);
        return radius * maxScale;
    }

    loop() {
        if(gameState.getState().physic_loading) return;
        this._world?.step();

        this.meshMap.forEach((rigidBody : RigidBody , mesh: THREE.Mesh) => {
            const rigidBodyPosition = new THREE.Vector3().copy(rigidBody.translation())
            const rigidBodyRotation = new THREE.Quaternion().copy(rigidBody.rotation())

            if(mesh.parent?.matrixWorld) {
                rigidBodyPosition.applyMatrix4(
                    new THREE.Matrix4().copy(mesh.parent?.matrixWorld).invert()
                )
                const inverseParentMatrix = new THREE.Matrix4()
                    .extractRotation(mesh.parent.matrixWorld)
                    .invert();
                const inverseParentRotateion = new THREE.Quaternion()
                    .setFromRotationMatrix(inverseParentMatrix);
                rigidBodyRotation.premultiply(inverseParentRotateion)
            }

            mesh.position.copy(rigidBodyPosition)
            mesh.quaternion.copy(rigidBodyRotation);
        })
    }

}