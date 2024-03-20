import * as Three from "three"
export class SunMaterial {
    static _obj : Three.Material;
    constructor() {
        const material = new Three.MeshStandardMaterial()
        material.side = Three.DoubleSide
        const sunTextureLoader = new Three.TextureLoader().load("/public/textures/sun/sun.jpg")
        material.map = sunTextureLoader;
        SunMaterial._obj = material
    }
}