import * as Three from "three"
export class MoonMaterial {
    static _obj : Three.Material;
    constructor() {
        const material = new Three.MeshStandardMaterial()
        material.side = Three.DoubleSide
        const moonTextureLoader = new Three.TextureLoader();
        const moonTextureAlbedo = moonTextureLoader.load("/public/textures/moon/broken_down_concrete2_albedo.png")
        const moonTextureAo = moonTextureLoader.load("/public/textures/moon/broken_down_concrete2_ao.png")
        const moonTextureHeight = moonTextureLoader.load("/public/textures/moon/broken_down_concrete2_height.png")
        const moonTextureMetallic = moonTextureLoader.load("/public/textures/moon/broken_down_concrete2_metallic.png")
        const moonTextureNormal = moonTextureLoader.load("/public/textures/moon/broken_down_concrete2_normal-ogl.png")
        const moonTextureRoughness = moonTextureLoader.load("/public/textures/moon/broken_down_concrete2_roughness.png")
        material.map = moonTextureAlbedo
        material.roughnessMap = moonTextureRoughness
        material.roughness = 1
        material.metalnessMap = moonTextureMetallic
        material.metalness = 1
        material.normalMap = moonTextureNormal
        material.displacementMap = moonTextureHeight
        material.displacementScale = 0.1
        material.aoMap = moonTextureAo
        material.aoMapIntensity = 0.5
        MoonMaterial._obj = material
    }
}