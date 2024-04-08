import {GLTFLoader , GLTF} from 'three/addons/loaders/GLTFLoader.js';
import {gameActions} from "../store/game-store.ts";

const gltfLoader = new GLTFLoader().setPath("models");
export class Loader {
    static _instances : Record<string, GLTF> = {}
    static load(path : string) : Promise<GLTF>{
        gameActions.updateLoading(path , false)
        return new Promise(async (resolve, reject) => {
            try {
                const gltf = await gltfLoader.loadAsync(path)
                gameActions.updateLoading(path , true);
                Loader._instances[path] = gltf;
                return resolve(gltf)
            } catch (e) {
                console.log("ERROR IN LOAD " , e)
                return reject(e)
            }
        })
    }
}