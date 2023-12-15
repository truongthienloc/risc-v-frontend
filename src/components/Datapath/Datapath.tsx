import {useEffect, useRef} from 'react'
import {DefaultDatapath, Scene} from '~/services/datapath'

function Datapath() {
	const datapathRef = useRef<DefaultDatapath>()
	const isStart = useRef<boolean>(false)

	const createDatapath = () => {
		const datapathDiv = document.querySelector('#datapath') as HTMLDivElement
		const width = datapathDiv.clientWidth / Scene.CELL
		const height = Math.max(datapathDiv.clientHeight / Scene.CELL, 54)
		datapathRef.current = new DefaultDatapath('datapath', width, height)
	}

	useEffect(() => {
		if (isStart.current) {
			return
		}
		isStart.current = true
		createDatapath()
	}, [])

	return (
		<div
			className='w-full h-full flex flex-col overflow-y-auto text-lg'
			id='datapath'></div>
	)
}

export default Datapath
