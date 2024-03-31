import type {RigidBody, World} from "@dimforge/rapier3d";

export class ObjectPhysic {
    public _world : World | undefined;
    public _rigidBody : RigidBody | undefined;
    public _groundRigidBody : RigidBody | undefined;
    constructor() {
        import('@dimforge/rapier3d').then((RAPIER) => {
            let gravity = {x: 2.0, y: -9.81, z: 0.5};
            this._world = new RAPIER.World(gravity);

            this._rigidBody = this._world?.createRigidBody(RAPIER.RigidBodyDesc.dynamic())
            this._groundRigidBody = this._world?.createRigidBody(RAPIER.RigidBodyDesc.fixed())
            this._world?.createCollider(RAPIER.ColliderDesc.cuboid(0.5,0.5,0.5) , this._rigidBody);
            this._world?.createCollider(RAPIER.ColliderDesc.cuboid(5,1,5) , this._groundRigidBody);
        });
    }

    update() {
        this._world?.step();
    }
}