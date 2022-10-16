import { Planet } from "./Planet";
import { Sun } from "./Sun";

export class GalaxyCanvas {
  private fps = 24;
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number = 0;
  height: number = 0;
  sun: Sun;
  planets: Array<Planet>;
  requestAnimationFrameId: number;
  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.ctx = element.getContext("2d")!;

    this.sun = new Sun(element);
    this.planets = [];
    this.initialize();
    this.render();
    this.requestAnimationFrameId = requestAnimationFrame(this.render);
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

  drawGalaxyComponents() {
    this.sun.draw();
    for (const planet of this.planets) {
      planet.draw();
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
