import { convertCartesianToScreenPoint } from "../../utils/cartesian";
import { Vector2 } from "../../utils/math/Vector2";

export class Sun {
  canvas: HTMLCanvasElement;
  radius = 150;
  color = "#FFFF4D";
  position: Vector2 = new Vector2(0, 0);
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  draw() {
    const drawPosition = convertCartesianToScreenPoint(
      this.canvas,
      this.position
    );

    const ctx = this.canvas.getContext("2d")!;
    ctx.save();
    ctx.beginPath();
    ctx.arc(drawPosition.x, drawPosition.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.save();
  }

  updateBrightness(increaseRatio: number) {
    console.log(increaseRatio);
  }
}
