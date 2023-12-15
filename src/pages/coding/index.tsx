import {Button, Tabs, Tab, styled, OutlinedInput} from '@mui/material'
import TabPanel, {createProps} from '~/components/TabPanel'
import Link from 'next/link'
import {useState} from 'react'
import {
	DisplayDMemTable,
	DisplayInstructionTable,
	DisplayRegisterTable,
} from '~/components/DisplayDataTable'
import CodeEditor from '~/components/CodeEditor'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {codeSelector} from '~/services/redux/coding/codingSelector'
import {codingActions} from '~/services/redux/coding/codingSlice'
import {assembleDataSelector} from '~/services/redux/assembling/assemblingSelector'
import {assemblingActions} from '~/services/redux/assembling/assemblingSlice'
import * as codeAPI from '~/apis/code'
import {
	convertPure2Standard,
	convertRegisters2TwinRegisters,
} from '~/helpers/assembleDataFormatter'
import {createDefaultRegisterData} from '~/helpers/registerData'

// defaultData is used when client don't run code or click reset
const defaultData = convertRegisters2TwinRegisters(createDefaultRegisterData())

function CodingPage() {
	const [tabIndex, setTabIndex] = useState(0)
	const code = useSelector(codeSelector)
	const assembleData = useSelector(assembleDataSelector)
	const dispatch = useDispatch()
	const handleChangeTabIndex = (event: React.SyntheticEvent, index: number) => {
		setTabIndex(index)
	}

	const handleChangeCode = (value: string) => dispatch(codingActions.setCode(value))

	const handleRun = async () => {
		try {
			console.log('Click')
			const data = await toast.promise(codeAPI.runCode(code), {
				pending: 'Đang biên dịch',
				success: 'Biên dịch thành công',
				error: 'Biên dịch thất bại',
			})
			const standardData = convertPure2Standard(data)
			console.log('standard-data: ', standardData)
			dispatch(assemblingActions.setAssembleData(standardData))
		} catch (error) {
			console.log(error)
		}
	}

	const handleReset = () => {
		dispatch(assemblingActions.setAssembleData(null))
	}

	return (
		<div className='max-h-screen flex-1 w-full flex flex-col gap-4 px-4 p-1'>
			<div className='flex flex-row gap-2'>
				<Button variant='outlined'>
					<Link href='/coding/schematic-view'>Schematic view</Link>
				</Button>
				<Button variant='outlined'>Disassembly</Button>
			</div>

			<div className='flex-1 flex flex-row gap-2'>
				<div className='flex-1 flex flex-col min-w-[300px]'>
					<div className='flex flex-col p-4 j'>
						<h2 className='text-xl text-left'>Input your code here:</h2>
					</div>
					<div className='flex flex-col h-full border border-black'>
						<CodeEditor value={code} onChange={handleChangeCode} />
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
							data={
								(assembleData &&
									assembleData.Registers[
										assembleData.length - 1
									].data) ||
								defaultData
							}
						/>
					</TabPanel>
					<TabPanel index={1} value={tabIndex}>
						<DisplayDMemTable
							sx={{maxHeight: 450}}
							data={
								(assembleData &&
									assembleData.Data_memory[
										assembleData.length - 1
									].data) ||
								[]
							}
						/>
					</TabPanel>
					<TabPanel index={2} value={tabIndex}>
						<DisplayInstructionTable
							sx={{maxHeight: 450}}
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
				<Button variant='outlined'>STEP</Button>
			</div>
		</div>
	)
}

export default CodingPage
