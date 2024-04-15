import * as Three from "three"
export class BackgroundSky {
    static _obj : Three.Texture;
    constructor() {
        const loader = new Three.CubeTextureLoader();
        loader.setPath( '/public/cube-textures/sky/');

        const textureCube = loader.load( [
            'px.png', 'nx.png',
            'py.png', 'ny.png',
            'pz.png', 'nz.png'
        ] );

        BackgroundSky._obj = textureCube
    }
}