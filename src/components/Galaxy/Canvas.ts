import { changeRelativeValueToRealValue, clamp } from "utils/clamp";
import { Vector2 } from "utils/math/Vector2";
import { Continent } from "./Continent";
import { ContinentA } from "./Continents/ContinentA";
import {
  Continent1,
  Continent10,
  Continent2,
  Continent3,
  Continent4,
  Continent5,
  Continent6,
  Continent7,
  Continent8,
  Continent9,
} from "./Continents/Examples";
import { Planet } from "./Planet";
import { Sun } from "./Sun";

export class GalaxyCanvas {
  private fps = 24;
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number = 0;
  height: number = 0;
  sun: Sun;
  planets: Array<Planet> = [];
  requestAnimationFrameId: number;
  MIN_PLANET_SIZE = 20;
  MAX_PLANET_SIZE = 80;
  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.ctx = element.getContext("2d")!;

    this.sun = new Sun(element);

    this.render();
    this.requestAnimationFrameId = requestAnimationFrame(this.render);
    this.planets = [];
    // this.continents.push(new Continent(element, Continent1, 100));
    // this.continents.push(new Continent(element, Continent2, 100));
    // this.continents.push(new Continent(element, Continent3, 100));
    // this.continents.push(new Continent(element, Continent4, 100));
    // this.continents.push(new Continent(element, Continent5, 100));
    // this.continents.push(new Continent(element, Continent6, 100));
    // this.continents.push(new Continent(element, Continent7, 100));
    // this.continents.push(new Continent(element, Continent8, 100));
    // this.continents.push(new Continent(element, Continent9, 100));
    // this.continents.push(new Continent(element, Continent10, 100));
    this.initialize();
  }
  updateFrame = () => {
    // this.drawAll();
    this.render();
    setTimeout(() => {
      this.requestAnimationFrameId = requestAnimationFrame(
        this.updateFrame.bind(this)
      );
    }, 1000 / this.fps);
  };

  clampPlanetSunDistance(value: number) {
    const minDistance = this.sun.radius + 10;
    const maxDistance = 500 + this.sun.radius;
    const distance = changeRelativeValueToRealValue(
      value, //value from 0 to 1
      minDistance,
      maxDistance
    );
    return distance;
  }

  addPlanet(name: string, increaseRatio: number) {
    const distance = this.clampPlanetSunDistance(increaseRatio);
    const planet = new Planet(this.element, distance, 0.1, 20, name);
    this.planets.push(planet);
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
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  render = () => {
    this.clear();
    this.drawScene();
    setTimeout(() => {
      requestAnimationFrame(this.render.bind(this));
    }, 1000 / this.fps);
  };

  drawScene() {
    this.drawBackground();
    this.drawGalaxyComponents();
  }

  drawDummy() {}

  drawGalaxyComponents() {
    this.sun.draw();
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
