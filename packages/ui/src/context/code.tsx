import { createSimpleContext } from './helper'
import type { ValidComponent } from 'solid-js'

const ctx = createSimpleContext<ValidComponent, { component: ValidComponent }>({
	name: 'CodeComponent',
	init: (props) => props.component,
})

export const CodeComponentProvider = ctx.provider
export const useCodeComponent = ctx.use
