import { LocalProvider } from '@/context/local'
import { SDKProvider } from '@/context/sdk'
import { SyncProvider, useSync } from '@/context/sync'
import { DataProvider } from '@opencode-ai/ui/context'
import { base64Decode } from '@opencode-ai/util/encode'
import { iife } from '@opencode-ai/util/iife'
import { useParams } from '@solidjs/router'
import { createMemo, Show, type ParentProps } from 'solid-js'

export default function Layout(props: ParentProps) {
	const params = useParams()
	const directory = createMemo(() => {
		return base64Decode(params.dir!)
	})
	return (
		<Show
			when={params.dir}
			keyed
		>
			<SDKProvider directory={directory()}>
				<SyncProvider>
					{iife(() => {
						const sync = useSync()
						return (
							<DataProvider
								data={sync.data}
								directory={directory()}
							>
								<LocalProvider>{props.children}</LocalProvider>
							</DataProvider>
						)
					})}
				</SyncProvider>
			</SDKProvider>
		</Show>
	)
}
