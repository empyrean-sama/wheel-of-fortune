import { drawCircle, drawSector } from "./draw_commands";
import { ECircleDrawStyle } from "./ECircleDrawStyle";
import { circleProperties, getCtx, sectors } from "./globalProp";

export function startDrawFrame() {
    window.requestAnimationFrame(drawFrame_internal);
}

function drawFrame_internal(): void {
    const ctx = getCtx();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawFrame();
    window.requestAnimationFrame(drawFrame_internal);
}

// this is the main render loop
export function drawFrame() {
    if(sectors.length === 0) {
        drawCircle(circleProperties.radius, ECircleDrawStyle.bothStrokeAndFill, undefined, 'rgb(0,0,0)', 'rgb(0,0,0)');
    }
    else {
        sectors.forEach(sector => drawSector(sector));
    }
}
