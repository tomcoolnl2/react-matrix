
declare module 'glslify';
declare module 'glsl-noise';

declare module '*.glsl' {
    const value: string;
    export default value;
}

declare module '*.vert' {
    const value: string;
    export default value;
}


declare module '*.frag' {
    const value: string;
    export default value;
}