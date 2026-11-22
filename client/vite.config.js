import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// Where the Express backend listens during development (see backend/.env)
const backend = process.env.BACKEND_URL ?? 'http://localhost:8080';

export default defineConfig(({ command, mode }) => ({
    //
    // Express serves the built files under /public/js/. The dev server
    // serves from the root and hands API calls and backend-hosted files
    // (favicon, documents, papers, ...) to Express.
    //
    base: command === 'build' ? '/public/js/' : '/',
    plugins: [
        react(),
        mode === 'profile' && visualizer({ open: true, filename: 'stats.html' }),
    ],
    server: {
        proxy: {
            '/api': backend,
            '/public': backend,
        },
    },
    build: {
        outDir: '../backend/public/js',
        emptyOutDir: true,
        assetsDir: '',
        sourcemap: true,
    },
}));
