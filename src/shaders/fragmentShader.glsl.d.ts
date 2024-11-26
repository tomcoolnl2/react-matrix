declare module '@shaders/fragmentShader.glsl' {
    namespace THREE {
        export type Vector2 = { x: number, y: number, isVector2: true };
    }

    const fragmentShader: string;

    type Uniforms = {
        u_resolution: [number, number] | Float32Array | THREE.Vector2
    };

    export {
        fragmentShader as default,
        fragmentShader as glsl,
        fragmentShader,
        Uniforms,
        Uniforms as FragmentShaderUniforms
    };
}