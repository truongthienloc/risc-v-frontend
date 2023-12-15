export interface IData {
	name: string
	value: string
}

export interface ITwinRegister {
	register1: IData
	register2: IData
}

export interface IAssembleData {
	Registers: ITwinRegister[]
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
