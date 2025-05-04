import { ECircleDrawStyle } from './ECircleDrawStyle';
import degToRad from 'deg2rad';

// all default properties while drawing sectors or circles or anything of that nature inside the canvas must be stored here
const circleProperties = {
    radius: 100,
    center: {x: 200, y: 200}
};

// Initialize the canvas and determine wether the website can function on this device
const canvas = document.getElementById('wheel-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
if(!ctx) {
    throw new Error('canvas context is unable, cannot render this website');
}

/**
 * Draw a sector on the canvas using this function, defaults will be brought from circleProperties
 * @param sector: define the sector to be drawn
 * @returns nothing, just an output on the canvas
 */
function drawSector(sector: ISector): void {
    ctx.beginPath();
    ctx.fillStyle = sector.fillColor;
    ctx.arc(circleProperties.center.x, circleProperties.center.y, circleProperties.radius, degToRad(sector.startAngle), degToRad(sector.startAngle + sector.degrees), false);
    ctx.lineTo(circleProperties.center.x, circleProperties.center.y)
    ctx.fill();
}

/**
 * Draw a circle on the canvas
 * todo: the api can probably make radius optional and get it from circleProperties
 * @param radius: the radius of the circle to be drawn, must be specified for now
 * @param circleDrawStyle: specify how to draw this circle
 * @param center: the center of this circle, not specifying a IPoint2D will mean getting from the global defaults
 * @param fillColor: the fill color, an optional property only to be specified if circle draw style requires drawing with fill
 * @param strokeColor: the stroke color, an optional property only to be specified if circle draw style requires drawing with stroke
 * @throws an Exception if circleDrawStyle is improper or if parameters required to draw something of that style were not defined
 * @returns nothing, draws a circle on the canvas though
 */
function drawCircle(radius: number, circleDrawStyle: ECircleDrawStyle = ECircleDrawStyle.onlyFill, center: IPoint2D | undefined = undefined, fillColor?: string, strokeColor?: string) {
    
    // Check if I can draw the type of circle with the given coordinates
    switch(circleDrawStyle) {
        case ECircleDrawStyle.onlyFill:
            if(!fillColor) {
                throw new Error('cannot draw a circle with only fill without specifying a fill color');
            }
            break;
        case ECircleDrawStyle.onlyStroke:
            if(!strokeColor) {
                throw new Error('cannot draw a circle with only stroke without specifying a stroke color');
            }
            break;
        case ECircleDrawStyle.bothStrokeAndFill:
            if(!strokeColor) {
                throw new Error('cannot draw a circle with both stroke and fill without specifying a stroke color');
            }
            if(!fillColor) {
                throw new Error('cannot draw a circle with both stroke and fill without specifying a fill color');
            }
            break;
        default:
            throw new Error(`cannot draw a circle of type: '${circleDrawStyle}'`);
    }

    // Check if I should be using a custom center
    center = center || circleProperties.center;
    
    // Draw the circle in question
    ctx.beginPath();
    ctx.fillStyle = (fillColor) ? fillColor : 'rgb(0,0,0)';
    ctx.strokeStyle = (strokeColor) ? strokeColor : 'rgb(0,0,0)';
    ctx.arc(center.x, center.y, radius, 0, degToRad(360), false);
    switch(circleDrawStyle) {
        case ECircleDrawStyle.onlyFill:
            ctx.fill();
            break;
        case ECircleDrawStyle.onlyStroke:
            ctx.stroke();
            break;
        case ECircleDrawStyle.bothStrokeAndFill:
            ctx.fill();
            ctx.stroke();
            break;
    }
}

// drawSector({
//     startAngle: 0,
//     degrees: 90,
//     fillColor: "rgb(255,0,255)",
//     name: 'test'
// });
// drawCircle(100, ECircleDrawStyle.onlyStroke, undefined, undefined, "rgb(0,0,0)");