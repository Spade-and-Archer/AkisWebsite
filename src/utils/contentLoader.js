import Fuse from 'fuse.js';
import { parseQuery } from './queryParser';

/**
 * Loads all image content files from the content/images directory
 * @returns {Promise<Array>} Array of image objects
 */
export async function loadImageContent() {
  // In Vite, we can use import.meta.glob to load files
  const imageFiles = import.meta.glob('/content/images/*.md', { eager: true });
  
  // Transform the loaded files into our image format
  const images = Object.values(imageFiles).map((module, index) => {
    const { attributes } = module;
    
    return {
      id: index + 1,
      title: attributes.title || 'Untitled Image',
      description: attributes.description || '',
      image: attributes.image || '/images/placeholder.jpg',
      tags: attributes.tags || [],
      artist: attributes.artist || 'Unknown Artist',
      rating: attributes.rating || 'safe'
    };
  });
  
  return images;
}

/**
 * Filters images based on a query string
 * @param {Array} images - Array of image objects
 * @param {string} queryString - The query string to filter by
 * @returns {Array} Filtered array of images
 */
export function filterImages(images, queryString) {
  if (!queryString) return images;
  
  const parsedQuery = parseQuery(queryString);
  
  // Configure Fuse for searching
  const fuseOptions = {
    keys: ['title', 'description', 'artist', 'tags', 'rating'],
    threshold: 0.4,
    includeScore: true
  };
  
  const fuse = new Fuse(images, fuseOptions);
  
  // For basic type queries, do a simple search
  if (parsedQuery.type === 'basic') {
    return fuse.search(parsedQuery.terms[0].value).map(result => result.item);
  }
  
  // For structured queries with field:value pairs
  let filteredImages = [...images];
  
  parsedQuery.terms.forEach(term => {
    if (term.field) {
      // Field-specific search
      filteredImages = filteredImages.filter(img => {
        const fieldValue = img[term.field];
        
        // Handle array fields like tags
        if (Array.isArray(fieldValue)) {
          return fieldValue.some(v => 
            v.toLowerCase().includes(term.value.toLowerCase())
          );
        }
        
        // Handle string fields
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(term.value.toLowerCase());
        }
        
        return false;
      });
    } else {
      // General search
      const results = fuse.search(term.value)
        .map(result => result.item);
      
      filteredImages = filteredImages.filter(img => 
        results.some(r => r.id === img.id)
      );
    }
  });
  
  return filteredImages;
}