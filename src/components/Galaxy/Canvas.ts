import { CryptoDataFields, Language } from "context/CryptoContext";
import { convertCartesianToScreenPoint } from "utils/cartesian";
import {
  changeRelativeValueToRealValue,
  changeRelativeValueToRealValueInversed,
  clamp,
} from "utils/clamp";
import { drawRoundRect } from "utils/drawShape";
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
  language: Language;
  planets: Array<Planet> = [];
  requestAnimationFrameId: number;
  MIN_PLANET_SIZE = 20;
  MAX_PLANET_SIZE = 80;
  frameCount = 0;
  backgroundLoopMax = 1000;
  dpr: number = 1;
  hoveredPlanet: Planet | null = null;
  isPopupOpen: boolean = false;
  isSunHovered: boolean = false;
  totalMarketCount: number = 0;
  constructor(element: HTMLCanvasElement, totalMarketCount: number) {
    this.language = Language.KOREAN;
    this.element = element;
    this.ctx = element.getContext("2d")!;
    this.sun = null;
    this.render();
    this.requestAnimationFrameId = requestAnimationFrame(this.render);
    this.planets = [];
    this.totalMarketCount = totalMarketCount;
    this.initialize();
  }

  changeLanguage(language: Language) {
    this.language = language;
  }

  onMouseMove(e: MouseEvent) {
    let isAnyPlanetHovered = false;
    if (this.sun) {
      const screenPoint = convertCartesianToScreenPoint(
        this.element,
        this.sun.position,
        this.dpr
      );
      const distanceToSun = screenPoint.squareDistanceTo(
        new Vector2(e.clientX, e.clientY)
      );
      if (Math.sqrt(distanceToSun) < Sun.radius) {
        this.isSunHovered = true;
      } else {
        this.isSunHovered = false;
      }
    }
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
    if (this.isSunHovered) {
      this.hoveredPlanet = null;
      this.isPopupOpen = true;
    }
  }

  drawPopup(drawPosition: Vector2, component: Planet | Sun) {
    const rectPadding = 8;
    const rectHeight = 43;
    const popupPadding = 8;
    const titleMarginTop = popupPadding + 5;
    const headerHeight = titleMarginTop + 22;
    const dataCountToShow = component instanceof Planet ? 5 : 4;
    let dataIndex = 0;
    let quadrant = 0b00;
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
    const isSunHovered = component instanceof Sun;
    const borderRadius = 10;
    const popupWidth = 192;
    const popupHeight = headerHeight + dataCountToShow * rectHeight;
    //isSunHovered ? 135 : 175;
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
    drawRoundRect(
      this.ctx,
      quadrant % 2 === 0
        ? drawPosition.add(new Vector2(borderRadius, 0))
        : drawPosition.subtract(new Vector2(borderRadius, 0)),
      drawPosition,
      borderRadius,
      width,
      height
    );
    // this.ctx.stroke();
    this.ctx.fillStyle = component.foreColor;
    this.ctx.fill();
    this.ctx.textAlign = "start";
    this.ctx.textBaseline = "top";
    this.ctx.fillStyle = "black";

    // this.ctx.font = "12px Noto Sans KR";
    this.ctx.font = "bold 20px Anek Devanagari";
    this.ctx.fillStyle = "white";

    const titleYPos = topLeftPoint.y + popupPadding + 5;
    this.ctx.fillText(component.name, topLeftPoint.x + popupPadding, titleYPos);
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "end";
    this.ctx.font = "bold 15px Noto Sans KR";
    // this.ctx.fillText(
    this.ctx.fillText(
      "₩" + component.price.toLocaleString(),
      topLeftPoint.x + Math.abs(width) - popupPadding,
      titleYPos - 2
    );
    this.ctx.textAlign = "start";
    this.ctx.font = "normal 10px Noto Sans KR";
    //correlation to btc
    const marketCapYPos = titleYPos + 20 + 2;

    this.ctx.fillStyle = "black";

    this.ctx.save();
    this.ctx.fillStyle = dataIndex % 2 === 0 ? "#D9D9D9" : "#BCBCBC";
    dataIndex++;
    this.ctx.fillRect(topLeftPoint.x, marketCapYPos, popupWidth, rectHeight);
    this.ctx.restore();
    const marketCaptialText =
      this.language === Language.ENGLISH
        ? "Market Captial (Planet Size) "
        : "시가총액 (행성크기)";
    this.ctx.fillText(
      isSunHovered ? marketCaptialText.split("(")[0] : marketCaptialText,
      topLeftPoint.x + popupPadding,
      marketCapYPos + rectPadding
    );
    this.ctx.font = "bold 14px Noto Sans KR";
    this.ctx.fillText(
      "₩" + component.volume.toLocaleString(),
      topLeftPoint.x + popupPadding,
      marketCapYPos + rectPadding + 15
    );
    let correlationYPos = marketCapYPos;
    //correlation to btc
    if (!isSunHovered) {
      correlationYPos = correlationYPos + rectHeight;
      this.ctx.save();
      this.ctx.fillStyle = dataIndex % 2 === 0 ? "#D9D9D9" : "#BCBCBC";
      dataIndex++;
      this.ctx.fillRect(
        topLeftPoint.x,
        correlationYPos,
        popupWidth,
        rectHeight
      );
      this.ctx.restore();
      this.ctx.font = "normal 10px Noto Sans KR";
      this.ctx.fillText(
        this.language === Language.ENGLISH
          ? "Correlation with BTC (Distance from Sun)"
          : "BTC와의 가격 변동 유사성 (태양과의 거리)",
        topLeftPoint.x + popupPadding,
        correlationYPos + rectPadding
      );
      this.ctx.font = "bold 14px Noto Sans KR";
      this.ctx.fillText(
        (component as Planet).correlationCoefficient.toFixed(5),
        topLeftPoint.x + popupPadding,
        correlationYPos + rectPadding + 15
      );
    }

    const relativeStrengthYPos = correlationYPos + rectHeight;
    this.ctx.save();
    this.ctx.fillStyle = dataIndex % 2 === 0 ? "#D9D9D9" : "#BCBCBC";
    dataIndex++;
    this.ctx.fillRect(
      topLeftPoint.x,
      relativeStrengthYPos,
      popupWidth,
      rectHeight
    );
    this.ctx.restore();
    //Moving average
    this.ctx.font = "normal 10px Noto Sans KR";
    const rsiText =
      this.language === Language.ENGLISH
        ? "RSI (Spaceship in/out)"
        : "RSI 과매수 정도 (우주선 유입/출입)";
    this.ctx.fillText(
      isSunHovered ? rsiText.split("(")[0] : rsiText,
      topLeftPoint.x + popupPadding,
      relativeStrengthYPos + rectPadding
    );
    this.ctx.save();
    this.ctx.font = "bold 14px Noto Sans KR";
    this.ctx.fillStyle =
      component.rsi > 60 ? "#DD3B31" : component.rsi < 40 ? "#1874B7" : "black";
    this.ctx.fillText(
      component.rsi.toFixed(2) + "%",
      topLeftPoint.x + popupPadding,
      relativeStrengthYPos + rectPadding + 15
    );
    this.ctx.restore();

    const mfiYPos = relativeStrengthYPos + rectHeight;
    this.ctx.save();
    this.ctx.fillStyle = dataIndex % 2 === 0 ? "#D9D9D9" : "#BCBCBC";
    dataIndex++;
    this.ctx.fillRect(topLeftPoint.x, mfiYPos, popupWidth, rectHeight);
    this.ctx.restore();

    this.ctx.font = "normal 10px Noto Sans KR";
    const mfiText =
      this.language === Language.ENGLISH
        ? "Money Flow Index (Planet Ice Age)"
        : "MFI 과매수 정도 (행성 빙하기 정도)";
    this.ctx.fillText(
      isSunHovered ? mfiText.split("(")[0] : mfiText,
      topLeftPoint.x + popupPadding,
      mfiYPos + rectPadding
    );

    this.ctx.save();
    this.ctx.font = "bold 14px Noto Sans KR";
    this.ctx.fillStyle =
      component.rsi > 60 ? "#DD3B31" : component.rsi < 40 ? "#1874B7" : "black";
    this.ctx.fillText(
      component.mfi.toFixed(2) + "%",
      topLeftPoint.x + popupPadding,
      mfiYPos + rectPadding + 15
    );
    this.ctx.restore();

    //clip
    drawRoundRect(
      this.ctx,
      quadrant % 2 === 0
        ? drawPosition.add(new Vector2(borderRadius, 0))
        : drawPosition.subtract(new Vector2(borderRadius, 0)),
      drawPosition,
      borderRadius,
      width,
      height
    );
    this.ctx.clip();

    const increaseRatioYPos = mfiYPos + rectHeight;
    this.ctx.save();
    this.ctx.fillStyle = dataIndex % 2 === 0 ? "#D9D9D9" : "#BCBCBC";
    dataIndex++;
    this.ctx.fillRect(
      topLeftPoint.x,
      increaseRatioYPos,
      popupWidth,
      rectHeight
    );
    this.ctx.restore();

    this.ctx.font = "normal 10px Noto Sans KR";
    const increaseRatioText =
      this.language === Language.ENGLISH
        ? "Moving Average Increase Rate (Orbit Speed)"
        : "가격 이동평균선 증가율 (행성 공전속도)";
    this.ctx.fillText(
      isSunHovered ? increaseRatioText.split("(")[0] : increaseRatioText,
      topLeftPoint.x + popupPadding,
      increaseRatioYPos + rectPadding
    );

    this.ctx.save();
    this.ctx.font = "bold 14px Noto Sans KR";
    this.ctx.fillStyle =
      component.increaseRatio > 0.1
        ? "#DD3B31"
        : component.increaseRatio < 0
        ? "#1874B7"
        : "black";
    this.ctx.fillText(
      component.increaseRatio.toFixed(6) + "%",
      topLeftPoint.x + popupPadding,
      increaseRatioYPos + rectPadding + 15
    );
    this.ctx.restore();

    this.ctx.restore();
  }

  setSun(
    name: string,
    increaseRatio: number,
    foreColor: string,
    backColor: string,
    logoImg: string,
    volume: number,
    price: number,
    rsi: number,
    mfi: number
  ) {
    this.sun = new Sun(
      this.element,
      name,
      increaseRatio,
      foreColor,
      backColor,
      this.dpr,
      logoImg,
      volume,
      price,
      rsi,
      mfi
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
    logoImg: string,
    mfi: number
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
      logoImg,
      this.planets.length / this.totalMarketCount,
      volume,
      mfi
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
    if (this.isPopupOpen) {
      if (this.hoveredPlanet) {
        this.drawPopup(
          this.hoveredPlanet.canvasDrawPosition,
          this.hoveredPlanet
        );
      } else {
        //sun popup
        if (this.sun) {
          this.drawPopup(this.sun.canvasDrawPosition, this.sun);
        }
      }
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
