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
      galaxyCanvas.clear();
    };
  }, []);

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

  useEffect(() => {
    if (cryptoData) {
      if (cryptoData.get("KRW-BTC")) {
        galaxyCanvasRef.current?.sun.updateBrightness(
          cryptoData.get("KRW-BTC")!.increaseRatio
        );
      }
    }
  }, [cryptoData]);

  console.log("canvas rendered");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
      }}
      ref={divRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Galaxy;
