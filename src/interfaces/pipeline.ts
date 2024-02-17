type BlockSignal = string | number

export type SinglePipelinePure = {
	EX: {
		'14': string
		'15': string
		'16': string
		'17': string
		'18': string
		'19': string
		'20': string
		'21': string
		'22': string
		'23': string
		'24': string
		'25': string
		'26': string
		'27': string
		'28': string
		ALUControl: BlockSignal
		ALUSrc: BlockSignal
		ALUop: BlockSignal
		AuiOrLui: BlockSignal
		MEM: BlockSignal
		WB: BlockSignal
		'sign-bit': BlockSignal
	}
	IF: {
		'1': string
		'10': string
		'2': string
		'7': string
		'8': string
	}
	MEM: {
		'29': string
		'30': string
		'31': string
		'32': string
		'33': string
		'34': string
		'35': string
		'36': string
		MemRead: BlockSignal
		MemWrite: BlockSignal
		Unsigned: BlockSignal
		WB: BlockSignal
	}
	REG: {
		'11': string
		'12': string
		'13': string
		'3': string
		'4': string
		'5': string
		'6': string
		'9': string
		CONTROL: BlockSignal
		EX: BlockSignal
		MEM: BlockSignal
		MemtoReg: BlockSignal
		WB: BlockSignal
		branch: BlockSignal
		jal: BlockSignal
		jalr: BlockSignal
		jump: BlockSignal
		pcsrc1: BlockSignal
		pcsrc2: BlockSignal
		slt: BlockSignal
		wb: BlockSignal
	}
	WB: {
		'37': string
		'38': string
		'39': string
		'40': string
		'41': string
		'42': string
		'43': string
		'44': string
		'45': string
		'46': string
		Jump: BlockSignal
		MemtoReg: BlockSignal
		RegWrite: BlockSignal
		Slt: BlockSignal
		Wb: BlockSignal
	}
	blocking: number
	instruction: string
	pc: number
}

export type PipelinePureData = SinglePipelinePure[]

export type SingleStandardPipeline = {
	EX: {
		'14': string
		'15': string
		'16': string
		'17': string
		'18': string
		'19': string
		'20': string
		'21': string
		'22': string
		'23': string
		'24': string
		'25': string
		'26': string
		'27': string
		'28': string
		ALUControl: string
		ALUSrc: string
		ALUop: string
		AuiOrLui: string
		MEM: string
		WB: string
		'sign-bit': string
	}
	IF: {
		'1': string
		'10': string
		'2': string
		'7': string
		'8': string
	}
	MEM: {
		'29': string
		'30': string
		'31': string
		'32': string
		'33': string
		'34': string
		'35': string
		'36': string
		MemRead: string
		MemWrite: string
		Unsigned: string
		WB: string
	}
	REG: {
		'11': string
		'12': string
		'13': string
		'3': string
		'4': string
		'5': string
		'6': string
		'9': string
		CONTROL: string
		EX: string
		MEM: string
		MemtoReg: string
		WB: string
		branch: string
		jal: string
		jalr: string
		jump: string
		pcsrc1: string
		pcsrc2: string
		slt: string
		wb: string
	}
	WB: {
		'37': string
		'38': string
		'39': string
		'40': string
		'41': string
		'42': string
		'43': string
		'44': string
		'45': string
		'46': string
		Jump: string
		MemtoReg: string
		RegWrite: string
		Slt: string
		Wb: string
	}
	blocking: boolean
	instruction: string
	pc: number
}

export type StandardPipelineData = SingleStandardPipeline[]