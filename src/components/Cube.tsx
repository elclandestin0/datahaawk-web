// src/components/ThreeCube.tsx
import { useEffect } from 'react';
import * as THREE from 'three';

const ThreeCube = () => {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(300, 300); // Set the size of the 3D cube
        document.getElementById('cube-container')!.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        const animate = function () {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();
        return () => {
            const cubeContainer = document.getElementById('cube-container');
            if (cubeContainer) {
                cubeContainer.removeChild(renderer.domElement); // Cleanup on component unmount
            }
        };
    }, []);

    return null;
};

export default ThreeCube;
