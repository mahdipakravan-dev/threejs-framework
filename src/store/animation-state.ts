import {devtools} from 'zustand/middleware';
import {createStore} from "zustand/vanilla";

export enum SCENES {
    Introducing = "INTRODUCING",
    Gaming = "GAMING"
}
const initialState: AnimationState = {
    scene : SCENES.Introducing
};

export type AnimationState = {
    scene : SCENES
};
export const animationState = createStore(devtools<AnimationState>(() => initialState, { name: 'AnimationState' }));
export const animationActions = {

};