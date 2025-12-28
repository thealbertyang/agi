import '@/index.css'
import { ErrorPage } from './pages/error'
import { CommandProvider } from '@/context/command'
import { GlobalSDKProvider } from '@/context/global-sdk'
import { GlobalSyncProvider } from '@/context/global-sync'
import { LayoutProvider } from '@/context/layout'
import { NotificationProvider } from '@/context/notification'
import { PromptProvider } from '@/context/prompt'
import { TerminalProvider } from '@/context/terminal'
import DirectoryLayout from '@/pages/directory-layout'
import Home from '@/pages/home'
import Layout from '@/pages/layout'
import Session from '@/pages/session'
import { Code } from '@opencode-ai/ui/code'
import { CodeComponentProvider } from '@opencode-ai/ui/context/code'
import { DialogProvider } from '@opencode-ai/ui/context/dialog'
import { DiffComponentProvider } from '@opencode-ai/ui/context/diff'
import { MarkedProvider } from '@opencode-ai/ui/context/marked'
import { Diff } from '@opencode-ai/ui/diff'
import { Font } from '@opencode-ai/ui/font'
import { iife } from '@opencode-ai/util/iife'
import { MetaProvider } from '@solidjs/meta'
import { Router, Route, Navigate } from '@solidjs/router'
import { ErrorBoundary, Show } from 'solid-js'

declare global {
	interface Window {
		__OPENCODE__?: { updaterEnabled?: boolean; port?: number }
	}
}

const url = iife(() => {
	const param = new URLSearchParams(document.location.search).get('url')
	if (param) return param

	if (location.hostname.includes('opencode.ai')) return 'http://localhost:4096'
	if (window.__OPENCODE__) return `http://127.0.0.1:${window.__OPENCODE__.port}`
	if (import.meta.env.DEV)
		return `http://${import.meta.env.VITE_OPENCODE_SERVER_HOST ?? 'localhost'}:${import.meta.env.VITE_OPENCODE_SERVER_PORT ?? '4096'}`

	return 'http://localhost:4096'
})

export function App() {
	return (
		<MetaProvider>
			<Font />
			<ErrorBoundary fallback={(error) => <ErrorPage error={error} />}>
				<DialogProvider>
					<MarkedProvider>
						<DiffComponentProvider component={Diff}>
							<CodeComponentProvider component={Code}>
								<GlobalSDKProvider url={url}>
									<GlobalSyncProvider>
										<LayoutProvider>
											<NotificationProvider>
												<Router
													root={(props) => (
														<CommandProvider>
															<Layout>{props.children}</Layout>
														</CommandProvider>
													)}
												>
													<Route
														path="/"
														component={Home}
													/>
													<Route
														path="/:dir"
														component={DirectoryLayout}
													>
														<Route
															path="/"
															component={() => (
																<Navigate href="session" />
															)}
														/>
														<Route
															path="/session/:id?"
															component={(p) => (
																<Show
																	when={p.params.id || true}
																	keyed
																>
																	<TerminalProvider>
																		<PromptProvider>
																			<Session />
																		</PromptProvider>
																	</TerminalProvider>
																</Show>
															)}
														/>
													</Route>
												</Router>
											</NotificationProvider>
										</LayoutProvider>
									</GlobalSyncProvider>
								</GlobalSDKProvider>
							</CodeComponentProvider>
						</DiffComponentProvider>
					</MarkedProvider>
				</DialogProvider>
			</ErrorBoundary>
		</MetaProvider>
	)
}
