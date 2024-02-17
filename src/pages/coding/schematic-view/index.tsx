import { useMemo, useRef, useState } from 'react'
import { Button } from '@mui/material'
import Link from 'next/link'
import CodeEditor from '~/components/CodeEditor'
import { useSelector, useDispatch } from 'react-redux'
import { codeSelector } from '~/services/redux/coding/codingSelector'
import { codingActions } from '~/services/redux/coding/codingSlice'
import { Datapath } from '~/components/Datapath'
import { toast } from 'react-toastify'
import * as codeAPI from '~/apis/code'
import { convertPure2Standard } from '~/helpers/assembleDataFormatter'
import { IAssembleData } from '~/interfaces/data'
import { assemblingActions } from '~/services/redux/assembling/assemblingSlice'
import { assembleDataSelector } from '~/services/redux/assembling/assemblingSelector'
import { DisplayStepCode } from '~/components/DisplayStepCode'

function SchematicViewPage() {
	const code = useSelector(codeSelector)
	const assembleData = useSelector(assembleDataSelector)
	const dispatch = useDispatch()
	const handleChangeCode = (value: string) => dispatch(codingActions.setCode(value))
	const [isCompile, setIsCompile] = useState(false)
	const [currData, setCurrData] = useState<IAssembleData | null>(null)
	const stepIndex = useRef(-1)
	const [stepCode, setStepCode] = useState<string[]>([])

	const handleReset = () => {
		dispatch(assemblingActions.setAssembleData(null))
		setIsCompile(false)
		setCurrData(null)
	}

	const handleStepCompiling = async () => {
		const data = await codeAPI.runCode(code)
		const standardData = convertPure2Standard(data)
		const binaryCode = standardData.Instruction_memory.map(
			(value) => value.value
		).join('\n')

		const disData = await codeAPI.disassemble(binaryCode)

		return { standardData, disData }
	}

	const handleStepButtonClick = async () => {
		if (!isCompile) {
			try {
				const data = await toast.promise(handleStepCompiling(), {
					pending: 'Đang biên dịch',
					success: 'Biên dịch thành công',
					error: 'Biên dịch thất bại',
				})

				const { standardData, disData } = data

				dispatch(assemblingActions.setAssembleData(standardData))

				setStepCode(disData)
				stepIndex.current = 0
				setIsCompile(true)

				setCurrData({
					Registers: standardData.Registers[0].data,
					Data_memory: [],
					Instruction_memory: standardData.Instruction_memory,
					Graphic: standardData.Graphic[0].data,
				})
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
				setCurrData({
					...currData,
					Registers: assembleData.Registers[index].data,
					Graphic: assembleData.Graphic[index].data,
				})
			} else {
				setCurrData({ ...currData, Graphic: [] })
			}
		}
	}

	const pc = useMemo(() => {
		if (!currData || !assembleData) {
			return -1
		}
		if (stepIndex.current >= assembleData.length) {
			return (stepIndex.current + 10) * 4
		}
		const pcValue =
			currData.Registers.find((value) => value.register1.name.includes('pc'))
				?.register1.value || '0x00000'

		return parseInt(pcValue, 16)
	}, [currData, stepIndex.current])

	return (
		<div className='w-full h-full flex-1 flex flex-col gap-4 px-4 p-1'>
			<div className='flex flex-row gap-2'>
				<Button variant='outlined'>
					<Link href='/coding'>Coding</Link>
				</Button>
				<Button variant='outlined'>
					<Link href='/coding/pipeline'>Pipeline</Link>
				</Button>
				<Button variant='outlined'>
					<Link href='/coding/disassembly'>Disassembly</Link>
				</Button>
			</div>

			<div className='flex-1 flex flex-row gap-2'>
				<div className='w-[30%] min-w-[250px] flex flex-col'>
					<div className='flex flex-col p-4 j'>
						<h2 className='text-xl text-left'>Input your code here:</h2>
					</div>
					<div className='flex flex-col h-full border border-black'>
						{isCompile === false ? (
							<CodeEditor value={code} onChange={handleChangeCode} />
						) : (
							<DisplayStepCode code={stepCode} pc={pc} />
						)}
					</div>
				</div>
				<div className='w-[70%] min-w-[450px] flex flex-col gap-1 border border-black rounded bg-white'>
					<Datapath data={currData?.Graphic} />
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

export default SchematicViewPage
