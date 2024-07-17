import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		visualizer({ open: true }) // Esto es opcional, para analizar el tamaño del bundle
	],
	// build: {
	// 	minify: 'esbuild', // Minificación rápida
	// 	target: 'esnext', // Objetivo de compilación para navegadores modernos
	// 	chunkSizeWarningLimit: 500, // Aumentar el límite de advertencia de tamaño de chunk
	// 	rollupOptions: {
	// 		output: {
	// 			manualChunks(id) {
	// 				if (id.includes('node_modules')) {
	// 					return id.toString().split('node_modules/')[1].split('/')[0].toString();
	// 				}
	// 			}
	// 		}
	// 	}
	// },
	build: {
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				}
			}
		}
	},
	optimizeDeps: {
		include: ['react', 'react-dom'],
	}
})
