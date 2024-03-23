import {devtools} from 'zustand/middleware';
import {createStore} from "zustand/vanilla";

const initialState: GameState = {
    loaded_assets : {}
};

type GameState = {
    loaded_assets : Record<string, boolean>
};
export const gameState = createStore(devtools<GameState>(() => initialState, { name: 'GameState' }));
export const gameActions = {
    updateLoading(assetPath : string , loaded : boolean) {
        gameState.setState({
            loaded_assets : {
                ...gameState.getState().loaded_assets,
                [assetPath] : loaded
            }
        });
    },
};