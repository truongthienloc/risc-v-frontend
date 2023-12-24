import { IData, ITwinRegister } from '~/interfaces/data'
import {
	IPureAssembleData,
	IRegisters,
	ISteps,
	IAssembleData,
	IInsMemory,
} from '~/interfaces/data2'

export function convertString2IData(string: string): IData {
	const splitName = string.split(':')
	const name = splitName[0].trim()
	const value = splitName[1].split(' ')[0].trim()
	return { name, value }
}

export function convertPureIMem2Standard(pure: IInsMemory): IData[] {
	const IMem = []

	for (const key in pure) {
		if (Object.prototype.hasOwnProperty.call(pure, key)) {
			const element = pure[key]

			IMem.push({
				name: key,
				value: element,
			})
		}
	}

	return IMem
}

function sortRegisters(registers: IData[]): IData[] {
	const compareRegisters = (a: IData, b: IData): number => {
		const regex = /x(\d+)/
		const getNumber = (str: string): number => {
			const match = str.match(regex)
			return match ? parseInt(match[1], 10) : 0
		}

		const numA = getNumber(a.name)
		const numB = getNumber(b.name)

		return numA - numB
	}

	return [...registers].sort(compareRegisters)
}

export function convertRegisters2TwinRegisters(registers: IData[]): ITwinRegister[] {
	const res: ITwinRegister[] = []

	for (let index = 0; index < registers.length; index += 2) {
		const element1 = registers[index]
		const element2 = registers[index + 1]

		res.push({
			register1: { ...element1 },
			register2: { ...element2 },
		})
	}

	return res
}

function convertPure2Step(pure: IRegisters): ISteps<IData[]> {
	const stepResult = []

	for (const key in pure) {
		if (Object.prototype.hasOwnProperty.call(pure, key)) {
			const pureRegisters = pure[key]

			const registers = []
			for (const key in pureRegisters) {
				if (Object.prototype.hasOwnProperty.call(pureRegisters, key)) {
					const element = pureRegisters[key]
					registers.push({
						name: key,
						value: element,
					})
				}
			}

			stepResult.push({
				step: key,
				data: registers,
			})
		}
	}

	return stepResult
}

export function convertPure2Standard(pure: IPureAssembleData): IAssembleData {
	const stepRegisters = convertPure2Step(pure.Registers)
	const stepDMems = convertPure2Step(pure.Data_memory)
	const stepGraphics = convertPure2Step(pure.Graphic)
	const iMems = convertPureIMem2Standard(pure.Instruction_memory)

	const stepTwinRegisters = []

	for (const regs of stepRegisters) {
		const sortedRegisters = sortRegisters(regs.data)
		const twinRegisters = convertRegisters2TwinRegisters(sortedRegisters)

		stepTwinRegisters.push({
			step: regs.step,
			data: twinRegisters,
		})
	}

	return {
		Registers: stepTwinRegisters,
		Instruction_memory: iMems,
		Data_memory: stepDMems,
		Graphic: stepGraphics,
		length: pure.len_register,
	}
}
