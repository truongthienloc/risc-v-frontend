import { useRef, useEffect, useCallback } from 'react'
import { defineMode } from '~/services/codemirror'
import CodeMirror from 'codemirror'

interface CodeEditorProps {
	value?: string
	onChange?: (value: string) => void
	disable?: boolean
}

function CodeEditor({ value = '', onChange, disable = false }: CodeEditorProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const codeRef = useRef<CodeMirror.EditorFromTextArea>()
	const isStart = useRef<boolean>(true)

	const handleContainerResize = useCallback(() => {
		// console.log('Resizing container');
		if (!containerRef.current || !codeRef.current) {
			return
		}

		const width = containerRef.current.clientWidth
		const height = containerRef.current.clientHeight

		// console.log("width=" + width + " height=" + height);

		codeRef.current.setSize(width, height)
	}, [])

	const createCodeEditor = useCallback(async () => {
		if (codeRef.current) {
			return
		}
		const CodeMirror = (await import('codemirror')).default
		// console.log(CodeMirror.defineMode);

		defineMode(CodeMirror)

		if (!textareaRef.current || !containerRef.current) {
			return
		}

		const code = CodeMirror.fromTextArea(textareaRef.current, {
			mode: 'risc-v',
			theme: 'codewars',
			lineNumbers: true,
		})
		codeRef.current = code

		code.setOption('readOnly', disable)

		code.setValue(value)
		code.setSize(
			containerRef.current.clientWidth - 10,
			containerRef.current.clientHeight - 10
		)
		code.on('change', (ins) => {
			onChange?.(ins.getValue())
		})
	}, [])

	useEffect(() => {
		if (isStart.current) {
			isStart.current = false
			createCodeEditor()
		}

		window.addEventListener('resize', handleContainerResize)

		return () => {
			window.removeEventListener('resize', handleContainerResize)
		}
	}, [handleContainerResize, createCodeEditor])

	useEffect(() => {
		if (codeRef.current) {
			codeRef.current.setOption('readOnly', disable)
		}
	}, [disable])

	useEffect(() => {
		if (codeRef.current) {
			codeRef.current.setValue(value)
		}
	}, [value])

	return (
		<div
			ref={containerRef}
			className='flex-1 min-w-[250px] h-full min-h-[300px] text-base'>
			<textarea ref={textareaRef} name='code-editor' id='code-editor'></textarea>
		</div>
	)
}

export default CodeEditor
