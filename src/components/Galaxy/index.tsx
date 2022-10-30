import { CryptoContext } from "context/CryptoContext";
import React, { useContext, useEffect, useRef } from "react";
import { GalaxyCanvas } from "./Canvas";

interface Props {}

const Galaxy: React.FC<Props> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const galaxyCanvasRef = useRef<GalaxyCanvas | null>(null);
  const { cryptoData } = useContext(CryptoContext);

  useEffect(() => {
    if (!canvasRef.current) {
      return () => {};
    }
    const galaxyCanvas = new GalaxyCanvas(canvasRef.current);
    galaxyCanvasRef.current = galaxyCanvas;
    return () => {
      if (galaxyCanvasRef.current) {
        galaxyCanvasRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!cryptoData || !galaxyCanvasRef.current) {
      return;
    }
    for (const crypto of cryptoData) {
      if (crypto[0] === "KRW-BTC") {
        //krw-btc is sun
        galaxyCanvasRef.current.sun.setBrightness(crypto[1].increaseRatio);
      } else {
        if (
          !galaxyCanvasRef.current.planets
            .map((planet) => planet.name)
            .includes(crypto[0]) &&
          crypto[1].coefficient &&
          crypto[1].volume &&
          crypto[1].currentPrice &&
          crypto[1].support &&
          crypto[1].resistance
        ) {
          galaxyCanvasRef.current.addPlanet(
            crypto[0],
            crypto[1].increaseRatio,
            crypto[1].coefficient,
            crypto[1].volume,
            crypto[1].currentPrice,
            crypto[1].support,
            crypto[1].resistance
          );
        }
      }
    }
  }, [cryptoData]);

  useEffect(() => {
    const onResize = () => {
      if (!divRef.current || !galaxyCanvasRef.current) {
        return;
      }
      const rect = divRef.current.getBoundingClientRect();

      galaxyCanvasRef.current.setSize(rect.width, rect.height);
      galaxyCanvasRef.current.drawScene();
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        background:
          "linear-gradient(111.08deg, rgba(0, 0, 0, 0.8) 5.71%, rgba(0, 15, 45, 0.8) 54.7%, rgba(0, 0, 0, 0.8) 98.84%)",
      }}
      ref={divRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Galaxy;
