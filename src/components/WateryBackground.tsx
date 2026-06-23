import { useEffect, useRef, useCallback, useState } from "react";
import { isMobileDevice } from "../utils/device";

const STATIC_BACKGROUND_STYLE = {
  zIndex: 0,
  background: "linear-gradient(to bottom, #000000, #0f172a)",
} as const;

const StaticBackground = () => (
  <div
    className="fixed inset-0 h-[100dvh] w-full"
    style={STATIC_BACKGROUND_STYLE}
    aria-hidden="true"
  />
);

const WateryCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [dimensions, setDimensions] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  const animateSafe = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      const { width, height } = dimensions;
      if (!width || !height) return;

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(1, "#0f172a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const resolution = 4;
      const w = Math.floor(width / resolution);
      const h = Math.floor(height / resolution);
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const px = x * resolution;
          const py = y * resolution;
          const t = time * 0.001;
          const drip1 =
            Math.sin(px * 0.005 + t * 0.3) * Math.cos(py * 0.008 + t * 0.2);
          const drip2 =
            Math.sin(px * 0.003 - t * 0.4) * Math.cos(py * 0.006 + t * 0.5);
          const intensity = ((drip1 * 0.5 + drip2 * 0.5 + 1) / 2) * 0.8;
          const index = (y * w + x) * 4;
          data[index] = 0;
          data[index + 1] = Math.floor(intensity * 223);
          data[index + 2] = Math.floor(intensity * 154);
          data[index + 3] = Math.floor(intensity * 180);
        }
      }

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;
      tempCtx.putImageData(imageData, 0, 0);
      ctx.drawImage(tempCanvas, 0, 0, width, height);
    },
    [dimensions],
  );

  useEffect(() => {
    const onResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = Math.max(1, dimensions.width * dpr);
    canvas.height = Math.max(1, dimensions.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    let lastFrameTime = 0;
    const frameInterval = 1000 / 24;

    const render = (currentTime: number) => {
      if (currentTime - lastFrameTime >= frameInterval) {
        animateSafe(ctx, currentTime);
        lastFrameTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, animateSafe]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-[100dvh] w-full"
      style={{
        zIndex: 0,
        pointerEvents: "none",
        background: "linear-gradient(to bottom, #000000, #0f172a)",
      }}
      aria-hidden="true"
    />
  );
};

const WateryBackground = () => {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (isMobileDevice()) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const enableCanvas = () => setShowCanvas(true);
    const idle = window.requestIdleCallback?.(enableCanvas, { timeout: 1500 });
    if (idle === undefined) {
      const timer = window.setTimeout(enableCanvas, 500);
      return () => window.clearTimeout(timer);
    }
    return () => window.cancelIdleCallback(idle);
  }, []);

  if (!showCanvas) {
    return <StaticBackground />;
  }

  return <WateryCanvas />;
};

export default WateryBackground;
