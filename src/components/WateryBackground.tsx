import React, { useEffect, useRef, useState } from "react";

interface WateryBackgroundProps {
  className?: string;
  lowPowerMode?: boolean;
}

const WateryBackground: React.FC<WateryBackgroundProps> = ({
  className = "",
  lowPowerMode = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Caustic noise function for water effect
  const generateCaustic = (time: number, x: number, y: number) => {
    const scale = lowPowerMode ? 0.5 : 1.0;
    const speed = lowPowerMode ? 0.5 : 1.0;

    // Create ripple-like caustic patterns
    const ripple1 =
      Math.sin((x * 0.01 + time * speed) * scale) *
      Math.cos((y * 0.01 + time * speed * 0.7) * scale);
    const ripple2 =
      Math.sin((x * 0.02 - time * speed * 1.3) * scale) *
      Math.sin((y * 0.015 + time * speed * 0.9) * scale);
    const ripple3 = Math.cos(
      (x * 0.008 + y * 0.008 + time * speed * 0.5) * scale,
    );

    // Combine ripples for complex water effect
    const combined = (ripple1 + ripple2 + ripple3) / 3.0;

    // Normalize to 0-1 range
    return (combined + 1.0) / 2.0;
  };

  // Animation loop
  const animate = (ctx: CanvasRenderingContext2D, time: number) => {
    const { width, height } = dimensions;
    if (!width || !height) return;

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

        // Convert to RGB with theme colors
        const intensity = caustic * 0.4; // Reduce intensity for subtlety
        const green = Math.floor(intensity * 223); // #00df9a RGB
        const blue = Math.floor(intensity * 154); // #00df9a RGB

        // Fill pixels in block for performance
        for (let dy = 0; dy < resolution && y + dy < height; dy++) {
          for (let dx = 0; dx < resolution && x + dx < width; dx++) {
            const index = ((y + dy) * width + (x + dx)) * 4;
            data[index] = 0; // R
            data[index + 1] = green; // G
            data[index + 2] = blue; // B
            data[index + 3] = Math.floor(intensity * 102); // A (opacity-40)
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
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

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
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        zIndex: -10,
        opacity: 0.6,
        mixBlendMode: "screen",
      }}
    />
  );
};

export default WateryBackground;
