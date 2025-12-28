import { createDefaultOptions, styleVariables } from '../pierre'
import { workerPool } from '../pierre/worker'
import type { FileOptions, LineAnnotation } from '@pierre/diffs'
import { type FileContents, File } from '@pierre/diffs'
import type { ComponentProps } from 'solid-js'
import { createEffect, createMemo, splitProps } from 'solid-js'

export type CodeProps<T = {}> = FileOptions<T> & {
	file: FileContents
	annotations?: LineAnnotation<T>[]
	class?: string
	classList?: ComponentProps<'div'>['classList']
}

export function Code<T>(props: CodeProps<T>) {
	let container!: HTMLDivElement
	const [local, others] = splitProps(props, ['file', 'class', 'classList', 'annotations'])

	const file = createMemo(
		() =>
			new File<T>(
				{
					...createDefaultOptions<T>('unified'),
					...others,
				},
				workerPool
			)
	)

	createEffect(() => {
		container.innerHTML = ''
		file().render({
			file: local.file,
			lineAnnotations: local.annotations,
			containerWrapper: container,
		})
	})

	return (
		<div
			data-component="code"
			style={styleVariables}
			classList={{
				...local.classList,
				[local.class ?? '']: !!local.class,
			}}
			ref={container}
		/>
	)
}
