export interface IData {
	name: string
	value: string
}

export interface IAssembleData {
	Registers: IData[]
	Instruction_memory: IData[]
	Data_memory: IData[]
	Graphic: {[key: number]: string}
}

export interface IPureAssembleData {
	Registers: string[]
	Instruction_memory: string[]
	Data_memory: string[]
	Graphic: {[key: number]: string}
}
