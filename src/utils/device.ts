export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(max-width: 768px), (pointer: coarse)").matches ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  );
}

export function shouldUseStaticBackground(): boolean {
  if (typeof window === "undefined") return true;

  return (
    isMobileDevice() ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
