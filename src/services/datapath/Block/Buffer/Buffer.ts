import Block from '..'
import Scene from '../../Scene'
import BSection from './BSection'

export default class Buffer extends Block {
    private sections: BSection[] = []

    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number = 4,
        h: number = 10,
    ) {
        super(context, x, y, w, h)
        this.enableRenderDefault = false
    }

    public render(dt: number): void {
        super.render(dt)

        if (!this.sections) {
            return
        }
        for (const _section of this.sections) {
            _section.render(dt)
        }
    }

    public createSection(h: number): BSection {
        if (this.sections.length > 0) {
            const lastSection = this.sections[this.sections.length - 1]
            const x = this.x
            const y = lastSection.getXY().y + lastSection.height
            const w = this.width
            const _section = new BSection(this.context, x, y, w, h)
            this.sections.push(_section)
            return _section
        }

        const _section = new BSection(this.context, this.x, this.y, this.width, h)
        this.sections.push(_section)
        return _section
    }

    public getSection(index: number): BSection {
        return this.sections[index]
    }

    public destroy(): void {
        super.destroy()
        for (const _section of this.sections) {
            _section.destroy()
        }
        this.sections = []
    }
}
