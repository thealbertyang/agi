import { solidStart } from '@solidjs/start/config'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import type { PluginOption } from 'vite'
import { defineConfig } from 'vite'

const nitroConfig: any = (() => {
	const target = process.env.OPENCODE_DEPLOYMENT_TARGET
	if (target === 'cloudflare') {
		return {
			compatibilityDate: '2024-09-19',
			preset: 'cloudflare_module',
			cloudflare: {
				nodeCompat: true,
			},
		}
	}
	return {}
})()

export default defineConfig({
	plugins: [
		tailwindcss(),
		solidStart() as PluginOption,
		nitro({
			...nitroConfig,
			baseURL: process.env.OPENCODE_BASE_URL,
		}),
	],
	server: {
		host: '0.0.0.0',
		allowedHosts: true,
	},
	worker: {
		format: 'es',
	},
})
