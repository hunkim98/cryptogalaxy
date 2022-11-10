import {
  changeRelativeValueToRealValue,
  changeRelativeValueToRealValueInversed,
  clamp,
} from "utils/clamp";
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
  MIN_PLANET_SIZE = 10;
  MAX_PLANET_SIZE = 80;
  frameCount = 0;
  backgroundLoopMax = 1000;
  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.ctx = element.getContext("2d")!;
    this.sun = null;
    this.render();
    this.requestAnimationFrameId = requestAnimationFrame(this.render);
    this.planets = [];
    this.initialize();
  }

  setSun(name: string, increaseRatio: number) {
    this.sun = new Sun(this.element, name, increaseRatio);
  }

  addPlanet(
    name: string,
    increaseRatio: number,
    correlationCoefficient: number,
    volume: number,
    price: number,
    support: Array<number>,
    resistance: Array<number>,
    rsi: number
  ) {
    const size = changeRelativeValueToRealValue(
      volume,
      615_291_230_759, // xdc market cap
      93_930_235_541_513, //btc market cap - 500_000_000_000_000

      this.MIN_PLANET_SIZE,
      this.MAX_PLANET_SIZE
    );
    const minDistance = Sun.radius + 20 + size;
    const maxDistance = 400 + Sun.radius - size;
    const distance = changeRelativeValueToRealValueInversed(
      // the bigger the correlation coefficient
      // the more similar is it to the sun
      correlationCoefficient,
      -0.1,
      0.2,
      minDistance,
      maxDistance
    );
    const maxSpeed = 0.3;
    const minSpeed = 0.02;

    const speed = changeRelativeValueToRealValue(
      increaseRatio,
      0,
      1,
      minSpeed,
      maxSpeed
    );

    const planet = new Planet(
      this.element,
      distance,
      speed,
      size,
      name,
      price,
      support,
      resistance,
      rsi
    );
    this.planets.push(planet);
    this.planets.sort((a, b) => b.radius - a.radius);
  }

  initialize() {
    // this.planets.push(new Planet(this.element, this.sun.radius + 50, 1, 80));
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
  }

  drawDummy() {}

  drawGalaxyComponents() {
    if (this.sun) {
      this.sun.draw();
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
  }
}
