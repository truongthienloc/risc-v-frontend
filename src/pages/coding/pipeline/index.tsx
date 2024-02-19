import { useMemo, useRef, useState } from 'react'
import { Button } from '@mui/material'
import Link from 'next/link'
import CodeEditor from '~/components/CodeEditor'
import { useSelector, useDispatch } from 'react-redux'
import { codeSelector } from '~/services/redux/coding/codingSelector'
import { codingActions } from '~/services/redux/coding/codingSlice'
import { Datapath, Pipeline } from '~/components/Datapath'
import { toast } from 'react-toastify'
import * as codeAPI from '~/apis/code'
import { convertPure2Standard } from '~/helpers/assembleDataFormatter'
import { assemblingActions } from '~/services/redux/assembling/assemblingSlice'
import { DisplayStepCode } from '~/components/DisplayStepCode'
import {
	convert5Sections2IDataArray,
	convertPipelinePure2Standard,
} from '~/helpers/pipelineFormatter'
import {
	FiveSections,
	SingleStandardPipeline,
	StandardPipelineData,
} from '~/interfaces/pipeline'
import { IData } from '~/interfaces/data'
import { pushFiveSections } from '~/helpers/pipelineQueue'
import DisplayStepPipeline, {
	PCSteps,
} from '~/components/DisplayStepCode/DisplayStepPipeline'
import { PipelineNote } from '~/components/Note'

function PipelinePage() {
	const code = useSelector(codeSelector)
	const [assembleData, setAssembleData] = useState<StandardPipelineData>([])
	// const assembleData = useSelector(assembleDataSelector)
	const dispatch = useDispatch()
	const handleChangeCode = (value: string) => dispatch(codingActions.setCode(value))
	const [isCompile, setIsCompile] = useState(false)
	const [currData, setCurrData] = useState<IData[] | null>(null)
	const stepIndex = useRef(-1)
	const [stepCode, setStepCode] = useState<string[]>([])
	const [stepQueue, setStepQueue] = useState<FiveSections>([
		null,
		null,
		null,
		null,
		null,
	])

	const handleReset = () => {
		dispatch(assemblingActions.setAssembleData(null))
		setIsCompile(false)
		setCurrData(null)
	}

	const handleStepCompiling = async () => {
		const data = await codeAPI.runCode(code)
		const pipelineData = await codeAPI.runCodeForPipeline(code)
		const standardData = convertPure2Standard(data)
		const standardPipelineData = convertPipelinePure2Standard(pipelineData)
		const binaryCode = standardData.Instruction_memory.map(
			(value) => value.value
		).join('\n')

		const disData = await codeAPI.disassemble(binaryCode)

		return { standardPipelineData, disData }
	}

	const handleStepButtonClick = async () => {
		if (!isCompile) {
			try {
				const data = await toast.promise(handleStepCompiling(), {
					pending: 'Đang biên dịch',
					success: 'Biên dịch thành công',
					error: 'Biên dịch thất bại',
				})

				const { standardPipelineData, disData } = data

				setAssembleData(standardPipelineData)

				setStepCode(disData)
				stepIndex.current = 0
				setIsCompile(true)
				const fiveSections: FiveSections = [
					standardPipelineData[0],
					null,
					null,
					null,
					null,
				]
				const iData = convert5Sections2IDataArray(fiveSections)
				setCurrData(iData)
				setStepQueue(fiveSections)
			} catch (error) {
				console.error(error)
			}
		} else {
			if (!assembleData || !currData) {
				return
			}

			stepIndex.current++
			const index = stepIndex.current
			if (index < assembleData.length) {
				const nextSection = assembleData[index].blocking
					? null
					: assembleData[index]
				const fiveSections = pushFiveSections(stepQueue, nextSection)

				setStepQueue(fiveSections)
				setCurrData(convert5Sections2IDataArray(fiveSections))
			} else {
				// Queue is empty => End of steps
				const fiveSections = pushFiveSections(stepQueue, null)
				if (fiveSections.some((value) => value !== null)) {
					setStepQueue(fiveSections)
					setCurrData(convert5Sections2IDataArray(fiveSections))
				} else {
					setCurrData(null)
				}
			}
		}
	}

	const { pc, isEnd } = useMemo(() => {
		console.log('currData: ', currData)

		if (!currData || !assembleData) {
			const fiveSections = [null, null, null, null, null] as PCSteps
			return { pc: fiveSections, isEnd: true }
		}

		const pcValue = stepQueue.map((step) => step && step.pc)

		return { pc: pcValue as PCSteps, isEnd: false }
	}, [currData, stepIndex.current, stepQueue])

	return (
		<div className='w-full h-full flex-1 flex flex-col gap-4 px-4 p-1'>
			<div className='flex flex-row gap-2'>
				<Button variant='outlined'>
					<Link href='/coding'>Coding</Link>
				</Button>
				<Button variant='outlined'>
					<Link href='/coding/schematic-view'>Schematic view</Link>
				</Button>
				<Button variant='outlined'>
					<Link href='/coding/disassembly'>Disassembly</Link>
				</Button>
			</div>

			<div className='flex-1 flex flex-row gap-2'>
				<div className='w-[30%] min-w-[250px] flex flex-col'>
					<div className='flex flex-row px-4 py-2 justify-between'>
						<h2 className='text-xl text-left'>Input your code here:</h2>
						<PipelineNote />
					</div>
					<div className='flex flex-col h-full border border-black'>
						{isCompile === false ? (
							<CodeEditor value={code} onChange={handleChangeCode} />
						) : (
							<DisplayStepPipeline
								code={stepCode}
								pc={pc}
								isEnd={isEnd}
							/>
						)}
					</div>
				</div>
				<div className='w-[70%] min-w-[450px] flex flex-col gap-1 border border-black rounded bg-white'>
					<Pipeline data={currData} />
				</div>
			</div>

			<div className='flex flex-row gap-2 pb-4'>
				<Button variant='outlined' disabled>
					RUN
				</Button>
				<Button variant='outlined' onClick={handleReset}>
					RESET
				</Button>
				<Button variant='outlined' onClick={handleStepButtonClick}>
					STEP
				</Button>
			</div>
		</div>
	)
}

export default PipelinePage
