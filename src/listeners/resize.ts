import {PerspectiveCamera, Renderer} from "three";

export function handleResize(camera : PerspectiveCamera , renderer : Renderer) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}