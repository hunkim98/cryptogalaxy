import { changeRelativeValueToRealValue } from "utils/clamp";
import { convertCartesianToScreenPoint } from "../../utils/cartesian";
import { Vector2 } from "../../utils/math/Vector2";

export class Sun {
  canvas: HTMLCanvasElement;
  radius = 130;
  color = "#FFFF4D";
  brightness: number = 0;
  position: Vector2 = new Vector2(0, 0);
  MIN_BRIGHTNESS = 2;
  MAX_BRIGHTNESS = 20;
  increaseRatio?: number;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  setBrightness(increaseRatio: number) {
    this.increaseRatio = increaseRatio;
    this.brightness = changeRelativeValueToRealValue(
      increaseRatio,
      -1,
      1,
      this.MIN_BRIGHTNESS,
      this.MAX_BRIGHTNESS
    );
  }

  drawBrightnessInner(drawPosition: Vector2, ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      drawPosition.x,
      drawPosition.y,
      this.radius + this.brightness / 2,
      0,
      2 * Math.PI,
      false
    );
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fill();
    ctx.restore();
  }

  drawBrightnessOuter(drawPosition: Vector2, ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      drawPosition.x,
      drawPosition.y,
      this.radius + this.brightness,
      0,
      2 * Math.PI,
      false
    );
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.fill();
    ctx.restore();
  }

  drawSun(drawPosition: Vector2, ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(drawPosition.x, drawPosition.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
  draw() {
    const ctx = this.canvas.getContext("2d")!;
    const drawPosition = convertCartesianToScreenPoint(
      this.canvas,
      this.position
    );
    this.drawBrightnessInner(drawPosition, ctx);
    this.drawBrightnessOuter(drawPosition, ctx);
    this.drawSun(drawPosition, ctx);
  }
}
