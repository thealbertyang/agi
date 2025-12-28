import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import solidPlugin from 'vite-plugin-solid'

/**
 * @type {import("vite").PluginOption}
 */
export default [
	{
		name: 'opencode-desktop:config',
		config() {
			return {
				resolve: {
					alias: {
						'@': fileURLToPath(new URL('./src', import.meta.url)),
					},
				},
				worker: {
					format: 'es',
				},
			}
		},
	},
	tailwindcss(),
	solidPlugin(),
]
