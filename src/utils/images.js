/**
 * Image constants and utilities
 */

// Using more reliable, royalty-free image sources
export const IMAGES = {
  chicken: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop&crop=center',
  banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&crop=center',
  // Fallback images in case Unsplash is unavailable
  chickenFallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkY2ODAwIiByeD0iMTAiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSI+8J+QlDwvdGV4dD4KPC9zdmc+',
  bananaFallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZEQjAwIiByeD0iMTAiLz4KPHRleHQgeD0iNTAiIHk9IjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSJibGFjayI+8J+NjDwvdGV4dD4KPC9zdmc+'
};

/**
 * Get image URL for player type with fallback
 * @param {string} playerType - Player type ('chicken' or 'banana')
 * @param {boolean} useFallback - Whether to use fallback images
 * @returns {string} Image URL
 */
export const getPlayerImage = (playerType, useFallback = false) => {
  if (useFallback) {
    return playerType === 'chicken' ? IMAGES.chickenFallback : IMAGES.bananaFallback;
  }
  return IMAGES[playerType];
};

/**
 * Preload images for better performance
 * @returns {Promise<boolean[]>} Promise that resolves when all images are loaded
 */
export const preloadImages = () => {
  const imageUrls = [IMAGES.chicken, IMAGES.banana];
  
  return Promise.allSettled(
    imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => reject(false);
        img.src = url;
      });
    })
  );
};
