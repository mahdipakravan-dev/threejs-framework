import {inputState} from "../store/input-store.ts";

export class InputController {
    private keyPressed = {}

    constructor() {
        this.listen();
    }

    listen() {
        window.addEventListener("keydown", this.onKeyDown.bind(this))
        window.addEventListener("keyup", this.onKeyUp.bind(this))
    }

    onKeyDown(event: KeyboardEvent) {
        if (this.keyPressed[event.code]) return
        switch (event.code) {
            case "KeyW":
            case "ArrowUp":
                inputState.setState({forward: true})
                break
            case "KeyA":
            case "ArrowLeft":
                inputState.setState({left: true})
                break
            case "KeyS":
            case "ArrowDown":
                inputState.setState({backward: true})
                break
            case "KeyD":
            case "ArrowRight":
                inputState.setState({right: true})
                break
        }
        this.keyPressed[event.code] = true
    }

    onKeyUp(event: KeyboardEvent) {
        if (!this.keyPressed[event.code]) return
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                inputState.setState({forward: false})
                break
            case "ArrowLeft":
            case "KeyA":
                inputState.setState({left: false})
                break
            case "ArrowDown":
            case "KeyS":
                inputState.setState({backward: false})
                break
            case "ArrowRight":
            case "KeyD":
                inputState.setState({right: false})
                break
        }
        this.keyPressed[event.code] = false
    }
}