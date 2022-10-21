import { Vector2 } from "utils/math/Vector2";

export abstract class BaseContinent {
  abstract points: Array<Vector2>;
  abstract size: number;
  constructor() {}

  abstract draw(
    origin: Vector2,
    color: { r: number; g: number; b: number; a: number }
  ): void;
}
