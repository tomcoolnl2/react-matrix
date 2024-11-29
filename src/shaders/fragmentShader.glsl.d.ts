declare module '@shaders/fragmentShader.glsl' {
    namespace THREE {
        export type Vector2 = { x: number, y: number, isVector2: true };
        export type Vector3 = { x: number, y: number, z: number, isVector3: true };
        export type Color = { r: number, g: number, b: number, isColor: true };
    }

    const fragmentShader: string;

    type Uniforms = {
        u_resolution: [number, number] | Float32Array | THREE.Vector2,
        u_color: [number, number, number] | Float32Array | THREE.Vector3 | THREE.Color
    };

    export {
        fragmentShader as default,
        fragmentShader as glsl,
        fragmentShader,
        Uniforms,
        Uniforms as FragmentShaderUniforms
    };
}