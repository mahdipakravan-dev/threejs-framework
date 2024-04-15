import * as Three from "three"
export class BackgroundMilkyway {
    static _obj : Three.Texture;
    constructor() {
        const loader = new Three.CubeTextureLoader();
        loader.setPath( '/public/cube-textures/milky-way/');

        const textureCube = loader.load( [
            'px.png', 'nx.png',
            'py.png', 'ny.png',
            'pz.png', 'nz.png'
        ] );

        BackgroundMilkyway._obj = textureCube
    }
}