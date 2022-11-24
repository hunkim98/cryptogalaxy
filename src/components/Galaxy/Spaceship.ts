import { convertCartesianToScreenPoint } from "utils/cartesian";
import { Vector2 } from "utils/math/Vector2";
import { Rotator2D } from "utils/rotator2d";
import spaceship from "../../assets/spaceship.png";
import { Planet } from "./Planet";

export enum SpaceshipDirection {
  IN = "IN",
  OUT = "OUT",
}

// https://blog.naver.com/ivory82/220241862037
export class Spaceship {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasEdgePosition: Vector2;
  // currentPosition: Vector2;
  progress: number;
  direction: SpaceshipDirection;
  imageElement: HTMLImageElement;
  planetRotator: Rotator2D;
  edgeRotator: Rotator2D;
  planet: Planet;
  id: string;
  opacity: number;
  position: Vector2;
  startPosition: Vector2;
  endPosition: Vector2;
  progressIncreaseDelta: number;
  isDestinationReached: boolean;
  dpr: number;
  constructor(
    canvas: HTMLCanvasElement,
    canvasEdgePosition: Vector2,
    planetRotator: Rotator2D,
    edgeRotator: Rotator2D,
    planet: Planet,
    direction: SpaceshipDirection,
    id: string,
    dpr: number
  ) {
    this.isDestinationReached = false;
    this.id = id;
    this.dpr = dpr;
    this.progress = 0;
    this.opacity = 0;
    this.canvasEdgePosition = canvasEdgePosition;
    this.canvas = canvas;
    this.planet = planet;
    this.progressIncreaseDelta = 1 + this.planet.speed * 3;
    this.ctx = canvas.getContext("2d")!;
    this.planetRotator = planetRotator;
    this.edgeRotator = edgeRotator;
    this.direction = direction;
    const img = new Image();
    this.imageElement = img;
    img.src = spaceship;
    this.position =
      this.direction === SpaceshipDirection.OUT
        ? planet.position
        : canvasEdgePosition;
    if (this.direction === SpaceshipDirection.OUT) {
      this.startPosition = planet.position;
      this.endPosition = canvasEdgePosition;
    } else {
      this.startPosition = canvasEdgePosition;
      this.endPosition = planet.position;
    }

    img.onload = () => {
      this.draw();
    };
  }

  drawTrajectory(angle: number, destinationPosition: Vector2) {
    let trajectoryOpacity = this.opacity;
    if (trajectoryOpacity > 0.5) {
      trajectoryOpacity = 0.5;
    }

    const trajectoryStartingFrom =
      this.direction === SpaceshipDirection.IN
        ? this.position
        : this.position.add(
            new Vector2(Math.cos(angle), Math.sin(angle)).scalarBy(-80)
          );
    const trajectoryEndsAt =
      this.direction === SpaceshipDirection.IN
        ? this.position.add(
            new Vector2(Math.cos(angle), Math.sin(angle)).scalarBy(80)
          )
        : this.position;

    let linePointingSpaceship = convertCartesianToScreenPoint(
      this.canvas,
      trajectoryStartingFrom,
      this.dpr
    );
    const trailingPoint = convertCartesianToScreenPoint(
      this.canvas,
      trajectoryEndsAt,
      this.dpr
    );

    if (this.isDestinationReached) {
      linePointingSpaceship = convertCartesianToScreenPoint(
        this.canvas,
        destinationPosition,
        this.dpr
      );
    }

    if (
      Math.sqrt(trajectoryEndsAt.squareDistanceTo(destinationPosition)) < 10
    ) {
      this.planet.removeSpaceShip(this.id);
    }
    this.ctx.save();

    const grad = this.ctx.createLinearGradient(
      trailingPoint.x,
      trailingPoint.y,
      linePointingSpaceship.x,
      linePointingSpaceship.y
    );
    grad.addColorStop(
      this.direction === SpaceshipDirection.IN ? 0 : 1,
      `rgba(255, 255, 255, 0)`
    );

    if (this.planet.rsi >= 70) {
      grad.addColorStop(
        this.direction === SpaceshipDirection.IN ? 1 : 0,
        `rgba(255, 255, 77, 1)`
      );
    } else {
      grad.addColorStop(
        this.direction === SpaceshipDirection.IN ? 1 : 0,
        `rgba(255, 255, 255, ${trajectoryOpacity})`
      );
    }
    this.ctx.beginPath();
    this.ctx.moveTo(linePointingSpaceship.x, linePointingSpaceship.y);
    this.ctx.lineTo(trailingPoint.x, trailingPoint.y);

    this.ctx.strokeStyle = grad;

    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }

  drawSpaceshipImage(angle: number, destinationPosition: Vector2) {
    if (destinationPosition.squareDistanceTo(this.position) < 10) {
      this.isDestinationReached = true;
    }

    const correctedEdgePosition = convertCartesianToScreenPoint(
      this.canvas,
      this.direction === SpaceshipDirection.IN
        ? this.canvasEdgePosition
        : this.planet.position,
      this.dpr
    );
    const imageWidth = this.imageElement.width / 25;
    const imageHeight = this.imageElement.height / 25;
    const imageHalfWidth = imageWidth / 2;
    const imageHalfHeight = imageHeight / 2;

    this.ctx.save();
    if (this.direction === SpaceshipDirection.IN) {
      this.ctx.translate(
        -this.progress * Math.cos(angle),
        -this.progress * Math.sin(angle)
      );
      this.position = this.canvasEdgePosition.subtract(
        new Vector2(
          this.progress * Math.cos(angle),
          this.progress * Math.sin(angle)
        )
      );
    } else {
      this.ctx.translate(
        this.progress * Math.cos(angle),
        this.progress * Math.sin(angle)
      );

      this.ctx.fillStyle = "yellow";
      this.position = this.planet.position.add(
        new Vector2(
          this.progress * Math.cos(angle),
          this.progress * Math.sin(angle)
        )
      );
    }
    if (this.isDestinationReached) {
      this.ctx.restore();
      return;
    }

    // spaceship opacity
    if (this.opacity < 1) {
      this.opacity += 0.02;
    }

    // this part is for drawing center-rotated image
    this.ctx.translate(
      imageHalfWidth + correctedEdgePosition.x,
      imageHalfHeight + correctedEdgePosition.y
    );

    this.ctx.translate(-imageHalfWidth, -imageHalfHeight);
    if (this.direction === SpaceshipDirection.IN) {
      this.ctx.rotate(-(-Math.PI / 2 - angle) + Math.PI);
    } else {
      this.ctx.rotate(-(-Math.PI / 2 - angle));
    }

    this.ctx.globalAlpha = this.opacity;
    this.ctx.drawImage(
      this.imageElement,
      -imageHalfWidth,
      -imageHalfHeight,
      imageWidth,
      imageHeight
    );
    this.ctx.restore();
  }

  draw() {
    this.progress += this.progressIncreaseDelta;
    const dx = this.canvasEdgePosition.x - this.planet.position.x;
    const dy = this.canvasEdgePosition.y - this.planet.position.y;
    const angle = Math.atan2(dy, dx);
    const destinationPosition =
      this.direction === SpaceshipDirection.OUT
        ? this.canvasEdgePosition
        : this.planet.position;

    this.drawTrajectory(angle, destinationPosition);
    this.drawSpaceshipImage(angle, destinationPosition);
  }
  setDpr(dpr: number) {
    this.dpr = dpr;
  }
}
