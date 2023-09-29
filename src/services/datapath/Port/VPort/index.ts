import Port from '..';

export interface PortOptions {
    color?: string;
    radius?: number;
}

export default class VPort extends Port {
    private active: boolean = false;
    private options: PortOptions;
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        options: PortOptions = {},
    ) {
        super(context, x, y, options.color);
        this.options = options;
    }

    public render(dt: number): void {
        super.render(dt);
        this.context.fillStyle = this.active ? 'red' : this.options?.color ?? 'black';
        this.context.fill();
        this.context.restore();
    }

    public load(data: any, callback?: (() => void) | undefined): void {
        super.load(data, callback);
        this.active = true;
    }
}
