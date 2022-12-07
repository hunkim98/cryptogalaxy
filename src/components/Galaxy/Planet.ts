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
import { iceAgeLevel1, iceAgeLevel2, iceAgeLevel3 } from "assets/iceAge";
import { returnRandomInRange } from "utils/randomInRange";
import { time } from "console";

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
  // iceAgeImage: HTMLImageElement;
  backColor: string;
  rsi: number;
  dpr: number;
  isPopupOpen: boolean = false;
  canvasDrawPosition: Vector2;
  logoImage: HTMLImageElement;
  volume: number;
  mfi: number;
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
    backColor: string,
    dpr: number,
    logoImg: string,
    angleTiltRatio: number,
    volume: number,
    mfi: number
  ) {
    this.mfi = mfi;
    const logoImage = new Image();
    this.volume = volume;
    this.logoImage = logoImage;
    logoImage.src = logoImg;
    this.name = name;
    this.foreColor = foreColor;
    this.backColor = backColor;
    this.canvas = canvas;
    this.rotator = new Rotator2D(angleTiltRatio * 360);
    this.correlationCoefficient = correlationCoefficient;
    this.radius = radius;
    this.spaceShips = [];
    this.ctx = this.canvas.getContext("2d")!;
    this.price = price;
    this.dpr = dpr;
    this.distanceFromSun = this.calcDistanceFromSun(correlationCoefficient);

    // const image = new Image();
    // this.iceAgeImage = image;

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
    const selectedContinents = shuffledContinents.slice(0, 7);
    this.continents = selectedContinents.map((continent) => {
      return new Continent(
        this.canvas,
        continent,
        this.radius,
        returnRandomInRange(this.radius / 4, this.radius / 2)
      );
    });
    this.position = rotateAffineMatrix
      .multiplyVector(positionAffineVector)
      .toVector2();
    this.canvasDrawPosition = convertCartesianToScreenPoint(
      this.canvas,
      this.position,
      this.dpr
    );

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
    this.continentOrigins = [
      new Vector2(0, -this.radius),
      new Vector2(0, this.radius),
    ];
    const leftOriginCount =
      this.continents.length - this.continentOrigins.length;
    for (let i = 0; i < leftOriginCount; i++) {
      const angle = (Math.PI * 2) / leftOriginCount;
      const origin = new Vector2(
        Math.cos(angle * i),
        Math.sin(angle * i)
      ).scalarBy(returnRandomInRange(this.radius / 2, this.radius * 1.2));
      this.continentOrigins.push(origin);
    }
    setInterval(() => {
      if (this.spaceShips.length === 0) {
        while (this.spaceShips.length < this.spaceShipCount) {
          setTimeout(() => {
            this.setSpaceShip();
          }, this.spaceShipRegenerationInterval);
          this.setSpaceShip();
        }
        // console.log(this.name, this.spaceShips.length);

        // console.log(this.name, this.spaceShips.length, "setting finished");
      }
    }, spaceShipRegenerationInterval);
    // this.setSpaceShip();
  }

  calcCurrentPriceRelativeLocation(price: number) {
    if (this.finalSupportPrice === null || this.finalResistancePrice === null) {
      return this.currentPriceRelativeLocation;
    }
    const relativeLocation = changeRelativeValueToRealValue(
      price,
      this.finalSupportPrice,
      this.finalResistancePrice,
      0,
      1
    );
    return relativeLocation;
  }

  update(data: Partial<CryptoDataFields>) {
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
      this.currentPriceRelativeLocation = this.calcCurrentPriceRelativeLocation(
        data.currentPrice
      );
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
    if (data.mfi) {
      this.mfi = data.mfi;
    }
  }

  setSpaceshipInformation(rsi: number) {
    let spaceShipCount = 0;
    let spaceShipDirection: SpaceshipDirection = SpaceshipDirection.IN;
    let spaceShipRegenerationInterval = 20000;
    if (rsi >= 70) {
      spaceShipCount = 3;
      spaceShipDirection = SpaceshipDirection.IN;
      spaceShipRegenerationInterval = 1000;
      // this.iceAgeImage.src = "";
    } else if (60 <= rsi && rsi < 70) {
      spaceShipCount = 1;
      spaceShipDirection = SpaceshipDirection.IN;
      spaceShipRegenerationInterval = 10000;
      // this.iceAgeImage.src = "";
    } else if (40 <= rsi && rsi < 60) {
      spaceShipCount = 0;
      spaceShipDirection = SpaceshipDirection.OUT;
      spaceShipRegenerationInterval = 20000;
      // this.iceAgeImage.src =
      // iceAgeLevel1[Math.floor(Math.random() * iceAgeLevel1.length)];
    } else if (30 <= rsi && rsi < 40) {
      spaceShipCount = 1;
      spaceShipDirection = SpaceshipDirection.OUT;
      spaceShipRegenerationInterval = 10000;
      // this.iceAgeImage.src =
      // iceAgeLevel2[Math.floor(Math.random() * iceAgeLevel2.length)];
    } else {
      spaceShipCount = 3;
      spaceShipDirection = SpaceshipDirection.OUT;
      spaceShipRegenerationInterval = 1000;
      // this.iceAgeImage.src =
      // iceAgeLevel3[Math.floor(Math.random() * iceAgeLevel3.length)];
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
    console.log(this.name, speed);
    return speed;
  }

  calcDistanceFromSun(correlationCoefficient: number) {
    const minDistance = Sun.radius + 30 + this.radius;
    const maxDistance = (this.canvas.height + 260) / this.dpr / 2;

    const relativeToRadian = changeRelativeValueToRealValueInversed(
      // the bigger the correlation coefficient
      // the more similar is it to the sun
      correlationCoefficient,
      -0.001,
      0.1,
      (Math.PI * 85) / 180,
      (Math.PI * 89.9) / 180
    );
    // ln x derivative is 1/x
    const tanOfRadian = Math.tan(relativeToRadian);

    const distance = changeRelativeValueToRealValue(
      // the bigger the correlation coefficient
      // the more similar is it to the sun
      tanOfRadian,
      Math.tan((Math.PI * 85) / 180),
      Math.tan((Math.PI * 89.9) / 180),
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
          generateRandomName(),
          this.dpr
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

  setIsPopupOpen(isPopupOpen: boolean) {
    this.isPopupOpen = isPopupOpen;
  }

  drawContinents(origin: Vector2) {
    this.ctx.save();
    for (const continentOrigin of this.continentOrigins) {
      const continent = this.continents.shift()!;
      this.ctx.beginPath();
      this.ctx.arc(origin.x, origin.y, this.radius, 0, 2 * Math.PI, false);
      this.ctx.closePath();
      this.ctx.clip();

      continent.draw(origin.add(continentOrigin), this.foreColor, origin);
      this.continents.push(continent);
    }
    this.ctx.restore();
  }

  drawTrajectory() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(
      this.canvas.width / this.dpr / 2,
      this.canvas.height / this.dpr / 2,
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

  drawIceAge(origin: Vector2) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(origin.x, origin.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.clip();

    // const imageSize = this.radius * 2 * 1.2;
    // this.ctx.globalAlpha = 0.8;
    // this.ctx.drawImage(
    //   this.iceAgeImage,
    //   origin.x - imageSize / 2,
    //   origin.y - imageSize / 2,
    //   imageSize,
    //   imageSize
    // );
    // this.ctx.save();
    const iceInnerRadius =
      //  this.radius * 0.6;
      this.radius *
      changeRelativeValueToRealValueInversed(this.mfi, 0, 100, 0, 0.9);
    const glacierRadius =
      //  this.radius * 0.8;
      this.radius *
      changeRelativeValueToRealValueInversed(this.mfi, 0, 100, 0, 1.1);
    const northPolePosition = new Vector2(
      origin.x,
      origin.y - this.radius * 1.5
    );
    const southPolePosition = new Vector2(
      origin.x,
      origin.y + this.radius * 1.5
    );
    const gradientUpper = this.ctx.createRadialGradient(
      northPolePosition.x,
      northPolePosition.y,
      iceInnerRadius,
      northPolePosition.x,
      northPolePosition.y,
      glacierRadius
    );
    const gradientLower = this.ctx.createRadialGradient(
      southPolePosition.x,
      southPolePosition.y,
      iceInnerRadius,
      southPolePosition.x,
      southPolePosition.y,
      glacierRadius
    );

    // Add three color stops
    gradientUpper.addColorStop(0, "rgba(255,255,255,1)");
    gradientUpper.addColorStop(1, "rgba(255,255,255,0)");
    gradientLower.addColorStop(0, "rgba(255,255,255,1)");
    gradientLower.addColorStop(1, "rgba(255,255,255,0)");
    this.ctx.beginPath();
    this.ctx.arc(
      origin.x,
      origin.y - glacierRadius,
      this.radius * 1.3,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fillStyle = gradientUpper;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(
      origin.x,
      origin.y + glacierRadius,
      this.radius * 1.3,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fillStyle = gradientLower;
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(origin.x, origin.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.fillStyle = `rgba(255,255,255,${changeRelativeValueToRealValueInversed(
      this.rsi,
      0,
      100,
      0,
      0.2
    )})`;
    this.ctx.fill();
    // this.ctx.restore();
    this.ctx.restore();
  }

  drawLogo(drawPosition: Vector2) {
    this.ctx.save();
    const imageSize = this.radius;
    this.ctx.globalAlpha = 1;
    this.ctx.drawImage(
      this.logoImage,
      drawPosition.x - imageSize / 2,
      drawPosition.y - imageSize / 2,
      imageSize,
      imageSize
    );
    this.ctx.restore();
  }

  drawOverlay(drawPosition: Vector2) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(drawPosition.x, drawPosition.y, this.radius, 0, 2 * Math.PI);

    this.ctx.fillStyle = `rgba(255, 255, 255, ${changeRelativeValueToRealValueInversed(
      this.currentPriceRelativeLocation,
      0,
      1,
      0,
      0.3
    )})`;
    this.ctx.fill();
    this.ctx.closePath();
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
    this.canvasDrawPosition = convertCartesianToScreenPoint(
      this.canvas,
      this.position,
      this.dpr
    );

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(
      this.canvasDrawPosition.x,
      this.canvasDrawPosition.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fillStyle = `rgba(0, 55, 186, 1)`;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(
      this.canvasDrawPosition.x,
      this.canvasDrawPosition.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fillStyle = `rgba(255, 255, 255, ${changeRelativeValueToRealValueInversed(
      this.rsi,
      0,
      100,
      0,
      0.5
    )})`;
    this.ctx.fill();
    this.ctx.closePath();

    //redness
    this.ctx.beginPath();
    this.ctx.arc(
      this.canvasDrawPosition.x,
      this.canvasDrawPosition.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fillStyle = `rgba(30, 0, 0, ${changeRelativeValueToRealValue(
      this.rsi,
      0,
      100,
      0,
      0.5
    )})`;
    this.ctx.fill();
    this.ctx.closePath();
    //redness
    // this.ctx.fillStyle = `rgba(${
    //   this.greenness ? 255 - this.greenness : 0
    // }, ${0}, ${this.greenness ?? 0}, ${1})`;
    this.ctx.restore();

    this.drawContinents(this.canvasDrawPosition);

    // this.drawOverlay(this.canvasDrawPosition);

    this.ctx.save();

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = `rgba(255, 255, 255, 0.8)`;
    this.ctx.font = "12px Righteous";
    this.ctx.fillText(
      this.name,
      this.canvasDrawPosition.x,
      this.canvasDrawPosition.y + this.radius + 15
    );
    // this.ctx.fillText(
    //   this.rotator.degree.toFixed(2),
    //   drawPosition.x,
    //   drawPosition.y + this.radius + 30
    // );

    this.ctx.restore();
    this.drawLogo(this.canvasDrawPosition);
    this.drawIceAge(this.canvasDrawPosition);
  }
  setDpr(dpr: number) {
    this.dpr = dpr;
    this.spaceShips.forEach((spaceShip) => spaceShip.setDpr(dpr));
  }
}
