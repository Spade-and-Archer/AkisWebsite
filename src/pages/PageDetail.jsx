import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function PageDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, this would fetch from your content directory
    // For now, we'll simulate this with a timeout
    const fetchPage = async () => {
      try {
        // Simulating fetch from content directory
        const response = await import(`../../content/pages/${slug}.md`)
          .catch(() => {
            throw new Error('Page not found');
          });
        
        // In development, we'll have a mock response
        // In production with actual content, you'd parse the markdown file
        setPageData({
          title: slug.charAt(0).toUpperCase() + slug.slice(1),
          content: response.default || '# Page content would appear here'
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{pageData.title}</h1>
      <div className="prose lg:prose-xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {pageData.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default PageDetail;