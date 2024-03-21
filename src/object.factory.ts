import {EngineFactory} from "./engine.ts";
import * as THREE from "three";
import {BackgroundTexture} from "./textures/background.ts";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader();
export class ObjectFactory extends EngineFactory {
    createMeshes(engine): void {
        gltfLoader.load("/models/simple/monkey.gltf" , (gltf) => {
            engine.scene.add(gltf.scene)
        })
    }
    createMaterials(engine): void {
        new BackgroundTexture();

        engine.scene.background = BackgroundTexture._obj
    }
    addLights(engine): void {
        const ambientLight = new THREE.AmbientLight(0xffffff , 5);
        const directLight = new THREE.DirectionalLight(0xffff00 , 5);
        engine.scene.add(ambientLight , directLight);
    }
    animate(): void {
    }
}