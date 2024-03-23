import * as Three from "three"
export class BackgroundStreet {
    static _obj : Three.Texture;
    constructor() {
        const loader = new Three.CubeTextureLoader();
        loader.setPath( '/public/cube-textures/desert-street/');

        const textureCube = loader.load( [
            'px.png', 'nx.png',
            'py.png', 'ny.png',
            'pz.png', 'nz.png'
        ] );

        BackgroundStreet._obj = textureCube
    }
}