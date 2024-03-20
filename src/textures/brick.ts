import * as Three from "three"
export class BrickMaterial {
    private material : Three.Material;
    constructor() {
        const material = new Three.MeshStandardMaterial()
        material.side = Three.DoubleSide
        const brickTextureLoader = new Three.TextureLoader();
        const brickTextureAlbedo = brickTextureLoader.load("/public/textures/brick-wall/brick-wall_albedo.png")
        const brickTextureAo = brickTextureLoader.load("/public/textures/brick-wall/brick-wall_ao.png")
        const brickTextureHeight = brickTextureLoader.load("/public/textures/brick-wall/brick-wall_height.png")
        const brickTextureMetallic = brickTextureLoader.load("/public/textures/brick-wall/brick-wall_metallic.png")
        const brickTextureNormal = brickTextureLoader.load("/public/textures/brick-wall/brick-wall_normal-ogl.png")
        const brickTextureRoughness = brickTextureLoader.load("/public/textures/brick-wall/brick-wall_roughness.png")
        material.map = brickTextureAlbedo
        material.roughnessMap = brickTextureRoughness
        material.roughness = 1
        material.metalnessMap = brickTextureMetallic
        material.metalness = 1
        material.normalMap = brickTextureNormal
        material.displacementMap = brickTextureHeight
        material.displacementScale = 0.1
        material.aoMap = brickTextureAo
        material.aoMapIntensity = 0.5
        this.material = material
    }

    get() {
        return this.material;
    }
}