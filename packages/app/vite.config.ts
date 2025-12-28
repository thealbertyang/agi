import desktopPlugin from './vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [desktopPlugin] as any,
	server: {
		host: '0.0.0.0',
		allowedHosts: true,
		port: 3000,
	},
	build: {
		target: 'esnext',
		sourcemap: true,
	},
})
