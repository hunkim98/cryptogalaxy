import { Vector2 } from "./math/Vector2";

export const convertCartesianToScreenPoint = (
  canvas: HTMLCanvasElement,
  cartesianPoint: Vector2,
  dpr: number
) => {
  const screenPoint = cartesianPoint.add(
    new Vector2(canvas.width / dpr / 2, canvas.height / dpr / 2)
  );
  return screenPoint;
};
