import {EngineFactory} from "./engine.ts";
import * as THREE from "three";
import {BackgroundStreet} from "./textures/background-street.ts";
import {Loader} from "./utils/loader.ts";

export class ObjectFactory extends EngineFactory {
    async createMeshes(engine){
        try {
            const model = await Loader.load('/boombox/BoomBox.gltf')
            model.scene.scale.setScalar(100)
            
            engine.scene.add( model.scene );
        } catch (e) {

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
    animate() {}
}