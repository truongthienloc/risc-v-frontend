import { useEffect, useRef } from 'react'
import { IData } from '~/interfaces/data'
import { DefaultDatapath, Scene } from '~/services/datapath'

interface DatapathProps {
	data?: IData[]
	step?: string
}

function Datapath({ data, step }: DatapathProps) {
	const datapathRef = useRef<DefaultDatapath>()
	const isStart = useRef<boolean>(false)

	const createDatapath = () => {
		const datapathDiv = document.querySelector('#datapath') as HTMLDivElement
		datapathRef.current = new DefaultDatapath('datapath', 81, 54)
	}

	useEffect(() => {
		if (isStart.current) {
			return
		}
		isStart.current = true
		createDatapath()
	}, [])

	useEffect(() => {
		if (!datapathRef.current) {
			return
		}

		if (!data || data.length === 0) {
			datapathRef.current.resetState()
			return
		}

		console.log('data: ', data)

		datapathRef.current.resetState()
		datapathRef.current.loadInstruction(data)
	}, [data])

	return (
		<div
			className='w-full h-full flex flex-col overflow-y-auto text-lg'
			id='datapath'></div>
	)
}

export default Datapath
