import degToRad from 'deg2rad';
import { ECircleDrawStyle } from './ECircleDrawStyle';
import { getCtx, circleProperties } from './globalProp';

/**
 * Draw a sector on the canvas using this function, defaults will be brought from circleProperties
 * @param sector: define the sector to be drawn
 * @returns nothing, just an output on the canvas
 */
export function drawSector(sector: ISector): void {
    const ctx = getCtx();
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
export function drawCircle(radius: number, circleDrawStyle: ECircleDrawStyle = ECircleDrawStyle.onlyFill, center: IPoint2D | undefined = undefined, fillColor?: string, strokeColor?: string) {

    const ctx = getCtx();
    
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