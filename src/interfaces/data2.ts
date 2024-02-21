import { ITwinRegister, IData } from './data'

export interface IDataMemory {
	[key: string]: { [key: string]: string }
}

export interface IGraphic {
	[key: string]: { [key: string]: string | number | null }
}

export interface IInsMemory {
	[key: string]: string
}

export interface IRegisters {
	[key: string]: { [key: string]: string }
}

export interface IPureAssembleData {
	Data_memory: IDataMemory
	Graphic: IGraphic
	Instruction_memory: IInsMemory
	Registers: IRegisters
	len_register: number
}

export interface IStep<T> {
	step: string
	data: T
}

export type ISteps<T> = IStep<T>[]

export interface IStepAssembleData {
	Registers: ISteps<ITwinRegister[]>
	Instruction_memory: IData[]
	Data_memory: ISteps<IData[]>
	Graphic: ISteps<IData[]>
	length: number
}
