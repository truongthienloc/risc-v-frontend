import React from 'react'
import clsx from 'clsx'
import style from '~/styles/pipeline.module.scss'

export default function PipelineNote() {
	return (
		<div
			className={clsx(
				'relative z-10 w-8 h-8 flex flex-col justify-center items-center bg-gray-500 rounded-full',
				style['pipeline-note']
			)}>
			<p className='text-white'>?</p>
			<div
				className={clsx(
					'absolute top-9 right-0 p-2 bg-slate-300 hidden',
					style['pipeline-note__item']
				)}>
				<NoteItem color='#ef5350' text='PC out' />
				<NoteItem color='#fff177' text='IF out' />
				<NoteItem color='#66bb6a' text='REG out' />
				<NoteItem color='#29b6f6' text='EX out' />
				<NoteItem color='#ffa726' text='WB out' />
			</div>
		</div>
	)
}

interface NoteItemProps {
	color: string
	text: string
}

function NoteItem({ color, text }: NoteItemProps) {
	return (
		<div className='flex flex-row items-center gap-3'>
			<div className='w-3 h-3' style={{ backgroundColor: color }}></div>
			<p className='w-max font-mono'>{text}</p>
		</div>
	)
}
