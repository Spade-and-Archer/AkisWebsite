import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadImageContent, filterImages } from '../utils/contentLoader';

function ImageView() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title') || 'Image Gallery';
  const query = searchParams.get('q') || '';
  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allImages, setAllImages] = useState([]);

  // Load all images once
  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const images = await loadImageContent();
        setAllImages(images);
      } catch (error) {
        console.error('Error loading images:', error);
        setAllImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllImages();
  }, []);

  // Filter images when query changes
  useEffect(() => {
    if (allImages.length > 0) {
      const filtered = filterImages(allImages, query);
      setImages(filtered);
    }
  }, [query, allImages]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      
      {query && (
        <div className="mb-6 p-2 bg-slate-100 rounded">
          <p className="text-sm font-mono">Query: {query}</p>
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">Loading images...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-8">
          <p>No images found matching your query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map(image => (
            <div key={image.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={image.image} 
                alt={image.title}
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                <p className="text-sm text-gray-600 mb-2">By {image.artist}</p>
                <p className="text-sm mb-2">{image.description}</p>
                <div className="flex flex-wrap gap-1">
                  {image.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageView;