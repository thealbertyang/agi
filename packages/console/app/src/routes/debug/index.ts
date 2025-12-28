import { Database } from '@opencode-ai/console-core/drizzle/index.js'
import { UserTable } from '@opencode-ai/console-core/schema/user.sql.js'
import { json } from '@solidjs/router'
import type { APIEvent } from '@solidjs/start/server'

export async function GET(evt: APIEvent) {
	return json({
		data: await Database.use(async (tx) => {
			const result = await tx.$count(UserTable)
			return result
		}),
	})
}
