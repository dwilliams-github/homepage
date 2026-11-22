import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

//
// The page itself (backend/static/index.html) is served by the Express
// backend, so we build from the JS entry point straight into the backend's
// public directory, with fixed names for the entry script and stylesheet.
//
export default defineConfig(({ mode }) => ({
    base: '/public/js/',
    plugins: [
        react(),
        mode === 'profile' && visualizer({ open: true, filename: 'stats.html' }),
    ],
    build: {
        outDir: '../backend/public/js',
        emptyOutDir: true,
        sourcemap: true,
        rolldownOptions: {
            input: 'src/index.jsx',
            output: {
                entryFileNames: 'bundle.js',
                chunkFileNames: '[name]-[hash].js',
                assetFileNames: ({ names }) =>
                    names?.[0] === 'index.css' ? 'bundle.css' : '[name]-[hash][extname]',
            },
        },
    },
}));
