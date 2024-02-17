import Port from '../../Port'
import PC from './PC'

type BlockPort = 'input' | 'output' | 'input-control'

export default class ControlledPC extends PC {
    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        super(context, x, y)

        this.createPort(1, 0, 'input', 'aqua', 'input-control')
    }

    public getPort(id: BlockPort): Port {
        return super.getPort(id as any) as Port
    }
}
