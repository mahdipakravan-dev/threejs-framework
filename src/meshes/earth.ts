import * as THREE from 'three';
import {EarthMaterial} from "../textures/earth.ts";

export class EarthMesh {
    static _obj : THREE.Mesh;
    constructor() {
        const geometry = new THREE.SphereGeometry(1,30);
        const mesh = new THREE.Mesh(geometry,EarthMaterial._obj)
        mesh.castShadow = true
        mesh.receiveShadow = true
        mesh.position.set(2.5,0,0);
        mesh.scale.setScalar(0.7);
        EarthMesh._obj = mesh
    }
}
