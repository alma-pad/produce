/**
 * Get the correct image path with base URL prefix for GitHub Pages
 * @param {string} path - Image path starting with /
 * @returns {string} - Path with base URL prefix
 */
export const getImagePath = (path) => {
  const baseUrl = import.meta.env.BASE_URL;
  // Remove leading slash from path if present, then combine with baseUrl
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure baseUrl ends with / and cleanPath doesn't start with /
  return `${baseUrl}${cleanPath}`;
};
