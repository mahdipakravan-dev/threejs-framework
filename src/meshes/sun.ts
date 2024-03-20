import * as THREE from 'three';
import {SunMaterial} from "../textures/sun.ts";

export class SunMesh{
    static _obj : THREE.Mesh;
    constructor() {
        const geometry = new THREE.SphereGeometry(1,30);
        const mesh = new THREE.Mesh(geometry,SunMaterial._obj)
        mesh.castShadow = true
        mesh.receiveShadow = true
        SunMesh._obj = mesh
    }
}
