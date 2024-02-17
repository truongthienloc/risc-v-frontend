import Block from '..'
import Port from '../../Port'
import Scene from '../../Scene'

type BlockText = {
    text: string
    x: number
    y: number
    bold: boolean
    textAlign: CanvasTextAlign
    textBaseline: CanvasTextBaseline
    textColor: string
}

export default class BSection extends Block {
    private texts: BlockText[] = []

    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number = 4.5,
        h: number = 10,
    ) {
        super(context, x, y, w, h)
    }

    public render(dt: number): void {
        super.render(dt)

        if (!this.texts) {
            return
        }
        for (const _text of this.texts) {
            this.createText(
                _text.text,
                _text.x,
                _text.y,
                _text.bold,
                _text.textAlign,
                _text.textBaseline,
                _text.textColor,
            )
        }
    }

    public addText(
        text: string,
        x: number,
        y: number,
        bold: boolean = true,
        textAlign: CanvasTextAlign = 'left',
        textBaseline: CanvasTextBaseline = 'top',
        textColor: string = Scene.BORDER_COLOR,
    ): void {
        this.texts.push({ text, x, y, bold, textAlign, textBaseline, textColor })
    }

    public destroy(): void {
        this.texts = []
    }

    public getPort(id: string): Port {
        return super.getPort(id) as Port
    }
}
