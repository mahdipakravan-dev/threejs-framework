import * as Three from "three"
export class EarthMaterial {
    static _obj : Three.Material;
    constructor() {
        const material = new Three.MeshStandardMaterial()
        material.side = Three.DoubleSide
        const earthTextureLoader = new Three.TextureLoader().load("/public/textures/earth/earthmap.jpg")
        // earthTextureLoader.wrapS = Three.RepeatWrapping;
        // earthTextureLoader.wrapT = Three.RepeatWrapping
        material.map = earthTextureLoader;
        EarthMaterial._obj = material
    }
}