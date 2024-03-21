import {EngineFactory} from "./engine.ts";
import * as THREE from "three";
import {BackgroundTexture} from "./textures/background.ts";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader().setPath("models");
export class ObjectFactory extends EngineFactory {
    async createMeshes(engine){
        try {
            const model = await gltfLoader.loadAsync('/boombox/BoomBox.gltf');
            model.scene.scale.setScalar(100)
            engine.scene.add( model.scene );
        } catch (e) {

        }
    }
    createMaterials(engine) {
        new BackgroundTexture();

        engine.scene.background = new THREE.Color("rgba(0,0,0,0.8)")
    }
    addLights(engine) {
        const ambientLight = new THREE.AmbientLight(0xffffff , 5);
        const directLight = new THREE.DirectionalLight(0xffffff , 1);

        engine.scene.add(ambientLight , directLight);
    }
    animate() {}
}