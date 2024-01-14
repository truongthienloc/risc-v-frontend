import { SceneMode } from '../types'
import Block from '../Block'
import Register from '../Block/Register'
import Link from '../Link'
import Port from '../Port'
import BranchingLink from '../BranchingLink'
import IMemory from '../Block/IMemory'
import DMemory from '../Block/DMemory'
import PC from '../Block/PC'
import ALUControl from '../Block/ALUControl'
import Control from '../Block/Control'
import ImmGen from '../Block/ImmGen'
import ShiftLeft, { ShiftLeft12 } from '../Block/ShiftLeft'
import Mux from '../Block/Mux'
import AND from '../Block/AND'
import ALU from '../Block/ALU'
import ADD from '../Block/ADD'
import JumpControl from '../Block/JumpControl'
import Mux3 from '../Block/Mux3'
import Branch from '../Block/Branch'
import Constant from '../Block/Constant'
import DataGen from '../Block/DataGen'

export default class Scene {
	private width: number
	private height: number
	private bgColor: string

	private containerId!: string

	public context!: CanvasRenderingContext2D

	static CELL = 13
	static FONT_SIZE = (Scene.CELL * 4) / 5

	private running: boolean = false
	private blocks: Map<string, Block> = new Map()
	private links: Map<string, Link> = new Map()
	private branchingLinks: Map<string, BranchingLink> = new Map()
	private lastTime: number = 0

	private mode: SceneMode = 'normal'

	constructor(
		containerId: string,
		width: number,
		height: number,
		bgColor: string = 'white'
	) {
		this.width = width
		this.height = height
		this.bgColor = bgColor

		this.containerId = containerId

		this.init()

		this.render(0)
	}

	private init(): void {
		const container = document.getElementById(this.containerId)
		const canvas = document.createElement('canvas')
		canvas.height = this.height * Scene.CELL
		canvas.width = this.width * Scene.CELL
		container?.appendChild(canvas)

		this.context = canvas.getContext('2d') as CanvasRenderingContext2D
		this.context.save()
	}

	public createBlock(
		x: number,
		y: number,
		w: number,
		h: number,
		color?: string
	): Block {
		const _block = new Block(this.context, x, y, w, h, color)
		this.blocks.set(_block.id, _block)
		return _block
	}

	public createLink(srcPort: Port, desPort: Port): Link {
		const _link = new Link(this.context, srcPort, desPort)
		this.links.set(_link.id, _link)
		return _link
	}

	public createBranchingLink(): BranchingLink {
		const _branchingLink = new BranchingLink(this.context)
		this.branchingLinks.set(_branchingLink.id, _branchingLink)
		return _branchingLink
	}

	public createRegister(x: number, y: number): Register {
		const _register = new Register(this.context, x, y)
		this.blocks.set(_register.id, _register)
		return _register
	}

	public createIMemory(x: number, y: number): IMemory {
		const _iMemory = new IMemory(this.context, x, y)
		this.blocks.set(_iMemory.id, _iMemory)
		return _iMemory
	}

	public createDMemory(x: number, y: number): DMemory {
		const _dMemory = new DMemory(this.context, x, y)
		this.blocks.set(_dMemory.id, _dMemory)
		return _dMemory
	}

	public createPC(x: number, y: number): PC {
		const _pc = new PC(this.context, x, y)
		this.blocks.set(_pc.id, _pc)
		return _pc
	}

	public createALUControl(x: number, y: number): ALUControl {
		const _aluControl = new ALUControl(this.context, x, y)
		this.blocks.set(_aluControl.id, _aluControl)
		return _aluControl
	}

	public createControl(x: number, y: number): Control {
		const _control = new Control(this.context, x, y)
		this.blocks.set(_control.id, _control)
		return _control
	}

	public createImmGen(x: number, y: number): ImmGen {
		const _immGen = new ImmGen(this.context, x, y)
		this.blocks.set(_immGen.id, _immGen)
		return _immGen
	}

	public createShiftLeft(x: number, y: number): ShiftLeft {
		const _shiftLeft = new ShiftLeft(this.context, x, y)
		this.blocks.set(_shiftLeft.id, _shiftLeft)
		return _shiftLeft
	}

	public createShiftLeft12(x: number, y: number): ShiftLeft12 {
		const _shiftLeft12 = new ShiftLeft12(this.context, x, y)
		this.blocks.set(_shiftLeft12.id, _shiftLeft12)
		return _shiftLeft12
	}

	public createMux(
		x: number,
		y: number,
		portBottom?: boolean,
		flipPort?: boolean
	): Mux {
		const _mux = new Mux(this.context, x, y, portBottom, flipPort)
		this.blocks.set(_mux.id, _mux)
		return _mux
	}

	public createAND(x: number, y: number): AND {
		const _and = new AND(this.context, x, y)
		this.blocks.set(_and.id, _and)
		return _and
	}

	public createALU(x: number, y: number): ALU {
		const _alu = new ALU(this.context, x, y)
		this.blocks.set(_alu.id, _alu)
		return _alu
	}

	public createADD(x: number, y: number, type?: 'sm' | 'lg'): ADD {
		const _add = new ADD(this.context, x, y, type)
		this.blocks.set(_add.id, _add)
		return _add
	}

	public createJumpControl(x: number, y: number): JumpControl {
		const _jumpControl = new JumpControl(this.context, x, y)
		this.blocks.set(_jumpControl.id, _jumpControl)
		return _jumpControl
	}

	public createBranch(x: number, y: number): Branch {
		const _branch = new Branch(this.context, x, y)
		this.blocks.set(_branch.id, _branch)
		return _branch
	}

	public createMux3(x: number, y: number): Mux3 {
		const _mux3 = new Mux3(this.context, x, y)
		this.blocks.set(_mux3.id, _mux3)
		return _mux3
	}

	public createConstant(x: number, y: number, value: number): Constant {
		const _constant = new Constant(this.context, x, y, value)
		this.blocks.set(_constant.id, _constant)
		return _constant
	}

	public createDataGen(x: number, y: number): DataGen {
		const _dataGen = new DataGen(this.context, x, y)
		this.blocks.set(_dataGen.id, _dataGen)
		return _dataGen
	}

	public start(): void {
		if (this.running) {
			return
		}

		this.running = true
		this.loop(0)
	}

	public stop(): void {
		if (!this.running) {
			return 
		}

		this.running = false
	}

	private loop(t: number = 0): void {
		if (!this.running) {
			return
		}
		const now = performance.now()
		// console.log("t: ", t);

		if (this.lastTime === 0) {
			this.lastTime = now
		}
		const dt = now - this.lastTime
		this.render(dt)
		requestAnimationFrame(this.loop.bind(this))
	}

	public render(dt: number): void {
		const w = this.width * Scene.CELL
		const h = this.height * Scene.CELL

		this.context.fillStyle = this.bgColor
		this.context.clearRect(0, 0, w, h)

		this.renderMode()

		for (const [, block] of this.blocks.entries()) {
			block.render(dt)
		}

		for (const [, link] of this.links.entries()) {
			link.render(dt)
		}

		for (const [, brachingLink] of this.branchingLinks.entries()) {
			brachingLink.render(dt)
		}
	}

	public destroy(): void {
		for (const [, block] of this.blocks.entries()) {
			block.destroy()
		}

		this.blocks.clear()
		this.lastTime = 0
	}

	private renderMode(): void {
		// console.log("mode");

		if (this.mode === 'grid') {
			const w = this.width * Scene.CELL
			const h = this.height * Scene.CELL

			for (let x = 0; x <= w; x += Scene.CELL) {
				for (let y = 0; y <= h; y += Scene.CELL) {
					this.context.beginPath()
					this.context.arc(x, y, 2, 0, 2 * Math.PI)
					this.context.fillStyle = '#aecbfa'
					this.context.fill()
					this.context.closePath()
				}
			}
		}
	}

	public useNormalMode(): void {
		this.mode = 'normal'
	}

	public useGridMode(): void {
		this.mode = 'grid'
	}
}
