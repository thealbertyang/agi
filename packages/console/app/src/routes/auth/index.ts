import { getLastSeenWorkspaceID } from '../workspace/common'
import { redirect } from '@solidjs/router'
import type { APIEvent } from '@solidjs/start/server'

export async function GET(input: APIEvent) {
	try {
		const workspaceID = await getLastSeenWorkspaceID()
		return redirect(`/workspace/${workspaceID}`)
	} catch {
		return redirect('/auth/authorize')
	}
}
