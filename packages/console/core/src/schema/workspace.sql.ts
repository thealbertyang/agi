import { timestamps, ulid } from '../drizzle/types'
import { primaryKey, mysqlTable, uniqueIndex, varchar } from 'drizzle-orm/mysql-core'

export const WorkspaceTable = mysqlTable(
	'workspace',
	{
		id: ulid('id').notNull().primaryKey(),
		slug: varchar('slug', { length: 255 }),
		name: varchar('name', { length: 255 }).notNull(),
		...timestamps,
	},
	(table) => [uniqueIndex('slug').on(table.slug)]
)

export function workspaceIndexes(table: any) {
	return [
		primaryKey({
			columns: [table.workspaceID, table.id],
		}),
	]
}
