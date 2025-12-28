import pkg from '../package.json'
import { App } from '@/app'
import type { Platform } from '@/context/platform'
import { PlatformProvider } from '@/context/platform'
// @refresh reload
import { render } from 'solid-js/web'

const root = document.getElementById('root')
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
	)
}

const platform: Platform = {
	platform: 'web',
	version: pkg.version,
	openLink(url: string) {
		window.open(url, '_blank')
	},
	restart: async () => {
		window.location.reload()
	},
}

render(
	() => (
		<PlatformProvider value={platform}>
			<App />
		</PlatformProvider>
	),
	root!
)
