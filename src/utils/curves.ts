import { Vector2 } from "./math/Vector2";

export function midPointBtw(p1: Vector2, p2: Vector2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
}
