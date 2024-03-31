import {EngineFactory} from "./engine.ts";
import {SunMesh} from "./meshes/sun.ts";
import {EarthMesh} from "./meshes/earth.ts";
import * as THREE from "three";
import {BackgroundTexture} from "./textures/background.ts";
import {MoonMaterial} from "./textures/moon.ts";
import {EarthMaterial} from "./textures/earth.ts";
import {SunMaterial} from "./textures/sun.ts";
import {MoonMesh} from "./meshes/moon.ts";

export class MilkyWayFactory extends EngineFactory {
    createMeshes(engine): void {
        new SunMesh()
        new EarthMesh();
        new MoonMesh()
        EarthMesh._obj.add(MoonMesh._obj)
        SunMesh._obj.add(EarthMesh._obj)

        engine.scene.add(SunMesh._obj)
    }
    createMaterials(engine): void {
        new BackgroundTexture();
        new MoonMaterial();
        new EarthMaterial();
        new SunMaterial();

        engine.scene.background = BackgroundTexture._obj
    }
    addLights(engine): void {
        const pointLight = new THREE.PointLight(0xffffff , 2)
        pointLight.position.set(0,0,0);
        engine.scene.add(pointLight);

        const ambientLight = new THREE.AmbientLight(0xffffff , 0.3);
        engine.scene.add(ambientLight);    }
    animate(): void {
        SunMesh._obj.rotation.y += 0.01
        EarthMesh._obj.rotation.y += 0.01
    }
}