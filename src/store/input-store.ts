import {devtools} from 'zustand/middleware';
import {createStore} from "zustand/vanilla";

export const inputInitialState: InputState = {
    forward : false,
    left : false,
    backward : false,
    right : false,
};

export type InputState = {
    forward : boolean
    backward : boolean
    left : boolean
    right : boolean
};
export const inputState = createStore(devtools<InputState>(() => inputInitialState, { name: 'InputState' }));
export const inputActions = {
    setState : inputState.setState
};