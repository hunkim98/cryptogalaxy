export class GalaxyCanvas {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number = 0;
  height: number = 0;
  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.ctx = element.getContext("2d")!;
    this.initialize();
  }

  initialize() {}

  setWidth(width: number, devicePixelRatio?: number) {
    this.width = width;
    this.element.width = devicePixelRatio ? width * devicePixelRatio : width;
    this.element.style.width = `${width}px`;
  }

  setHeight(height: number, devicePixelRatio?: number) {
    this.height = height;
    this.element.height = devicePixelRatio ? height * devicePixelRatio : height;
    this.element.style.height = `${height}px`;
    this.ctx.fillStyle = "black";
  }

  setSize(width: number, height: number, devicePixelRatio?: number) {
    this.setWidth(width, devicePixelRatio);
    this.setHeight(height, devicePixelRatio);
  }

  render() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
