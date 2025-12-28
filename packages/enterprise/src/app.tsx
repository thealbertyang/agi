import { MarkedProvider } from '@opencode-ai/ui/context/marked'
import { Favicon } from '@opencode-ai/ui/favicon'
import { Font } from '@opencode-ai/ui/font'
import { MetaProvider } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import './app.css'
import { Suspense } from 'solid-js'

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<MarkedProvider>
						<Favicon />
						<Font />
						<Suspense>{props.children}</Suspense>
					</MarkedProvider>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	)
}
