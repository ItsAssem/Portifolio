import { useEffect, useRef, useCallback, useState } from "react";

interface WateryBackgroundProps {
  lowPowerMode?: boolean;
}

const WateryBackground: React.FC<WateryBackgroundProps> = ({
  lowPowerMode = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const debounceTimeoutRef = useRef<number | null>(null);
  const isEdgeRef = useRef<boolean>(false);
  const devicePixelRatioRef = useRef<number>(1);

  useEffect(() => {
    const isEdge =
      /Edge/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent);

    isEdgeRef.current = isEdge;

    if (isEdge) {
      devicePixelRatioRef.current = Math.min(window.devicePixelRatio, 1.5);
    } else {
      devicePixelRatioRef.current = window.devicePixelRatio;
    }
  }, []);

  const debouncedResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = window.setTimeout(() => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    }, 150);
  }, []);

  const generateCaustic = (time: number, x: number, y: number) => {
    const scale = lowPowerMode ? 0.5 : 1.0;
    const speed = lowPowerMode ? 0.5 : 1.0;
    const edgeOptimization = isEdgeRef.current ? 0.7 : 1.0;

    const drip1 =
      Math.sin((x * 0.005 + time * speed * 0.3) * scale * edgeOptimization) *
      Math.cos((y * 0.008 + time * speed * 0.2) * scale * edgeOptimization);

    const drip2 =
      Math.sin((x * 0.003 - time * speed * 0.4) * scale * edgeOptimization) *
      Math.cos((y * 0.006 + time * speed * 0.5) * scale * edgeOptimization);

    const combined = drip1 * 0.5 + drip2 * 0.5;

    return (combined + 1.0) / 2.0;
  };

  // Fallback for browsers without createImageBitmap in sync context
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawFrame = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      imageData: ImageData,
      width: number,
      height: number,
    ) => {
      let tempCanvas = offscreenCanvasRef.current;
      if (!tempCanvas) {
        tempCanvas = document.createElement("canvas");
        offscreenCanvasRef.current = tempCanvas;
      }
      tempCanvas.width = imageData.width;
      tempCanvas.height = imageData.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.putImageData(imageData, 0, 0);
        ctx.imageSmoothingEnabled = !isEdgeRef.current;
        ctx.drawImage(tempCanvas, 0, 0, width, height);
      }
    },
    [isEdgeRef.current],
  );

  const animateSafe = useCallback(
    (ctx: CanvasRenderingContext2D, time: number) => {
      const { width, height } = dimensions;
      if (!width || !height) return;

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(1, "#0f172a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const resolution = isEdgeRef.current ? 4 : lowPowerMode ? 4 : 2;
      const w = Math.floor(width / resolution);
      const h = Math.floor(height / resolution);
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const caustic = generateCaustic(
            time * 0.001,
            x * resolution,
            y * resolution,
          );

          const intensity = caustic * (isEdgeRef.current ? 0.6 : 0.8);
          const green = Math.floor(intensity * 223);
          const blue = Math.floor(intensity * 154);
          const index = (y * w + x) * 4;
          data[index] = 0;
          data[index + 1] = green;
          data[index + 2] = blue;
          data[index + 3] = Math.floor(
            intensity * (isEdgeRef.current ? 120 : 180),
          );
        }
      }

      drawFrame(ctx, imageData, width, height);
    },
    [dimensions, lowPowerMode, isEdgeRef.current, drawFrame],
  );

  // Setup resize observer with debouncing
  useEffect(() => {
    const setupResizeObserver = () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }

      resizeObserverRef.current = new ResizeObserver(debouncedResize);

      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        resizeObserverRef.current.observe(canvas.parentElement);
      }
    };

    setupResizeObserver();

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [debouncedResize]);

  // Setup canvas and animation with Edge optimizations
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas size with devicePixelRatio optimization
    const dpr = devicePixelRatioRef.current;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Set canvas display size
    canvas.style.width = dimensions.width + "px";
    canvas.style.height = dimensions.height + "px";

    // Frame rate optimization
    const targetFPS = isEdgeRef.current ? 30 : lowPowerMode ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    let lastFrameTime = 0;

    const render = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime >= frameInterval) {
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
  }, [dimensions, lowPowerMode, animateSafe]);

  // Detect efficiency mode
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    const isLowEnd =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

    // Auto-enable optimizations for Edge or low-end devices
    if (isEdgeRef.current || isMobile || isLowEnd) {
      // Additional optimizations can be triggered here
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: 0,
        opacity: isEdgeRef.current ? 0.7 : 0.8,
        pointerEvents: "none",
        background: "transparent",
        transform: "translateZ(0)",
        willChange: "transform",
        backfaceVisibility: "hidden" as const,
      }}
    />
  );
};

export default WateryBackground;
