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
  continents: Continent[] = [];
  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.ctx = element.getContext("2d")!;

    this.sun = new Sun(element);
    this.initialize();
    this.render();
    this.requestAnimationFrameId = requestAnimationFrame(this.render);

    this.continents.push(new Continent(element, Continent1, 100));
    this.continents.push(new Continent(element, Continent2, 100));
    this.continents.push(new Continent(element, Continent3, 100));
    this.continents.push(new Continent(element, Continent4, 100));
    this.continents.push(new Continent(element, Continent5, 100));
    this.continents.push(new Continent(element, Continent6, 100));
    this.continents.push(new Continent(element, Continent7, 100));
    this.continents.push(new Continent(element, Continent8, 100));
    this.continents.push(new Continent(element, Continent9, 100));
    this.continents.push(new Continent(element, Continent10, 100));
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

  initialize() {
    this.planets = [new Planet(this.element, this.sun.radius + 50, 1, 20)];
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
    for (let i = 0; i < this.continents.length; i++) {
      this.continents[i].draw(new Vector2(150 * (i - 2), 150), {
        r: 55,
        g: 0,
        b: 200,
        a: 1,
      });
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
