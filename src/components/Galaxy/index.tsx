import { CryptoContext } from "context/CryptoContext";
import React, { useContext, useEffect, useRef } from "react";
import { GalaxyCanvas } from "./Canvas";
import logo from "../../assets/logo_final_condensed.png";

interface Props {}

const Galaxy: React.FC<Props> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const galaxyCanvasRef = useRef<GalaxyCanvas | null>(null);
  const { cryptoData, markets } = useContext(CryptoContext);

  useEffect(() => {
    if (!canvasRef.current) {
      return () => {};
    }
    const galaxyCanvas = new GalaxyCanvas(canvasRef.current, markets.length);
    galaxyCanvasRef.current = galaxyCanvas;
    return () => {
      if (galaxyCanvasRef.current) {
        galaxyCanvasRef.current.destroy();
      }
    };
  }, [markets]);

  useEffect(() => {
    if (!cryptoData || !galaxyCanvasRef.current) {
      return;
    }
    for (const crypto of cryptoData) {
      if (crypto[0] === "KRW-BTC") {
        //krw-btc is sun
        galaxyCanvasRef.current.setSun(
          crypto[0].replace("KRW-", ""),
          crypto[1].increaseRatio,
          crypto[1].foreColor,
          crypto[1].backColor,
          crypto[1].logoImg
        );
      } else {
        const indexOfPlanet = galaxyCanvasRef.current.planets.findIndex(
          (element) => element.name === crypto[0].replace("KRW-", "")
        );
        if (indexOfPlanet === -1) {
          if (
            crypto[1].coefficient &&
            crypto[1].volume &&
            crypto[1].currentPrice &&
            crypto[1].support &&
            crypto[1].resistance &&
            crypto[1].rsi
          ) {
            galaxyCanvasRef.current.addPlanet(
              crypto[0].replace("KRW-", ""),
              crypto[1].increaseRatio,
              crypto[1].coefficient,
              crypto[1].volume,
              crypto[1].currentPrice,
              crypto[1].support,
              crypto[1].resistance,
              crypto[1].rsi,
              crypto[1].foreColor,
              crypto[1].backColor,
              crypto[1].logoImg
            );
          }
        } else {
          galaxyCanvasRef.current.planets[indexOfPlanet].update({
            increaseRatio: crypto[1].increaseRatio,
            coefficient: crypto[1].coefficient,
            rsi: crypto[1].rsi,
            currentPrice: crypto[1].currentPrice,
          });
          // the planet already exists
          // galaxyCanvasRef.current.updatePlanet(
          //   crypto[0].replace("KRW-", ""),
          //   crypto[1].increaseRatio,
          //   crypto[1].coefficient,
          //   crypto[1].volume,
          //   crypto[1].currentPrice,
          //   crypto[1].support,
          //   crypto[1].resistance,
          //   crypto[1].rsi
          // );
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
      const dpr = window.devicePixelRatio;

      galaxyCanvasRef.current.setSize(rect.width, rect.height, dpr);
      galaxyCanvasRef.current.scale(dpr, dpr);
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
      <div style={{ position: "absolute", width: 200, left: 20, top: 30 }}>
        <img src={logo} style={{ width: "100%", height: "auto" }} alt="logo" />
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Galaxy;
