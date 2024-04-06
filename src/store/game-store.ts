import {devtools} from 'zustand/middleware';
import {createStore} from "zustand/vanilla";

const initialState: GameState = {
    loaded_assets : {},
    physic_loading : true,
    character_loading : true,
};

type GameState = {
    loaded_assets : Record<string, boolean>
    physic_loading : boolean
    character_loading : boolean
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
    updatePhysicLoading(physic_loading : boolean) {
        gameState.setState({
            physic_loading
        })
    }
};