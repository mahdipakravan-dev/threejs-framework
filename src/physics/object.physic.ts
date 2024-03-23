import {RigidBody, World} from "@dimforge/rapier3d";

export class ObjectPhysic {
    public _world : World | undefined;
    public _rigidBody : RigidBody | undefined;
    constructor() {
        import('@dimforge/rapier3d').then((RAPIER) => {
            let gravity = {x: 0.0, y: -9.81, z: 0.0};
            this._world = new RAPIER.World(gravity);

            this._rigidBody = this._world?.createRigidBody(RAPIER.RigidBodyDesc.dynamic())
            this._world?.createCollider(RAPIER.ColliderDesc.cuboid(0.5,0.5,0.5) , this._rigidBody);
        });
    }

    update() {
        this._world?.step();
    }
}