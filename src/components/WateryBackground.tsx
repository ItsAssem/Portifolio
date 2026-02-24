import React, { useEffect, useRef, useState } from "react";

interface WateryBackgroundProps {
  lowPowerMode?: boolean;
}

const WateryBackground: React.FC<WateryBackgroundProps> = ({
  lowPowerMode = false,
}) => {
  console.log("WateryBackground: Component mounting!");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Caustic noise function for drippy water effect
  const generateCaustic = (time: number, x: number, y: number) => {
    const scale = lowPowerMode ? 0.5 : 1.0;
    const speed = lowPowerMode ? 0.5 : 1.0;

    // Create drippy water patterns with organic movement
    const drip1 =
      Math.sin((x * 0.005 + time * speed * 0.3) * scale) *
      Math.cos((y * 0.008 + time * speed * 0.2) * scale);
    const drip2 =
      Math.sin((x * 0.003 - time * speed * 0.4) * scale) *
      Math.cos((y * 0.006 + time * speed * 0.5) * scale);
    const flow1 = Math.sin(
      (x * 0.007 + y * 0.004 + time * speed * 0.6) * scale,
    );
    const flow2 = Math.cos(
      (x * 0.004 - y * 0.005 + time * speed * 0.7) * scale,
    );

    // Add organic fluid movement
    const organic =
      Math.sin((x * 0.002 + y * 0.002 + time * speed * 0.1) * scale) *
      Math.cos((x * 0.003 - y * 0.003 + time * speed * 0.15) * scale);

    // Combine for drippy, fluid water effect
    const combined =
      drip1 * 0.3 + drip2 * 0.3 + flow1 * 0.2 + flow2 * 0.2 + organic * 0.1;

    // Normalize to 0-1 range with enhanced contrast
    return (combined + 1.0) / 2.0;
  };

  // Animation loop
  const animate = (ctx: CanvasRenderingContext2D, time: number) => {
    const { width, height } = dimensions;
    if (!width || !height) {
      console.warn("WateryBackground: Invalid dimensions", { width, height });
      return;
    }

    // SIMPLE TEST: Bright green background to verify canvas is working
    ctx.fillStyle = "#00ff00"; // Bright green
    ctx.fillRect(0, 0, width, height);

    console.log("WateryBackground: Drawing bright green test", {
      width,
      height,
    });

    // Clear canvas with dark gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#000000");
    gradient.addColorStop(1, "#0f172a"); // slate-950
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Create caustic pattern
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const resolution = lowPowerMode ? 4 : 2; // Lower resolution for low power mode

    for (let y = 0; y < height; y += resolution) {
      for (let x = 0; x < width; x += resolution) {
        const caustic = generateCaustic(time * 0.001, x, y);

        // Convert to RGB with theme colors - INCREASED INTENSITY
        const intensity = caustic * 0.8; // Increased from 0.4 to 0.8
        const green = Math.floor(intensity * 255); // Increased from 223 to 255
        const blue = Math.floor(intensity * 200); // Increased from 154 to 200

        // Fill pixels in block for performance
        for (let dy = 0; dy < resolution && y + dy < height; dy++) {
          for (let dx = 0; dx < resolution && x + dx < width; dx++) {
            const index = ((y + dy) * width + (x + dx)) * 4;
            data[index] = 0; // R
            data[index + 1] = green; // G
            data[index + 2] = blue; // B
            data[index + 3] = Math.floor(intensity * 180); // A (increased from 102 to 180)
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  // Setup resize observer
  useEffect(() => {
    const setupResizeObserver = () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }

      resizeObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setDimensions({ width, height });
        }
      });

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
    };
  }, []);

  // Setup canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("WateryBackground: Canvas ref is null");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("WateryBackground: Could not get 2D context");
      return;
    }

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    console.log("WateryBackground: Canvas dimensions set to", dimensions);

    let startTime = performance.now();
    const targetFPS = lowPowerMode ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const render = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime >= frameInterval) {
        animate(ctx, currentTime - startTime);
        lastFrameTime = currentTime;
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);
    console.log("WateryBackground: Animation loop started");

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, lowPowerMode]);

  // Detect low power mode for mobile
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    const isLowEnd =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

    if (isMobile || isLowEnd) {
      // Auto-enable low power mode for mobile/low-end devices
      // This could be made configurable via props
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: 0,
        opacity: 0.8,
        mixBlendMode: "screen",
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
};

export default WateryBackground;
