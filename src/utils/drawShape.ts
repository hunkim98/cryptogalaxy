import { Vector2 } from "./math/Vector2";

export const drawRoundRect = (
  ctx: CanvasRenderingContext2D,
  drawingStartPoint: Vector2,
  drawPosition: Vector2,
  borderRadius: number,
  width: number,
  height: number
) => {
  ctx.beginPath();
  ctx.moveTo(drawingStartPoint.x, drawingStartPoint.y);
  ctx.arcTo(
    drawPosition.x + width,
    drawPosition.y,
    drawPosition.x + width,
    drawPosition.y + height,
    borderRadius
  );
  ctx.arcTo(
    drawPosition.x + width,
    drawPosition.y + height,
    drawPosition.x,
    drawPosition.y + height,
    borderRadius
  );
  ctx.arcTo(
    drawPosition.x,
    drawPosition.y + height,
    drawPosition.x,
    drawPosition.y,
    borderRadius
  );
  ctx.arcTo(
    drawPosition.x,
    drawPosition.y,
    drawPosition.x + width,
    drawPosition.y,
    borderRadius
  );
  ctx.closePath();
};
