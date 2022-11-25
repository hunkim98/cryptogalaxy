import { CryptoDataFields } from "context/CryptoContext";
import { convertCartesianToScreenPoint } from "utils/cartesian";
import {
  changeRelativeValueToRealValue,
  changeRelativeValueToRealValueInversed,
  clamp,
} from "utils/clamp";
import { Vector2 } from "utils/math/Vector2";
import { Planet } from "./Planet";
import { Sun } from "./Sun";

export class GalaxyCanvas {
  private fps = 24;
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number = 0;
  height: number = 0;
  loop: number = 0;
  sun: Sun | null;
  planets: Array<Planet> = [];
  requestAnimationFrameId: number;
  MIN_PLANET_SIZE = 30;
  MAX_PLANET_SIZE = 80;
  frameCount = 0;
  backgroundLoopMax = 1000;
  dpr: number = 1;
  hoveredPlanet: Planet | null = null;
  isPopupOpen: boolean = false;
  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.ctx = element.getContext("2d")!;
    this.sun = null;
    this.render();
    this.requestAnimationFrameId = requestAnimationFrame(this.render);
    this.planets = [];
    this.initialize();
  }

  onMouseMove(e: MouseEvent) {
    let isAnyPlanetHovered = false;
    for (const planet of this.planets) {
      const screenPoint = convertCartesianToScreenPoint(
        this.element,
        planet.position,
        this.dpr
      );
      const distance = screenPoint.squareDistanceTo(
        new Vector2(e.clientX, e.clientY)
      );
      if (Math.sqrt(distance) < planet.radius) {
        planet.setIsPopupOpen(true);
        isAnyPlanetHovered = true;
        this.hoveredPlanet = planet;
      } else {
        planet.setIsPopupOpen(false);
      }
    }
    if (isAnyPlanetHovered) {
      this.isPopupOpen = true;
    } else {
      this.isPopupOpen = false;
    }
  }

  drawPopup(drawPosition: Vector2, planet: Planet) {
    let quadrant = 0b00;
    console.log(planet.name);
    if (
      drawPosition.x > this.element.width / this.dpr / 2 &&
      drawPosition.y < this.element.height / this.dpr / 2
    ) {
      quadrant = 0b00;
    } else if (
      drawPosition.x < this.element.width / this.dpr / 2 &&
      drawPosition.y < this.element.height / this.dpr / 2
    ) {
      quadrant = 0b01;
    } else if (
      drawPosition.x < this.element.width / this.dpr / 2 &&
      drawPosition.y > this.element.height / this.dpr / 2
    ) {
      quadrant = 0b11;
    } else {
      quadrant = 0b10;
    }
    const borderRadius = 10;
    const popupWidth = 100;
    const popupHeight = 80;
    const width = quadrant % 2 === 0 ? popupWidth : -popupWidth;
    const height = (quadrant & 0b10) === 0b10 ? -popupHeight : popupHeight;
    let topLeftPoint = new Vector2(drawPosition.x, drawPosition.y);
    if (quadrant === 0b01) {
      topLeftPoint = topLeftPoint.add(new Vector2(-popupWidth, 0));
    } else if (quadrant === 0b11) {
      topLeftPoint = topLeftPoint.add(new Vector2(-popupWidth, -popupHeight));
    } else if (quadrant === 0b10) {
      topLeftPoint = topLeftPoint.add(new Vector2(0, -popupHeight));
    }
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(
      quadrant % 2 === 0
        ? drawPosition.x + borderRadius
        : drawPosition.x - borderRadius,
      drawPosition.y
    );
    this.ctx.arcTo(
      drawPosition.x + width,
      drawPosition.y,
      drawPosition.x + width,
      drawPosition.y + height,
      borderRadius
    );
    this.ctx.arcTo(
      drawPosition.x + width,
      drawPosition.y + height,
      drawPosition.x,
      drawPosition.y + height,
      borderRadius
    );
    this.ctx.arcTo(
      drawPosition.x,
      drawPosition.y + height,
      drawPosition.x,
      drawPosition.y,
      borderRadius
    );
    this.ctx.arcTo(
      drawPosition.x,
      drawPosition.y,
      drawPosition.x + width,
      drawPosition.y,
      borderRadius
    );
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.textAlign = "start";
    this.ctx.textBaseline = "top";
    this.ctx.fillStyle = "black";
    this.ctx.font = "12px Noto Sans KR";
    const popupPadding = 5;
    this.ctx.fillText(
      planet.name,
      topLeftPoint.x + popupPadding,
      topLeftPoint.y + popupPadding
    );
    this.ctx.fillText(
      "price: ₩" + planet.price,
      topLeftPoint.x + popupPadding,
      topLeftPoint.y + popupPadding + 15
    );
    this.ctx.fillText(
      "correlation: " + planet.correlationCoefficient.toFixed(8),
      topLeftPoint.x + popupPadding,
      topLeftPoint.y + popupPadding + 30
    );
    this.ctx.fillText(
      "rsi: " + planet.rsi.toFixed(2) + "%",
      topLeftPoint.x + popupPadding,
      topLeftPoint.y + popupPadding + 45
    );
    this.ctx.restore();
  }

  setSun(
    name: string,
    increaseRatio: number,
    foreColor: string,
    backColor: string,
    logoImg: string
  ) {
    this.sun = new Sun(
      this.element,
      name,
      increaseRatio,
      foreColor,
      backColor,
      this.dpr,
      logoImg
    );
  }

  addPlanet(
    name: string,
    increaseRatio: number,
    correlationCoefficient: number,
    volume: number,
    price: number,
    support: Array<number>,
    resistance: Array<number>,
    rsi: number,
    foreColor: string,
    backColor: string,
    logoImg: string
  ) {
    const size = changeRelativeValueToRealValue(
      volume,
      615_291_230_759, // xdc market cap
      93_930_235_541_513, //btc market cap - 500_000_000_000_000

      this.MIN_PLANET_SIZE,
      this.MAX_PLANET_SIZE
    );

    const planet = new Planet(
      this.element,
      correlationCoefficient,
      increaseRatio,
      size,
      name,
      price,
      support,
      resistance,
      rsi,
      foreColor,
      backColor,
      this.dpr,
      logoImg
    );
    this.planets.push(planet);
    this.planets.sort((a, b) => b.radius - a.radius);
  }

  updatePlanet(planetName: string, data: Partial<CryptoDataFields>) {
    const planet = this.planets.find((planet) => planet.name === planetName);
    if (planet) {
      planet.update(data);
    }
  }

  initialize() {
    // this.planets.push(new Planet(this.element, this.sun.radius + 50, 1, 80));
    this.onMouseMove = this.onMouseMove.bind(this);
    this.element.addEventListener("mousemove", this.onMouseMove);
  }

  setWidth(width: number, devicePixelRatio?: number) {
    this.width = width;
    this.element.width = devicePixelRatio ? width * devicePixelRatio : width;
    this.element.style.width = `${width}px`;
  }

  setHeight(height: number, devicePixelRatio?: number) {
    this.height = height;
    this.element.height = devicePixelRatio ? height * devicePixelRatio : height;
    this.element.style.height = `${height}px`;
  }

  setSize(width: number, height: number, devicePixelRatio?: number) {
    this.setWidth(width, devicePixelRatio);
    this.setHeight(height, devicePixelRatio);
    this.dpr = devicePixelRatio ? devicePixelRatio : this.dpr;
  }

  scale(x: number, y: number) {
    this.ctx.scale(x, y);
    this.sun?.setDpr(this.dpr);
    this.planets.forEach((planet) => planet.setDpr(this.dpr));
  }

  drawBackground() {
    this.ctx.save();
    const grad = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    grad.addColorStop(0, `rgba(0, 0, 0, 0)`);
    grad.addColorStop(
      changeRelativeValueToRealValue(
        this.loop,
        0,
        this.backgroundLoopMax,
        0,
        1
      ),
      `rgba(0, 15, 45, ${changeRelativeValueToRealValueInversed(
        Math.abs(this.loop - this.backgroundLoopMax / 2),
        0,
        this.backgroundLoopMax / 2,
        0,
        1
      )})`
    );
    grad.addColorStop(1, `rgba(0, 0, 0, 0)`);
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }

  render = () => {
    this.frameCount++;
    this.loop++;
    if (this.frameCount === this.fps + 1) {
      this.frameCount = 0;
    }
    if (this.loop === this.backgroundLoopMax + 1) {
      this.loop = 0;
    }
    this.clear();
    this.drawBackground();
    this.drawScene();

    setTimeout(() => {
      requestAnimationFrame(this.render.bind(this));
    }, 1000 / this.fps);
  };

  drawScene() {
    this.drawGalaxyComponents();
    if (this.isPopupOpen && this.hoveredPlanet) {
      this.drawPopup(this.hoveredPlanet.canvasDrawPosition, this.hoveredPlanet);
    }
  }

  drawDummy() {}

  drawGalaxyComponents() {
    if (this.sun) {
      this.sun.draw();
    }
    for (const planet of this.planets) {
      planet.drawTrajectory();
    }
    for (const planet of this.planets) {
      planet.draw();
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  destroy() {
    this.clear();
    this.planets = [];
    this.element.removeEventListener("mousemove", this.onMouseMove);
  }
}
