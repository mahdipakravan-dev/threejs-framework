import {devtools} from 'zustand/middleware';
import {GLTF} from 'three/addons/loaders/GLTFLoader.js';
import {createStore} from "zustand/vanilla";

export type Asset = {
    loaded ?: boolean
    gltf ?: GLTF
}
const initialState: GameState = {
    assets : {}
};

type GameState = {
    assets : Record<string, Asset>
};
export const gameState = createStore(devtools<GameState>(() => initialState, { name: 'GameState' }));
export const gameActions = {
    updateLoading(assetPath : string , asset : Asset) {
        gameState.setState({
            assets : {
                ...gameState.getState(),
                [assetPath] : {
                    ...gameState.getState().assets[assetPath],
                    ...asset
                }
            }
        });
    },
};