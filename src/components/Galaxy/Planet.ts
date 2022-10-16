import { convertCartesianToScreenPoint } from "../../utils/cartesian";
import { Vector2 } from "../../utils/math/Vector2";
import { Rotator } from "../../utils/rotator2d";
import { Spaceship } from "./Spaceship";

export class Planet {
  canvas: HTMLCanvasElement;
  rotator: Rotator;
  radius: number;
  position: Vector2;
  speed: number;
  distanceFromSun: number;
  spaceShips: Array<Spaceship>;
  constructor(
    canvas: HTMLCanvasElement,
    distanceFromSun: number,
    speed: number,
    radius: number
  ) {
    this.canvas = canvas;
    this.speed = speed;
    this.rotator = new Rotator(Math.random() * 360);
    this.distanceFromSun = distanceFromSun;
    this.radius = radius;
    this.spaceShips = [];
    const positionAffineVector = new Vector2(distanceFromSun, 0).toAffine(true);
    const rotateAffineMatrix = this.rotator.getRotateAffineMatrix();
    this.position = rotateAffineMatrix
      .multiplyVector(positionAffineVector)
      .toVector2();
  }

  draw() {
    this.rotator.degree++;
    const positionAffineVector = new Vector2(this.distanceFromSun, 0).toAffine(
      true
    );
    const rotateAffineMatrix = this.rotator.getRotateAffineMatrix();
    this.position = rotateAffineMatrix
      .multiplyVector(positionAffineVector)
      .toVector2();
    const drawPosition = convertCartesianToScreenPoint(
      this.canvas,
      this.position
    );
    const ctx = this.canvas.getContext("2d")!;
    ctx.save();
    ctx.beginPath();
    ctx.arc(drawPosition.x, drawPosition.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    ctx.save();
  }
}
