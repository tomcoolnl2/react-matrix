import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export const CourseComponent: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    // Leva controls
    const { rotationX, rotationY, rotationZ } = useControls({
        rotationX: { value: 0, min: 0, max: Math.PI * 2 },
        rotationY: { value: 0, min: 0, max: Math.PI * 2 },
        rotationZ: { value: 0, min: 0, max: Math.PI * 2 },
    });

    useEffect(() => {
        if (!mountRef.current) return;

        const stats = new Stats();
        document.body.appendChild(stats.dom);

        // Set up the scene, camera, and renderer
        const scene = new THREE.Scene();
        // scene.add(new THREE.AxesHelper());
        scene.add(new THREE.GridHelper());

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Add a simple cube to the scene
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshNormalMaterial({ wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Add a directional light to the scene
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5).normalize();
        scene.add(directionalLight);

        camera.position.z = 5;

        // Set up orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Enable damping (inertia)
        controls.dampingFactor = 0.25; // Damping factor
        controls.screenSpacePanning = false; // Do not allow panning

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Update cube rotation based on Leva controls
            cube.rotation.x = rotationX;
            cube.rotation.y = rotationY;
            cube.rotation.z = rotationZ;

            // Update controls
            controls.update();
            camera.lookAt(scene.position);

            stats.update();

            renderer.render(scene, camera);
        };

        animate();

        // Clean up on component unmount
        return () => {
            mountRef.current?.removeChild(renderer.domElement);
            controls.dispose();
            document.body.removeChild(stats.dom);
        };
    }, [rotationX, rotationY, rotationZ]);

    return <div ref={mountRef} />;
};
