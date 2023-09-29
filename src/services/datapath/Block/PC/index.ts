import Block from '..';
import Port from '../../Port';

type BlockPort = 'input' | 'output';

export default class PC extends Block {
    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        super(context, x, y, 2, 5, 'white');

        this.createPort(0, 2.5, 'input', this.borderColor, 'input');

        this.createPort(this.width, 2.5, 'output', this.borderColor, 'output');
    }

    public render(dt: number): void {
        super.render(dt);

        this.renderText();
    }

    private renderText(): void {
        this.createText('PC', this.width / 2, this.height / 2, true, 'center', 'middle');
    }

    public getPort(id: BlockPort): Port {
        return super.getPort(id) as Port;
    }
}
