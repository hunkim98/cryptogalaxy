import { Vector2 } from "utils/math/Vector2";

export class Continent {
  canvas: HTMLCanvasElement;
  points: Vector2[];
  scale: number = 1;
  constructor(canvas: HTMLCanvasElement, points: Vector2[], scale = 1) {
    this.canvas = canvas;
    this.points = points;
    this.scale = scale;
  }

  draw(origin: Vector2, color: { r: number; g: number; b: number; a: number }) {
    const ctx = this.canvas.getContext("2d")!;

    ctx.save();
    // ctx.transform(1, 0, 0, -1, origin.x * 2, origin.y * 2);
    ctx.beginPath();
    ctx.moveTo(
      this.points[0].x * this.scale + origin.x,
      -this.points[0].y * this.scale + origin.y
    );
    for (const point of this.points) {
      ctx.lineTo(
        point.x * this.scale + origin.x,
        -point.y * this.scale + origin.y
      );
    }

    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    return;
  }
}
