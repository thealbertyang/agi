import { timestamps } from '../drizzle/types'
import { mysqlTable, int, primaryKey, varchar } from 'drizzle-orm/mysql-core'

export const IpTable = mysqlTable(
	'ip',
	{
		ip: varchar('ip', { length: 45 }).notNull(),
		...timestamps,
		usage: int('usage'),
	},
	(table) => [primaryKey({ columns: [table.ip] })]
)
