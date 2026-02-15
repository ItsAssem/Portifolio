/**
 * Browser detection utility for conditional rendering
 * @returns {boolean} True if browser is Microsoft Edge
 */
export const isEdgeBrowser = (): boolean => {
  // Check for Edge browser
  return typeof window !== 'undefined' && (
    window.navigator.userAgent.includes('Edg/') ||
    window.navigator.userAgent.includes('Edge/') ||
    (window.navigator.userAgent.includes('Mozilla') && window.navigator.userAgent.includes('Trident'))
  );
};
