import { Vector2 } from "utils/math/Vector2";
import { BaseContinent } from "./Base";

export class ContinentA extends BaseContinent {
  canvas: HTMLCanvasElement;
  points: Vector2[];
  size = 100;
  constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.points = [
      new Vector2(0, this.size / 2),
      new Vector2(-this.size / 4, this.size / 2 + this.size / 8),
      new Vector2(-this.size / 2, this.size / 2 - this.size / 8),
      new Vector2(-this.size / 3, -this.size / 10),
      new Vector2(-this.size / 1.5, -this.size / 8),
      new Vector2(0, -this.size / 2),
      new Vector2(this.size / 4, -this.size / 3),
      new Vector2(this.size / 5, this.size / 7),
      new Vector2(this.size / 2, this.size / 4),
      new Vector2(this.size / 2.5, this.size / 2.5),
      new Vector2(this.size / 6, this.size / 3),
    ];
  }

  draw(origin: Vector2, color: { r: number; g: number; b: number; a: number }) {
    const ctx = this.canvas.getContext("2d")!;
    ctx.save();
    ctx.moveTo(this.points[0].x + origin.x, this.points[0].y + origin.y);
    for (const point of this.points) {
      ctx.lineTo(point.x + origin.x, point.y + origin.y);
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    ctx.fill();
    ctx.restore();
    return;
  }
}
