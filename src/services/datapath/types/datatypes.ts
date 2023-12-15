export type Point = {
	x: number
	y: number
}

export type PortType = 'input' | 'output'
export type SceneMode = 'normal' | 'grid'

export interface InputData {
	type: 'always' | 'once'
	value: any
	srcId: string
}
