import { createSimpleContext } from './helper'
import type { WorkerPoolManager } from '@pierre/diffs/worker'

const ctx = createSimpleContext<
	WorkerPoolManager | undefined,
	{ pool: WorkerPoolManager | undefined }
>({
	name: 'WorkerPool',
	init: (props) => props.pool,
})

export const WorkerPoolProvider = ctx.provider
export const useWorkerPool = ctx.use
