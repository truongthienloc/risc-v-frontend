import {IAssembleData, IPureAssembleData, IData} from '~/interfaces/data'

export function convertString2IData(string: string): IData {
	const splitName = string.split(':')
	const name = splitName[0].trim()
	const value = splitName[1].split(' ')[0].trim()
	return {name, value}
}

export function convertPure2Standard(pure: IPureAssembleData): IAssembleData {
	const Registers = pure.Registers.map(convertString2IData)
	const Instruction_memory = pure.Instruction_memory.map(convertString2IData)
	const Data_memory = pure.Data_memory.map(convertString2IData)
	const Graphic = pure.Graphic

	return {Registers, Instruction_memory, Data_memory, Graphic}
}
