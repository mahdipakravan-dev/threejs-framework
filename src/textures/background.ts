import * as Three from "three"
export class BackgroundTexture {
    static _obj : Three.Texture;
    constructor() {
        const loader = new Three.CubeTextureLoader();
        loader.setPath( '/public/cube-textures/milky-way/');

        const textureCube = loader.load( [
            'px.png', 'nx.png',
            'py.png', 'ny.png',
            'pz.png', 'nz.png'
        ] );

        BackgroundTexture._obj = textureCube
    }
}