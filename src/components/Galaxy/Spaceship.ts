import { convertCartesianToScreenPoint } from "utils/cartesian";
import { Vector2 } from "utils/math/Vector2";
import { Rotator2D } from "utils/rotator2d";
import spaceship from "../../assets/spaceship.png";
import { Planet } from "./Planet";

// https://blog.naver.com/ivory82/220241862037
export class Spaceship {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasEdgePosition: Vector2;
  // currentPosition: Vector2;
  progress: number;
  imageElement: HTMLImageElement;
  planetRotator: Rotator2D;
  edgeRotator: Rotator2D;
  planet: Planet;
  id: number;
  constructor(
    canvas: HTMLCanvasElement,
    canvasEdgePosition: Vector2,
    planetRotator: Rotator2D,
    edgeRotator: Rotator2D,
    planet: Planet
  ) {
    this.progress = 0;
    this.id = Math.random();
    this.canvasEdgePosition = canvasEdgePosition;
    this.canvas = canvas;
    this.planet = planet;
    this.ctx = canvas.getContext("2d")!;
    this.planetRotator = planetRotator;
    this.edgeRotator = edgeRotator;
    const img = new Image();
    this.imageElement = img;
    img.src = spaceship;

    img.onload = () => {
      this.draw();
    };
  }

  draw() {
    this.progress++;
    const dx = this.canvasEdgePosition.x - this.planet.position.x;
    const dy = this.canvasEdgePosition.y - this.planet.position.y;
    const angle = Math.atan2(dy, dx);
    this.ctx.save();
    const correctedEdgePosition = convertCartesianToScreenPoint(
      this.canvas,
      this.canvasEdgePosition
    );
    const imageWidth = this.imageElement.width / 10;
    const imageHeight = this.imageElement.height / 10;
    const imageHalfWidth = imageWidth / 2;
    const imageHalfHeight = imageHeight / 2;
    this.ctx.translate(
      Math.cos(angle) - this.progress * Math.cos(angle),
      Math.sin(angle) - this.progress * Math.sin(angle)
    );

    // this part is for drawing center-rotated image
    this.ctx.translate(
      imageHalfWidth + correctedEdgePosition.x,
      imageHalfHeight + correctedEdgePosition.y
    );

    this.ctx.translate(-imageHalfWidth, -imageHalfHeight);
    this.ctx.rotate(-(-Math.PI / 2 - angle) + Math.PI);

    this.ctx.drawImage(
      this.imageElement,
      -imageHalfWidth,
      -imageHalfHeight,
      imageWidth,
      imageHeight
    );
    this.ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    this.ctx.fillStyle = "blue";
    this.ctx.fill();
    this.ctx.restore();
  }
}
