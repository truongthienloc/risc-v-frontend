import type {
	StandardPipelineData,
	PipelinePureData,
	SinglePipelinePure,
	SingleStandardPipeline,
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

export const convertPipelinePure2Standard = (pure: PipelinePureData): StandardPipelineData => {
    return pure.map(pureItem => convertSinglePipelinePure2Standard(pureItem))
}
