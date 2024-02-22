import { IData } from '~/interfaces/data'
import type {
	StandardPipelineData,
	PipelinePureData,
	SinglePipelinePure,
	SingleStandardPipeline,
	FiveSections,
} from '~/interfaces/pipeline'

const convertSinglePipelinePure2Standard = (
	pure: SinglePipelinePure
): SingleStandardPipeline => {
	return {
		...pure,
		EX: {
			...pure.EX,
			ALUControl: pure.EX.ALUControl.toString(),
			ALUSrc: pure.EX.ALUSrc.toString(),
			ALUop: pure.EX.ALUop.toString(),
			AuiOrLui: pure.EX.AuiOrLui.toString(),
			MEM: pure.EX.MEM.toString(),
			WB: pure.EX.WB.toString(),
			'sign-bit': pure.EX['sign-bit'].toString(),
		},
		MEM: {
			...pure.MEM,
			MemRead: pure.MEM.MemRead.toString(),
			MemWrite: pure.MEM.MemWrite.toString(),
			Unsigned: pure.MEM.Unsigned.toString(),
			WB: pure.MEM.WB.toString(),
		},
		REG: {
			...pure.REG,
			CONTROL: pure.REG.CONTROL.toString(),
			EX: pure.REG.EX.toString(),
			MEM: pure.REG.MEM.toString(),
			MemtoReg: pure.REG.MemtoReg.toString(),
			WB: pure.REG.WB.toString(),
			branch: pure.REG.branch.toString(),
			jal: pure.REG.jal.toString(),
			jalr: pure.REG.jalr.toString(),
			jump: pure.REG.jump.toString(),
			pcsrc1: pure.REG.pcsrc1.toString(),
			pcsrc2: pure.REG.pcsrc2.toString(),
			slt: pure.REG.slt.toString(),
			wb: pure.REG.wb.toString(),
		},
		WB: {
			...pure.WB,
			Jump: pure.WB.Jump.toString(),
			MemtoReg: pure.WB.MemtoReg.toString(),
			RegWrite: pure.WB.RegWrite.toString(),
			Slt: pure.WB.Slt.toString(),
			Wb: pure.WB.Wb.toString(),
		},
		blocking: Boolean(pure.blocking),
	}
}

export const convertPipelinePure2Standard = (
	pure: PipelinePureData
): StandardPipelineData => {
	return pure.map((pureItem) => convertSinglePipelinePure2Standard(pureItem))
}

type SectionSelector = 'IF' | 'REG' | 'EX' | 'MEM' | 'WB'

export function convertSingleStandardPipeline2IData(
	pipeline: SingleStandardPipeline,
	selector: SectionSelector
): IData[] {
	const result: IData[] = []

	for (const [key, value] of Object.entries(pipeline[selector])) {
		if (Object.prototype.hasOwnProperty.call(pipeline[selector], key)) {
			const name = `${selector}.${key}`

			// If blocking, all control signal will be null
			if (!pipeline.blocking) {
				if (value.length === 6) {
					result.push({ name, value: `#${value}` })
				} else if (value.includes('1')) {
					result.push({ name, value: 'blue' })
				}
			} else if (Number.isInteger(Number(key))) {
				if (value.length === 6) {
					result.push({ name, value: `#${value}` })
				} else if (value.includes('1')) {
					result.push({ name, value: 'blue' })
				}
			}
		}
	}

	console.log('result: ', result)

	return result
}

export const convert5Sections2IDataArray = (sections: FiveSections): IData[] => {
	let result: IData[] = []

	const section0 = sections[0]
	const section1 = sections[1]
	const section2 = sections[2]
	const section3 = sections[3]
	const section4 = sections[4]

	if (section0) {
		result = [...result, ...convertSingleStandardPipeline2IData(section0, 'IF')]
	}
	if (section1) {
		const iDataSection1 = convertSingleStandardPipeline2IData(section1, 'REG')
		// If blocking is in section IF, blocking wire will turn
		if (section1.blocking) {
			iDataSection1.push({
				name: 'blocking',
				value: 'blue',
			})
		}
		result = [...result, ...iDataSection1]
	}
	if (section2) {
		result = [...result, ...convertSingleStandardPipeline2IData(section2, 'EX')]
	}
	if (section3) {
		result = [...result, ...convertSingleStandardPipeline2IData(section3, 'MEM')]
	}
	if (section4) {
		result = [...result, ...convertSingleStandardPipeline2IData(section4, 'WB')]
	}

	return result
}
