import {Physic} from "../../utils/physic.ts";
import {Engine} from "../../engine.ts";
import {GLTF} from 'three/addons/loaders/GLTFLoader.js';

export class Enviournment {
    static _obj ?: GLTF
    constructor(private physic : Physic) {
        console.log(physic)
    }


    createMesh(engine : Engine) {
        if(!Enviournment._obj) return

        Enviournment._obj.scene.rotation.set(0 , Math.PI , 0)
        const physicalLayers = [
            "threes",
            "terrain",
            "doors",
            "rocks",
            "steps",
            "floor",
            "bushes",
            "Cube"
        ]

        for(const child of Enviournment._obj.scene.children) {
            const isPhysicialObject = physicalLayers.some(keyword => child.name.includes(keyword))

            if(isPhysicialObject) {
                child.traverse(obj => {
                    // @ts-ignore
                    if(obj.isMesh) {
                        obj.castShadow = true
                        obj.receiveShadow = true
                        this.physic.addPhysicalRigid(obj as any , 'fixed' , 'cuboid')
                    }
                })
            }
        }

        const portal1 = Enviournment._obj.scene.getObjectByName("doors")
        const portal2 = Enviournment._obj.scene.getObjectByName("doors003")

        console.log("Portals",portal1,portal2)

        engine.scene.add(Enviournment._obj.scene)
    }

    loop() {
    }
}