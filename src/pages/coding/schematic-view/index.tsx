import {Button, Link} from '@mui/material'
import CodeEditor from '~/components/CodeEditor'
import {useSelector, useDispatch} from 'react-redux'
import {codeSelector} from '~/services/redux/coding/codingSelector'
import {codingActions} from '~/services/redux/coding/codingSlice'
import {Datapath} from '~/components/Datapath'

function schematicViewPage() {
	const code = useSelector(codeSelector)
	const dispatch = useDispatch()
	const handleChangeCode = (value: string) => dispatch(codingActions.setCode(value))

	return (
		<div className='w-full h-full flex-1 flex flex-col gap-4 px-4 p-1'>
			<div className='flex flex-row gap-2'>
				<Button variant='outlined'>
					<Link href='/coding/schematic-view'>Schematic view</Link>
				</Button>
				<Button variant='outlined'>Diasembly</Button>
			</div>

			<div className='flex-1 flex flex-row gap-2'>
				<div className='w-[30%] min-w-[250px] flex flex-col'>
					<div className='flex flex-col p-4 j'>
						<h2 className='text-xl text-left'>Input your code here:</h2>
					</div>
					<div className='flex flex-col h-full border border-black'>
						<CodeEditor value={code} onChange={handleChangeCode} />
					</div>
				</div>
				<div className='w-[70%] min-w-[450px] flex flex-col gap-1 border border-black rounded bg-white'>
					<Datapath />
				</div>
			</div>

			<div className='flex flex-row gap-2 pb-4'>
				<Button variant='outlined'>RUN</Button>
				<Button variant='outlined'>RESET</Button>
				<Button variant='outlined'>STEP</Button>
			</div>
		</div>
	)
}

export default schematicViewPage
