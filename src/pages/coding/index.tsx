import { Button, Tabs, Tab, styled, OutlinedInput } from '@mui/material'
import TabPanel, { createProps } from '~/components/TabPanel'
import Link from 'next/link'
import { useMemo, useRef, useState, useEffect } from 'react'
import {
	DisplayDMemTable,
	DisplayInstructionTable,
	DisplayRegisterTable,
} from '~/components/DisplayDataTable'
import CodeEditor from '~/components/CodeEditor'
import { DisplayStepCode } from '~/components/DisplayStepCode'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { codeSelector } from '~/services/redux/coding/codingSelector'
import { codingActions } from '~/services/redux/coding/codingSlice'
import { assembleDataSelector } from '~/services/redux/assembling/assemblingSelector'
import { assemblingActions } from '~/services/redux/assembling/assemblingSlice'
import * as codeAPI from '~/apis/code'
import {
	convertPure2Standard,
	convertRegisters2TwinRegisters,
} from '~/helpers/assembleDataFormatter'
import { createDefaultRegisterData } from '~/helpers/registerData'
import { IAssembleData } from '~/interfaces/data'

// defaultData is used when client don't run code or click reset
const defaultData = convertRegisters2TwinRegisters(createDefaultRegisterData())

function CodingPage() {
	const [tabIndex, setTabIndex] = useState(0)
	const [prevData, setPrevData] = useState<IAssembleData | null>(null)
	const [currData, setCurrData] = useState<IAssembleData | null>(null)
	const [typeCompile, setTypeCompile] = useState<'default' | 'step'>('default')
	const stepIndex = useRef(-1);
	const [stepCode, setStepCode] = useState<string[]>([])
	const code = useSelector(codeSelector)
	const assembleData = useSelector(assembleDataSelector)
	const dispatch = useDispatch()
	const handleChangeTabIndex = (event: React.SyntheticEvent, index: number) => {
		setTabIndex(index)
	}

	const handleChangeCode = (value: string) => dispatch(codingActions.setCode(value))

	const handleRun = async () => {
		try {
			const data = await toast.promise(codeAPI.runCode(code), {
				pending: 'Đang biên dịch',
				success: 'Biên dịch thành công',
				error: 'Biên dịch thất bại',
			})
			const standardData = convertPure2Standard(data)
			console.log('standard-data: ', standardData)

			dispatch(assemblingActions.setAssembleData(standardData))
			setPrevData({
				Registers: defaultData,
				Data_memory: [],
				Instruction_memory: [],
				Graphic: [],
			})
			const last = standardData.length - 1
			setCurrData({
				Registers: standardData.Registers[last].data,
				Data_memory: standardData.Data_memory[last].data,
				Instruction_memory: standardData.Instruction_memory,
				Graphic: [],
			})
		} catch (error) {
			// console.log(error)
		}
	}

	const handleReset = () => {
		dispatch(assemblingActions.setAssembleData(null))
		setTypeCompile('default')
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

	const handleStep = async () => {
		if (typeCompile === 'default') {
			try {
				const data = await toast.promise(handleStepCompiling(), {
					pending: 'Đang biên dịch',
					success: 'Biên dịch thành công',
					error: 'Biên dịch thất bại',
				})
	
				const { standardData, disData } = data
	
				dispatch(assemblingActions.setAssembleData(standardData))
	
				setStepCode(disData)
				setTypeCompile('step')
				stepIndex.current = 0
	
				setPrevData({
					Registers: defaultData,
					Data_memory: [],
					Instruction_memory: standardData.Instruction_memory,
					Graphic: [],
				})
	
				setCurrData({
					Registers: standardData.Registers[0].data,
					Data_memory: standardData.Data_memory[0].data,
					Instruction_memory: standardData.Instruction_memory,
					Graphic: [],
				})
			} catch (error) {
				console.error(error)
			}

		}
		else if (typeCompile === 'step') {
			if (!assembleData || !currData || !prevData) {
				return
			}

			stepIndex.current++
			const index = stepIndex.current
			if (index < assembleData.length) {
				setPrevData({
					...prevData,
					Registers: currData.Registers,
					Data_memory: currData.Data_memory,
				})
	
				setCurrData({
					...currData,
					Registers: assembleData.Registers[index].data,
					Data_memory: assembleData.Data_memory[index].data,
				})
			}
			else if (index === assembleData.length) {
				setPrevData({
					...prevData,
					Registers: currData.Registers,
					Data_memory: currData.Data_memory,
				})
			}
		}
	}

	const pc = useMemo(() => {
		if (!currData || !assembleData) {
			return -1
		} 
		if (stepIndex.current === assembleData.length) {
			return (stepIndex.current + 10) * 4
		}
		const pcValue = currData.Registers.find((value) =>
			value.register1.name.includes('pc')
		)?.register1.value || '0x00000'

		return parseInt(pcValue, 16)
	}, [currData, stepIndex.current, prevData])

	// useEffect(() => {
	// 	console.log('currData: ', currData);
		
	// }, [currData]);

	return (
		<div className='max-h-screen flex-1 w-full flex flex-col gap-4 px-4 p-1'>
			<div className='flex flex-row gap-2'>
				<Button variant='outlined'>
					<Link href='/coding/schematic-view'>Schematic view</Link>
				</Button>
				<Button variant='outlined'>
					<Link href='/coding/disassembly'>Disassembly</Link>
				</Button>
			</div>

			<div className='flex-1 flex flex-row gap-2'>
				<div className='flex-1 flex flex-col min-w-[300px]'>
					<div className='flex flex-col p-4 j'>
						<h2 className='text-xl text-left'>Input your code here:</h2>
					</div>
					<div className='flex flex-col h-full border border-black'>
						{typeCompile === 'default' ? (
							<CodeEditor value={code} onChange={handleChangeCode} />
						) : typeCompile === 'step' ? (
							<DisplayStepCode code={stepCode} pc={pc} />
						) : null}
					</div>
				</div>
				<div className='h-full flex flex-col gap-1'>
					<Tabs value={tabIndex} onChange={handleChangeTabIndex}>
						<Tab label='REGISTERS' {...createProps(0)} />
						<Tab label='DATA MEMORY' {...createProps(1)} />
						<Tab label='INSTRUCTIONS MEM' {...createProps(2)} />
					</Tabs>

					<TabPanel index={0} value={tabIndex}>
						<DisplayRegisterTable
							// sx={{maxHeight: 450}}
							prev={(prevData && prevData.Registers) || []}
							data={(currData && currData.Registers) || defaultData}
						/>
					</TabPanel>
					<TabPanel index={1} value={tabIndex}>
						<DisplayDMemTable
							sx={{ maxHeight: 450 }}
							prev={(prevData && prevData.Data_memory) || []}
							data={(currData && currData.Data_memory) || []}
						/>
					</TabPanel>
					<TabPanel index={2} value={tabIndex}>
						<DisplayInstructionTable
							sx={{ maxHeight: 450 }}
							data={
								(assembleData &&
									assembleData.Instruction_memory) ||
								[]
							}
						/>
					</TabPanel>
				</div>
			</div>

			<div className='flex flex-row gap-2'>
				<Button variant='outlined' onClick={handleRun}>
					RUN
				</Button>
				<Button variant='outlined' onClick={handleReset}>
					RESET
				</Button>
				<Button variant='outlined' onClick={handleStep}>
					STEP
				</Button>
			</div>
		</div>
	)
}

export default CodingPage
