import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glslify-inject'

export default defineConfig({
    plugins: [
        glsl({
            include: './src/shaders/**/*.(vert|frag|glsl)',
            exclude: 'node_modules/**',
            types: { alias: '@shaders', library: 'threejs' }
        }),
        react()
    ],
    resolve: {
        alias: {
          '@shaders': "/src/shaders/",
          '@components': "/src/components/",
        }
    }
});
