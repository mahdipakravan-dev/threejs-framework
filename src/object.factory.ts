import * as THREE from "three";
import {Engine, EngineFactory} from "./engine.ts";
import {BackgroundStreet} from "./textures/background-street.ts";
import {Loader} from "./utils/loader.ts";

export class ObjectFactory extends EngineFactory {
    public _boomBoxMesh : THREE.Group | undefined;
    public _groundMesh : THREE.Mesh | undefined;
    async createMeshes(engine){
        try {
            const model = await Loader.load('/boombox/BoomBox.gltf')
            model.scene.scale.setScalar(100)
            engine.scene.add(model.scene);

            const groundMesh = new THREE.Mesh(
                new THREE.BoxGeometry(10,1,10),
                new THREE.MeshStandardMaterial({color : "#8a8a8a"}),
            )
            groundMesh.position.y -= 10;
            engine.physicFactory._groundRigidBody?.setTranslation(groundMesh.position);
            engine.physicFactory._groundRigidBody?.setRotation(groundMesh.quaternion);
            engine.scene.add(groundMesh)

            this._boomBoxMesh = model.scene;
            this._groundMesh = groundMesh;
        } catch (e) {
            console.log('CRASHED ' , e)
        }
    }
    createMaterials() {
        new BackgroundStreet();

        // engine.scene.background = BackgroundStreet._obj
        // engine.scene.environment = BackgroundStreet._obj
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