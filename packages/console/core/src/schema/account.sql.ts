import { id, timestamps } from '../drizzle/types'
import { mysqlTable, primaryKey } from 'drizzle-orm/mysql-core'

export const AccountTable = mysqlTable(
	'account',
	{
		id: id(),
		...timestamps,
	},
	(table) => [primaryKey({ columns: [table.id] })]
)
