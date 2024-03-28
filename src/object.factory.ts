import * as THREE from "three";
import {Engine, EngineFactory} from "./engine.ts";
import {BackgroundStreet} from "./textures/background-street.ts";
import {Loader} from "./utils/loader.ts";
import type {RigidBody, World} from "@dimforge/rapier3d";

export class ObjectFactory extends EngineFactory {
    public _boomBoxMesh : THREE.Group | undefined;
    public _groundMesh : THREE.Mesh | undefined;
    public _world : World | undefined;
    public _rigidBody : RigidBody | undefined;
    public _groundRigidBody : RigidBody | undefined;
    public _rappier : any | undefined;
    constructor() {
        super();
        import('@dimforge/rapier3d').then((RAPIER) => {
            let gravity = {x: 2.0, y: -9.81, z: 0.5};
            this._world = new RAPIER.World(gravity);

            this._rigidBody = this._world?.createRigidBody(RAPIER.RigidBodyDesc.dynamic())
            this._groundRigidBody = this._world?.createRigidBody(RAPIER.RigidBodyDesc.fixed())

            this._rappier = RAPIER
        });
    }
    async createMeshes(engine){
        try {
            const model = await Loader.load('/boombox/BoomBox.gltf')
            model.scene.scale.setScalar(100)
            model.scene.rotation.x += 2
            model.scene.rotation.y += 2
            this._world?.createCollider(this._rappier.ColliderDesc.cuboid(0.5,0.5,0.5) , this._rigidBody);
            engine.scene.add(model.scene);

            const groundMesh = new THREE.Mesh(
                new THREE.BoxGeometry(10,1,10),
                new THREE.MeshStandardMaterial({color : "#8a8a8a"}),
            )
            groundMesh.position.y -= 10;
            groundMesh.geometry.computeBoundingBox()
            const groundSizes = groundMesh.geometry.boundingBox?.getSize(new THREE.Vector3());
            if(groundSizes) this._world?.createCollider(this._rappier.ColliderDesc.cuboid(
                groundSizes?.x / 2,
                groundSizes?.y / 2,
                groundSizes?.z / 2,
            ) , this._groundRigidBody);
            engine.physicFactory._groundRigidBody?.setTranslation(groundMesh.position);
            engine.physicFactory._groundRigidBody?.setRotation(groundMesh.quaternion);
            engine.scene.add(groundMesh)

            this._boomBoxMesh = model.scene;
            this._groundMesh = groundMesh;
        } catch (e) {
            console.log('CRASHED ' , e)
        }
    }
    createMaterials(engine) {
        new BackgroundStreet();

        engine.scene.background = BackgroundStreet._obj
        engine.scene.environment = BackgroundStreet._obj
    }
    addLights(engine) {
        const ambientLight = new THREE.AmbientLight(0xffffff , 5);
        const directLight = new THREE.DirectionalLight(0xffffff , 1);

        engine.scene.add(ambientLight , directLight);
    }
    animate(engine:Engine) {
        engine.physicFactory.update();

        this._boomBoxMesh?.position.copy(engine.physicFactory._rigidBody!.translation())
        this._boomBoxMesh?.quaternion.copy(engine.physicFactory._rigidBody!.rotation())
    }
}