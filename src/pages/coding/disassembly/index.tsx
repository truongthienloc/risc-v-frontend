import { ChangeEvent, useState } from 'react'
import { Button } from '@mui/material'
import Link from 'next/link'
import CodeEditor from '~/components/CodeEditor'
import { toast } from 'react-toastify'
import * as codeAPI from '~/apis/code'

function DisassemblyPage() {
	const [code, setCode] = useState('')
	const [result, setResult] = useState('')
	const handleChangeCode = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = e.target.value

		const formatText = (inputValue: string) => {
			// Insert a line break after every 32 characters
			const filteredText = inputValue.replace(/[^01\n]/g, '')
			const formattedText = filteredText.replace(/(.{32})/g, '$1\n')
			return formattedText
		}
		// Split the input into words
		const formattedText = formatText(inputValue)

		const preFormattedText = formattedText.split(/\s+/).join('\n')

		setCode(preFormattedText)
	}

	const handleDisassembleClick = async () => {
		try {
			const data = await toast.promise(codeAPI.disassemble(code), {
				pending: 'Đang chuyển đổi code',
				success: 'Chuyển đổi thành công',
				error: 'Chuyển đổi thất bại',
			})

			console.log('data: ', data)
			setResult(data.join('\n'))
		} catch (error) {
			// toast.error('Chuyển đổi thất bại')
		}
	}

	const handleCopyClick = () => {
		navigator.clipboard.writeText(result)
	}

	return (
		<div className='w-full h-full flex-1 flex flex-col gap-4 px-4 p-1'>
			<div className='flex flex-row gap-2'>
				<Button variant='outlined'>
					<Link href='/coding'>Coding</Link>
				</Button>
				<Button variant='outlined'>
					<Link href='/coding/schematic-view'>Schematic view</Link>
				</Button>
			</div>

			<div className='flex-1 flex flex-row gap-2'>
				<div className='flex-1 flex flex-col min-w-[300px]'>
					<div className='flex flex-row justify-between p-4'>
						<h2 className='text-xl text-left'>
							Input your binary machine code here:
						</h2>
						<Button
							className='h-fit'
							variant='outlined'
							onClick={handleDisassembleClick}>
							Disassemble
						</Button>
					</div>
					<div className='flex flex-col h-full border border-black'>
						<textarea
							className='flex-1 resize-none p-4'
							value={code}
							onChange={handleChangeCode}></textarea>
					</div>
				</div>
				<div className='flex-1 h-full flex flex-col'>
					<div className='flex flex-row gap-4 p-4 items-center'>
						<h2 className='text-xl text-left'>Your code:</h2>
						<Button
							className='border border-black px-3 py-1 rounded'
							variant='outlined'
							onClick={handleCopyClick}>
							Copy
						</Button>
					</div>
					<div className='flex flex-col h-full border border-black'>
						<CodeEditor value={result} disable={true} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default DisassemblyPage
