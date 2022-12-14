import { midPointBtw } from "utils/curves";
import { Vector2 } from "utils/math/Vector2";

export class Continent {
  canvas: HTMLCanvasElement;
  points: Vector2[];
  scale: number = 1;
  planetRadius: number;
  constructor(
    canvas: HTMLCanvasElement,
    points: Vector2[],
    planetRadius: number,
    scale = 1
  ) {
    this.canvas = canvas;
    this.points = points;
    this.scale = scale;
    this.planetRadius = planetRadius;
  }

  drawAsGlacier(origin: Vector2) {
    const ctx = this.canvas.getContext("2d")!;
    ctx.save();
    // ctx.transform(1, 0, 0, -1, origin.x * 2, origin.y * 2);

    ctx.beginPath();

    ctx.moveTo(
      this.points[0].x * this.scale * 1.1 + origin.x,
      -this.points[0].y * this.scale * 1.1 + origin.y
    );

    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];
      ctx.lineTo(
        point.x * this.scale * 1.1 + origin.x,
        -point.y * this.scale * 1.1 + origin.y
      );
    }

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";

    ctx.fill();

    ctx.closePath();

    ctx.restore();
  }

  draw(
    origin: Vector2,
    color: { r: number; g: number; b: number; a: number } | string,
    planetOrigin: Vector2
  ) {
    const ctx = this.canvas.getContext("2d")!;
    // this.drawAsGlacier(origin);

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
    // if (
    //   Math.sqrt(
    //     origin.squareDistanceTo(
    //       new Vector2(planetOrigin.x, planetOrigin.y - this.planetRadius)
    //     )
    //   ) <
    //     this.planetRadius * 0.5 ||
    //   Math.sqrt(
    //     origin.squareDistanceTo(
    //       new Vector2(planetOrigin.x, planetOrigin.y + this.planetRadius)
    //     )
    //   ) <
    //     this.planetRadius * 0.5
    // ) {
    //   // ctx.fillStyle = "white";
    // }
    ctx.fill();

    ctx.closePath();

    ctx.restore();
    return;
  }
}
