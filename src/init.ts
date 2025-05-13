import { circleProperties, setCtx } from "./globalProp";

let initialized = false;
export function initialize() {

    function regenerateCanvasDimensions() {
        const width = canvasEnclosure.clientWidth;
        const height = canvasEnclosure.clientHeight;
        
        canvas.width = width;
        canvas.height = height;
    
        circleProperties.radius = (Math.min(width, height) / 2) - 12;
        circleProperties.center.x = width / 2;
        circleProperties.center.y = height / 2;
    
    }

    if(initialized) {
        throw new Error('trying to initialize more than once');
    }
    const canvas = document.getElementById('wheel-canvas') as HTMLCanvasElement;
    const canvasEnclosure = document.querySelector('.canvas-enclosure') as HTMLDivElement;
    if(!canvas || !canvasEnclosure) {
        throw new Error('failed to initialize, unable to find canvas or canvas enclosure');
    }
    regenerateCanvasDimensions();
    window.addEventListener('resize', regenerateCanvasDimensions);
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if(!ctx) {
        throw new Error('canvas context is unable, cannot render this website');
    }
    ctx.imageSmoothingEnabled = true;
    setCtx(ctx);
    initialized = true;
    return;
}