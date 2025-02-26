import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to My Portfolio</h1>
      
      <div className="prose lg:prose-xl">
        <p>
          This is a sample home page for your portfolio website. 
          You can edit this content through the CMS.
        </p>
        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Galleries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              to="/view?title=Safe+Art&q=rating%3Asafe" 
              className="p-4 border rounded-lg hover:bg-slate-50"
            >
              <h3 className="text-xl font-medium">Safe Artwork</h3>
              <p>Browse all safe-for-work images</p>
            </Link>
            
            <Link 
              to="/view?title=Featured+Art&q=tags%3Afeatured" 
              className="p-4 border rounded-lg hover:bg-slate-50"
            >
              <h3 className="text-xl font-medium">Featured Artwork</h3>
              <p>See my selected featured works</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;