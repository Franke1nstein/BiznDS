import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import process from 'node:process';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [react(), tailwindcss()],

		define: {
			'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || ''),

			'import.meta.env': env,
			process: { env: env },
		},

		server: {
			proxy: {
				'/api': {
					target: 'http://localhost:3000',
					changeOrigin: true,
				},
				'/images': {
					target: 'http://localhost:3000',
					changeOrigin: true,
				},
			},
		},

		build: {
			outDir: 'dist',
			sourcemap: false,
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
				},
			},
		},
	};
});
