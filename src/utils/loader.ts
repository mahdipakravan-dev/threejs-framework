import {GLTFLoader , GLTF} from 'three/addons/loaders/GLTFLoader.js';
import {gameActions} from "../store/game-store.ts";

const gltfLoader = new GLTFLoader().setPath("models");
export class Loader {
    static _instances : Record<string, GLTF>
    constructor() {}

    static load(path : string) : Promise<GLTF>{
        gameActions.updateLoading(path , {loaded : false})
        return new Promise(async (resolve, reject) => {
            try {
                const gltf = await gltfLoader.loadAsync(path)
                gameActions.updateLoading(path , {loaded : true });
                resolve(gltf)
            } catch (e) {
                reject(e)
            }
        })
    }
}