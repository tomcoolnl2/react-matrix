declare module '@shaders/vertexShader.glsl' {
    const vertexShader: string;

    type Uniforms = {
        u_intensity: number,
        u_time: number,
        u_frequency: number
    };

    export {
        vertexShader as default,
        vertexShader as glsl,
        vertexShader,
        Uniforms,
        Uniforms as VertexShaderUniforms
    };
}