import { useEffect, useRef } from 'react'
import { IData } from '~/interfaces/data'
import { PipelineDatapath, DefaultDatapath, Scene } from '~/services/datapath'

interface PipelineProps {
	data?: IData[]
	step?: string
}

function Pipeline({ data, step }: PipelineProps) {
	const datapathRef = useRef<PipelineDatapath>()
	const isStart = useRef<boolean>(false)

	const createDatapath = () => {
		const datapathDiv = document.querySelector('#datapath') as HTMLDivElement
		const width = datapathDiv.clientWidth / Scene.CELL
		const height = Math.max(datapathDiv.clientHeight / Scene.CELL, 54)
		datapathRef.current = new PipelineDatapath('datapath', width, height)
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

export default Pipeline