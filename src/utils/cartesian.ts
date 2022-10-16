import { Vector2 } from "./math/Vector2";

export const convertCartesianToScreenPoint = (
  canvas: HTMLCanvasElement,
  cartesianPoint: Vector2
) => {
  const screenPoint = cartesianPoint.add(
    new Vector2(canvas.width / 2, canvas.height / 2)
  );
  return screenPoint;
};
