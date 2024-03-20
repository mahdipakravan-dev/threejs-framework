import * as THREE from 'three';
import {MoonMaterial} from "../textures/moon.ts";

export class MoonMesh {
    static _obj : THREE.Mesh;
    constructor() {
        const geometry = new THREE.SphereGeometry(1,30);
        const mesh = new THREE.Mesh(geometry,MoonMaterial._obj)
        mesh.castShadow = true
        mesh.receiveShadow = true
        mesh.position.set(1.8,0,0);
        mesh.scale.set(
            0.2,
            0.2,
            0.2
        );
        MoonMesh._obj = mesh
    }
}
