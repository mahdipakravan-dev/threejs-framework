import {gameState} from "../store/game-store.ts";

export class LoaderFactory {
    static _loaderElement : HTMLElement
    static _loaderProgressElement : HTMLElement
    constructor() {
        LoaderFactory._loaderElement = document.getElementById("loader")!
        LoaderFactory._loaderProgressElement = document.getElementById("loader_progress")!;

        gameState.subscribe(state => {
            const assets = Object.values(state.loaded_assets);
            LoaderFactory.updateProgress(
                assets.filter(loaded => loaded === true).length,
                assets.length
            );
            if(!assets.includes(false)) {
                LoaderFactory.disableLoading();
            }
        })
    }

    static updateProgress(current : number , total : number) {
        this._loaderProgressElement.innerText = `loading ${current}/${total} of contents`
    }

    static disableLoading() {
        LoaderFactory._loaderElement.classList.add("fade-out")
        setTimeout(() => {
            LoaderFactory._loaderElement.style.display = "none"
        } , 1000)
    }
}