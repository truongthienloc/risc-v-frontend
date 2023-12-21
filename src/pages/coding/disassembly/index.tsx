import { Button } from '@mui/material'
import Link from 'next/link'

function DisassemblyPage() {
	return (
		<div className='w-full h-full flex-1 flex flex-col gap-4 px-4 p-1'>
			<div className='flex flex-row gap-2'>
				<Button variant='outlined'>
					<Link href='/coding/schematic-view'>Schematic view</Link>
				</Button>
				<Button variant='outlined'>
					<Link href='/coding/disassembly'>Disassembly</Link>
				</Button>
			</div>
		</div>
	)
}

export default DisassemblyPage
