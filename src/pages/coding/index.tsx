import {Button, Tabs, Tab, styled} from '@mui/material'
import TabPanel, {createProps} from '~/components/TabPanel'
import {useState} from 'react'
import {
	DisplayDMemTable,
	DisplayInstructionTable,
	DisplayRegisterTable,
} from '~/components/DisplayDataTable'
import CodeEditor from '~/components/CodeEditor'
// import CodeMirror from '@uiw/react-codemirror'
// import '@uiw/react-codemirror'

const largeData = [
	{name: 'x0', value: '0x0000f020'},
	{name: 'x1', value: '0x0000f020'},
	{name: 'x2', value: '0x0000f020'},
	{name: 'x3', value: '0x0000f020'},
	{name: 'x4', value: '0x0000f020'},
	{name: 'x5', value: '0x0000f020'},
	{name: 'x6', value: '0x0000f020'},
	{name: 'x7', value: '0x0000f020'},
	{name: 'x8', value: '0x0000f020'},
	{name: 'x9', value: '0x0000f020'},
	{name: 'x10', value: '0x0000f020'},
	{name: 'x11', value: '0x0000f020'},
	{name: 'x12', value: '0x0000f020'},
	{name: 'x13', value: '0x0000f020'},
	{name: 'x14', value: '0x0000f020'},
	{name: 'x15', value: '0x0000f020'},
]

function CodingPage() {
	const [tabIndex, setTabIndex] = useState(0)
	const [code, setCode] = useState('');
	const handleChangeTabIndex = (event: React.SyntheticEvent, index: number) => {
		setTabIndex(index)
	}

	const handleChangeCode = (value: string) => setCode(value);

	return (
		<div className='max-h-screen flex-1 w-full flex flex-col gap-4 px-4 p-1'>
			<div className='flex flex-row gap-2'>
				<Button variant='outlined'>Schematic view</Button>
				<Button variant='outlined'>Diasembly</Button>
			</div>

			<div className='flex-1 flex flex-row gap-2'>
				<div className='flex-1 flex flex-col'>
					<div className='flex flex-col border border-black p-4 j'>
						<h2 className='text-xl text-center'>CODE EDITOR</h2>
					</div>
					<div className='flex flex-col h-full border border-black'>
						<CodeEditor value={code} onChange={handleChangeCode}/>
					</div>
				</div>
				<div className='flex-[1] flex flex-col gap-1'>
					<Tabs value={tabIndex} onChange={handleChangeTabIndex}>
						<Tab label='REGISTERS' {...createProps(0)} />
						<Tab label='DATA MEMORY' {...createProps(1)} />
						<Tab label='INSTRUCTIONS' {...createProps(2)} />
					</Tabs>

					<TabPanel index={0} value={tabIndex}>
						<DisplayRegisterTable
							sx={{maxHeight: 450}}
							data={largeData}
						/>
					</TabPanel>
					<TabPanel index={1} value={tabIndex}>
						<DisplayDMemTable
							data={[{name: 'x1', value: '0x0000d020'}]}
						/>
					</TabPanel>
					<TabPanel index={2} value={tabIndex}>
						<DisplayInstructionTable
							data={[{name: 'x4', value: '0x0000f024'}]}
						/>
					</TabPanel>
				</div>
			</div>

			<div className='flex flex-row gap-2'>
				<Button variant='outlined'>RUN</Button>
				<Button variant='outlined'>RESET</Button>
				<Button variant='outlined'>STEP</Button>
			</div>
		</div>
	)
}

export default CodingPage
