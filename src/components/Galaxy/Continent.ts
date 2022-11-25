import { midPointBtw } from "utils/curves";
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

  draw(
    origin: Vector2,
    color: { r: number; g: number; b: number; a: number } | string
  ) {
    const ctx = this.canvas.getContext("2d")!;

    ctx.save();
    // ctx.transform(1, 0, 0, -1, origin.x * 2, origin.y * 2);

    ctx.beginPath();

    ctx.moveTo(
      this.points[0].x * this.scale + origin.x,
      -this.points[0].y * this.scale + origin.y
    );

    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];
      ctx.lineTo(
        point.x * this.scale + origin.x,
        -point.y * this.scale + origin.y
      );
      // below is drawing smooth curve
      // const nextPoint =
      //   i === this.points.length - 1 ? this.points[0] : this.points[i + 1];
      // const midPoint = midPointBtw(point, nextPoint);
      // ctx.quadraticCurveTo(
      //   point.x * this.scale + origin.x,
      //   -point.y * this.scale + origin.y,
      //   midPoint.x * this.scale + origin.x,
      //   -midPoint.y * this.scale + origin.y
      // );
    }

    if (typeof color === "string") {
      ctx.fillStyle = color;
    } else {
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    }
    ctx.fill();

    ctx.closePath();

    ctx.restore();
    return;
  }
}
