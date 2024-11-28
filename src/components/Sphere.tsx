import * as THREE from 'three';
import * as React from 'react';
import * as Fiber from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import vertexShader from '@shaders/vertexShader.glsl';
import fragmentShader from '@shaders/fragmentShader.glsl';


interface Props {
    pauseMusic: () => void;
    playMusic: () => void;
}

export const Sphere = React.forwardRef<THREE.PositionalAudio, Props>(({ playMusic, pauseMusic }, soundRef) => {
    
    const [sound, setSound] = React.useState<THREE.PositionalAudio | null>(null);
    const mesh = React.useRef<THREE.Mesh>(null);
    const analyzer = React.useRef<THREE.AudioAnalyser | null>(null);

    React.useEffect(() => {
        const sound = soundRef as React.MutableRefObject<THREE.PositionalAudio | null>;
        setSound(sound.current);
    }, [soundRef]);

    React.useEffect(() => {
        if (sound) {
            analyzer.current = new THREE.AudioAnalyser(sound, 32);
        }
    }, [sound]);

    const uniforms = React.useMemo(() => ({
        u_resolution: {
            type: 'v2',
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        },
        u_time: {
            type: 'f',
            value: 0.0
        },
        u_frequency: {
            type: 'f',
            value: 0.0
        },
        u_intensity: {
            type: 'f',
            value: 0.0
        }
    }), []);

    Fiber.useFrame((state) => {
        
        const { clock } = state;
        if (!mesh.current) {
            return;
        }

        const meshMaterial = mesh.current.material as THREE.ShaderMaterial;
        const elapsedTime = clock.getElapsedTime();

        // Time-based animation
        meshMaterial.uniforms.u_time.value = elapsedTime;

        // Rotation
        mesh.current.rotation.x = elapsedTime * 0.1;
        mesh.current.rotation.z = elapsedTime * 0.1;

        // Audio-driven frequency
        if (analyzer.current?.data) {
            const rawFrequency = analyzer.current.getAverageFrequency();
            const smoothedFrequency = (meshMaterial.uniforms.u_frequency.value +=
                (rawFrequency - meshMaterial.uniforms.u_frequency.value) * .6);

            // Update shader frequency and scale
            meshMaterial.uniforms.u_frequency.value = smoothedFrequency;
            const scaleFactor = 0.75 + smoothedFrequency / 1000;
            mesh.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

            // Adjust intensity based on audio
            meshMaterial.uniforms.u_intensity.value = smoothedFrequency / 250;
        }
    });

    const handleSphereClick = React.useCallback(() => {
        sound?.isPlaying ? pauseMusic() : playMusic();
    }, [sound]);

    return (
        <>
            <mesh ref={mesh} onClick={handleSphereClick} position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]}>
                <icosahedronGeometry args={[4, 30]} />
                <shaderMaterial 
                    fragmentShader={fragmentShader} 
                    vertexShader={vertexShader} 
                    uniforms={uniforms} 
                    wireframe 
                    toneMapped={false} 
                />
            </mesh>
            <EffectComposer multisampling={0} enableNormalPass={false}>
                <Bloom mipmapBlur luminanceThreshold={0.1} luminanceSmoothing={0.99} intensity={1.0} />
            </EffectComposer>
        </>
    );
});