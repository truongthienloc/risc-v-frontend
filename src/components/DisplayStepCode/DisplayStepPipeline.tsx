import React from 'react'
import clsx from 'clsx'

type PCStep = number | null
export type PCSteps = [PCStep, PCStep, PCStep, PCStep, PCStep]

interface DisplayStepPipelineProps {
	code?: string[]
	pc?: PCSteps
	isEnd?: boolean
}

const pcDefault: PCSteps = [null, null, null, null, null]

export default function DisplayStepPipeline({
	code = [],
	pc = pcDefault,
	isEnd = false,
}: DisplayStepPipelineProps) {
	return (
		<div className='flex-1 min-w-[250px] max-h-[450px] text-base flex flex-col overflow-auto py-2 px-4 gap-2 font-mono'>
			{code &&
				code.map((value, index) => (
					<p
						className={clsx({
							'bg-highlight-s1': index * 4 === pc[0],
							'bg-highlight-s2': index * 4 === pc[1],
							'bg-highlight-s3': index * 4 === pc[2],
							'bg-highlight-s4': index * 4 === pc[3],
							'bg-highlight-s5': index * 4 === pc[4],
						})}
						key={index}>
						[{index * 4}] {value}
					</p>
				))}
			<p
				className={clsx({
					'bg-highlight': isEnd,
				})}>
				[End]
			</p>
		</div>
	)
}
