// all default properties while drawing sectors or circles or anything of that nature inside the canvas must be stored here
export const circleProperties = {
    radius: 100,
    center: {x: 200, y: 200}
};

export const sectorColors = [
    'rgb(213,15,37)',
    'rgb(51,105,232)',
    'rgb(212,158,15)',
    'rgb(0,145,35)',
]

let ctx: CanvasRenderingContext2D | null = null;
export function getCtx(): CanvasRenderingContext2D {
    if(ctx) {
        return ctx;
    }
    else throw new Error('trying to get the canvas context before initializing it');
}
export function setCtx(context: CanvasRenderingContext2D) {
    if(ctx && ctx !== context) {
        throw new Error('canvas context is already set, trying to set it again..')
    }
    else {
        ctx = context;
    }
}

export const sectors: Array<ISector> = [];