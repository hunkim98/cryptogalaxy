import { CryptoDataFields } from "context/CryptoContext";
import {
  changeRelativeValueToRealValue,
  changeRelativeValueToRealValueInversed,
} from "utils/clamp";
import { generateRandomName } from "utils/generateRandomName";
import { convertCartesianToScreenPoint } from "../../utils/cartesian";
import { Vector2 } from "../../utils/math/Vector2";
import { Rotator2D } from "../../utils/rotator2d";
import { Continent } from "./Continent";
import { ContinentSamples } from "./Continents/Examples";
import { Spaceship, SpaceshipDirection } from "./Spaceship";
import { Sun } from "./Sun";

export class Planet {
  name: string;
  canvas: HTMLCanvasElement;
  rotator: Rotator2D;
  radius: number;
  position: Vector2;
  speed: number;
  increaseRatio: number;
  distanceFromSun: number;
  correlationCoefficient: number;
  spaceShips: Array<Spaceship>;
  continents: Array<Continent>;
  continentOrigins: Array<Vector2>;
  ctx: CanvasRenderingContext2D;
  price: number;
  support: Array<number>;
  resistance: Array<number>;
  greenness: number | null = null;
  spaceShipCount: number;
  spaceShipDirection: SpaceshipDirection;
  spaceShipRegenerationInterval: number;
  currentPriceRelativeLocation: number = 0.5;
  finalResistancePrice: number | null = null;
  finalSupportPrice: number | null = null;
  foreColor: string;
  backColor: string;
  rsi: number;
  constructor(
    canvas: HTMLCanvasElement,
    correlationCoefficient: number,
    increaseRatio: number,
    radius: number,
    name: string,
    price: number,
    support: Array<number>,
    resistance: Array<number>,
    rsi: number,
    foreColor: string,
    backColor: string
  ) {
    this.name = name;
    this.foreColor = foreColor;
    this.backColor = backColor;
    this.canvas = canvas;
    this.rotator = new Rotator2D(Math.random() * 360);
    this.correlationCoefficient = correlationCoefficient;
    this.radius = radius;
    this.distanceFromSun = this.calcDistanceFromSun(correlationCoefficient);
    this.spaceShips = [];
    this.ctx = this.canvas.getContext("2d")!;
    this.price = price;

    this.resistance = resistance;
    this.support = support;

    this.increaseRatio = increaseRatio;
    this.speed = this.calcSpeed(increaseRatio);
    this.rsi = rsi;
    const {
      spaceShipCount,
      spaceShipDirection,
      spaceShipRegenerationInterval,
    } = this.setSpaceshipInformation(rsi);
    this.spaceShipCount = spaceShipCount;
    this.spaceShipDirection = spaceShipDirection;
    this.spaceShipRegenerationInterval = spaceShipRegenerationInterval;

    const positionAffineVector = new Vector2(this.distanceFromSun, 0).toAffine(
      true
    );
    const rotateAffineMatrix = this.rotator.getRotateAffineMatrix();
    const shuffledContinents = ContinentSamples.sort(() => 0.5 - Math.random());
    const selectedContinents = shuffledContinents.slice(0, 5);
    this.continents = selectedContinents.map((continent) => {
      return new Continent(this.canvas, continent, this.radius / 2);
    });
    this.position = rotateAffineMatrix
      .multiplyVector(positionAffineVector)
      .toVector2();
    this.continentOrigins = [
      new Vector2(0, -this.radius),
      new Vector2(0, this.radius),
    ];
    if (support.length === 0 && resistance.length === 0) {
      this.greenness = 0;
      this.currentPriceRelativeLocation = 0.5;
    } else if (support.length === 0 && resistance.length !== 0) {
      this.greenness = 30;
      this.currentPriceRelativeLocation = 0;
      this.finalResistancePrice = resistance[resistance.length - 1];
    } else if (support.length !== 0 && resistance.length === 0) {
      this.greenness = 255;
      this.currentPriceRelativeLocation = 1;
      this.finalSupportPrice = support[support.length - 1];
    } else {
      let finalSupportPrice = support[support.length - 1];
      let finalResistancePrice = resistance[resistance.length - 1];
      while (price > finalResistancePrice && resistance.length > 0) {
        resistance.pop();
        finalResistancePrice = resistance[resistance.length - 1];
        this.finalResistancePrice = resistance[resistance.length - 1];
      }
      while (price < finalSupportPrice && support.length > 0) {
        support.pop();
        finalSupportPrice = support[support.length - 1];
        this.finalSupportPrice = support[support.length - 1];
      }
      if (resistance.length === 0) {
        this.greenness = 255;
        this.currentPriceRelativeLocation = 1;
      }
      if (support.length === 0) {
        this.greenness = 10;
        this.currentPriceRelativeLocation = 0;
      }

      if (support.length !== 0 && resistance.length !== 0) {
        this.greenness = changeRelativeValueToRealValue(
          price,
          finalSupportPrice,
          finalResistancePrice,

          10,
          255
        );
        this.currentPriceRelativeLocation = changeRelativeValueToRealValue(
          price,
          finalSupportPrice,
          finalResistancePrice,
          0,
          1
        );
      }
    }
    const leftOriginCount =
      this.continents.length - this.continentOrigins.length;
    for (let i = 0; i < leftOriginCount; i++) {
      const angle = (Math.PI * 2) / leftOriginCount;
      const origin = new Vector2(
        Math.cos(angle * i),
        Math.sin(angle * i)
      ).scalarBy(Math.random() * this.radius);
      this.continentOrigins.push(origin);
    }
    setInterval(() => {
      if (this.spaceShips.length < this.spaceShipCount) {
        this.setSpaceShip();
      }
    }, this.spaceShipRegenerationInterval);
    // this.setSpaceShip();
  }

  update(data: Partial<CryptoDataFields>) {
    if (this.name === "DOGE") {
      console.log("called update", data.increaseRatio, this.price);
    }
    if (data.coefficient) {
      this.correlationCoefficient = data.coefficient;
      this.distanceFromSun = this.calcDistanceFromSun(data.coefficient);
    }
    if (data.increaseRatio) {
      this.increaseRatio = data.increaseRatio;
      this.speed = this.calcSpeed(data.increaseRatio);
    }
    if (data.currentPrice) {
      this.price = data.currentPrice;
    }
    if (data.rsi) {
      this.rsi = data.rsi;
      const {
        spaceShipDirection,
        spaceShipCount,
        spaceShipRegenerationInterval,
      } = this.setSpaceshipInformation(data.rsi);
      this.spaceShipCount = spaceShipCount;
      this.spaceShipRegenerationInterval = spaceShipRegenerationInterval;
      this.spaceShipDirection = spaceShipDirection;
    }
  }

  setSpaceshipInformation(rsi: number) {
    let spaceShipCount = 0;
    let spaceShipDirection: SpaceshipDirection = SpaceshipDirection.IN;
    let spaceShipRegenerationInterval = 20000;
    if (rsi >= 70) {
      spaceShipCount = 3;
      spaceShipDirection = SpaceshipDirection.IN;
      spaceShipRegenerationInterval = 5000;
    } else if (60 <= rsi && rsi < 70) {
      spaceShipCount = 1;
      spaceShipDirection = SpaceshipDirection.IN;
      spaceShipRegenerationInterval = 10000;
    } else if (40 <= rsi && rsi < 60) {
      spaceShipCount = 0;
      spaceShipDirection = SpaceshipDirection.OUT;
      spaceShipRegenerationInterval = 20000;
    } else if (30 <= rsi && rsi < 40) {
      spaceShipCount = 1;
      spaceShipDirection = SpaceshipDirection.OUT;
      spaceShipRegenerationInterval = 10000;
    } else {
      spaceShipCount = 3;
      spaceShipDirection = SpaceshipDirection.OUT;
      spaceShipRegenerationInterval = 5000;
    }
    return {
      spaceShipCount,
      spaceShipDirection,
      spaceShipRegenerationInterval,
    };
  }

  calcSpeed(increaseRatio: number) {
    const maxSpeed = 0.3;
    const minSpeed = 0.02;

    const speed = changeRelativeValueToRealValue(
      increaseRatio,
      0,
      1,
      minSpeed,
      maxSpeed
    );
    return speed;
  }

  calcDistanceFromSun(correlationCoefficient: number) {
    const minDistance = Sun.radius + 20 + this.radius;
    const maxDistance = 400 + Sun.radius - this.radius;

    const distance = changeRelativeValueToRealValueInversed(
      // the bigger the correlation coefficient
      // the more similar is it to the sun
      correlationCoefficient,
      -0.1,
      0.2,
      minDistance,
      maxDistance
    );
    return distance;
  }

  getCanvasOuterTrajectoryPoint() {
    const rotatorAdvanceAmount = 20;
    const bandWidthDegree = 3;
    const minRotatorDegree =
      this.rotator.degree + rotatorAdvanceAmount - bandWidthDegree;
    const maxRotatorDegree =
      this.rotator.degree + rotatorAdvanceAmount + bandWidthDegree;
    const criterionRotator = new Rotator2D(
      Math.random() * (maxRotatorDegree - minRotatorDegree) + minRotatorDegree
      // Math.random() *
      //   (this.rotator.degree +
      //     bandWidthDegree -
      //     //this can be a number like 370
      //     (this.rotator.degree - bandWidthDegree) +
      //     this.rotator.degree -
      //     bandWidthDegree)
    );
    let quadrant = 0b00; //1st qudrant

    if (criterionRotator.degree <= 90 && criterionRotator.degree >= 0) {
      quadrant = 0b00;
    } else if (criterionRotator.degree <= 180) {
      quadrant = 0b01;
    } else if (criterionRotator.degree <= 270) {
      quadrant = 0b11;
    } else {
      quadrant = 0b10;
    }
    criterionRotator.clamp();

    const canvasEdgeStartPointOffset = 100;
    const isBoundToY = Math.abs(Math.tan(criterionRotator.toRadian())) > 1;
    if (isBoundToY) {
      const y =
        quadrant <= 0b01
          ? (this.canvas.height + canvasEdgeStartPointOffset) / 2
          : -(this.canvas.height + canvasEdgeStartPointOffset) / 2;
      const x = y / Math.tan(criterionRotator.toRadian());
      return { edgePosition: new Vector2(x, y), edgeRotator: criterionRotator };
    } else {
      const x =
        quadrant % 2 === 0
          ? (this.canvas.width + canvasEdgeStartPointOffset) / 2
          : -(this.canvas.width + canvasEdgeStartPointOffset) / 2;
      const y = Math.tan(criterionRotator.toRadian()) * x;
      return { edgePosition: new Vector2(x, y), edgeRotator: criterionRotator };
    }
  }
  setSpaceShip() {
    const { edgePosition, edgeRotator } = this.getCanvasOuterTrajectoryPoint();
    if (this.spaceShips.length < this.spaceShipCount) {
      this.spaceShips.push(
        new Spaceship(
          this.canvas,
          edgePosition,
          this.rotator,
          edgeRotator,
          this,
          this.spaceShipDirection,
          generateRandomName()
        )
      );
    }
  }

  drawSpaceShips() {
    for (const spaceShip of this.spaceShips) {
      spaceShip.draw();
    }
  }

  removeSpaceShip(spaceShipId: string) {
    this.spaceShips = this.spaceShips.filter(
      (spaceShip) => spaceShip.id !== spaceShipId
    );
  }

  drawContinents(origin: Vector2) {
    this.ctx.save();
    for (const continentOrigin of this.continentOrigins) {
      const continent = this.continents.shift()!;

      this.ctx.arc(origin.x, origin.y, this.radius, 0, 2 * Math.PI, false);
      this.ctx.clip();
      continent.draw(origin.add(continentOrigin), this.foreColor);

      this.continents.push(continent);
    }
    this.ctx.restore();
  }

  drawTrajectory() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.distanceFromSun,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.strokeStyle = this.foreColor;
    this.ctx.globalAlpha = 0.3;
    this.ctx.lineWidth = 0.5;
    this.ctx.stroke();
    // this.ctx.fill();
    this.ctx.restore();
  }

  draw() {
    this.drawSpaceShips();
    this.rotator.degree += this.speed;
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

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(
      drawPosition.x,
      drawPosition.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fillStyle = this.backColor;
    this.ctx.fill();
    this.ctx.closePath();
    // this.ctx.fillStyle = `rgba(${
    //   this.greenness ? 255 - this.greenness : 0
    // }, ${0}, ${this.greenness ?? 0}, ${1})`;
    this.ctx.restore();

    this.drawContinents(drawPosition);

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(drawPosition.x, drawPosition.y, this.radius, 0, 2 * Math.PI);
    if (this.name === "DOGE" || this.name === "XRP") {
      console.log("support", this.finalSupportPrice);
      console.log("resistance", this.finalResistancePrice);
      console.log("current", this.price);
      console.log(this.currentPriceRelativeLocation);
    }
    this.ctx.fillStyle = `rgba(0, 0, 0, ${changeRelativeValueToRealValueInversed(
      this.currentPriceRelativeLocation,
      0,
      1,
      0,
      0.8
    )})`;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();

    this.ctx.save();

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
    this.ctx.font = "12px Righteous";
    this.ctx.fillText(
      this.name,
      drawPosition.x,
      drawPosition.y + this.radius + 15
    );
    // this.ctx.fillText(
    //   this.rotator.degree.toFixed(2),
    //   drawPosition.x,
    //   drawPosition.y + this.radius + 30
    // );

    this.ctx.restore();
  }
}
