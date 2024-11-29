import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glslify-inject'

export default defineConfig({
      test: {
        globals: true,
        setupFiles: ['./src/setupTests.ts'],
        environment: 'jsdom',
      },
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
