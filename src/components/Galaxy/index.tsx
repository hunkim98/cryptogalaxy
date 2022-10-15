import React, { useEffect, useRef } from "react";
import { GalaxyCanvas } from "./Canvas";

interface Props {}

const Galaxy: React.FC<Props> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const galaxyCanvasRef = useRef<GalaxyCanvas | null>(null);
  useEffect(() => {
    const onResize = () => {
      if (!divRef.current || !galaxyCanvasRef.current) {
        return;
      }
      const rect = divRef.current.getBoundingClientRect();
      console.log(rect);
      galaxyCanvasRef.current.setSize(rect.width, rect.height);
      galaxyCanvasRef.current.render();
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [divRef]);

  useEffect(() => {
    if (!canvasRef.current) {
      return () => {};
    }
    const galaxyCanvas = new GalaxyCanvas(canvasRef.current);
    galaxyCanvasRef.current = galaxyCanvas;
  }, []);

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
