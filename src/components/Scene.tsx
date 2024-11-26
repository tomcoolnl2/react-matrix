import * as THREE from 'three';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, PositionalAudio } from '@react-three/drei';
import { Loading } from './Loading';
import { Sphere } from './Sphere';
import './scene.css';


export const Scene: React.FC = () => {

    const sound = React.useRef<THREE.PositionalAudio>(null);

    React.useEffect(() => {
        window.addEventListener('blur', handleWindowBlur);
        return () => {
            window.removeEventListener('focus', handleWindowBlur);
        }
    }, []);

    const handleWindowBlur = React.useCallback(() => {
        sound.current?.pause();
    }, []);

    const playMusic = React.useCallback(() => {
        if (!sound.current?.isPlaying) {
            sound.current?.play();
        }
    }, []);

    const pauseMusic = React.useCallback(() => {
        if (sound.current?.isPlaying) {
            sound.current?.pause();
        }
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            <Canvas className='canvas'>
                <PerspectiveCamera makeDefault far={100}  position={[0, 0, 8.0]} />
                <PositionalAudio url='1.mp3' distance={10} loop ref={sound} autoplay={false} />
                <Sphere ref={sound} playMusic={playMusic} pauseMusic={pauseMusic} />
                {/* <axesHelper /> */}
                <OrbitControls maxDistance={10} minDistance={5} enableZoom />
            </Canvas>
        </Suspense>
    );
}
