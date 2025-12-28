import { FileIgnore } from '../../src/file/ignore'
import { test, expect } from 'bun:test'

test('match nested and non-nested', () => {
	expect(FileIgnore.match('node_modules/index.js')).toBe(true)
	expect(FileIgnore.match('node_modules')).toBe(true)
	expect(FileIgnore.match('node_modules/')).toBe(true)
	expect(FileIgnore.match('node_modules/bar')).toBe(true)
	expect(FileIgnore.match('node_modules/bar/')).toBe(true)
})
