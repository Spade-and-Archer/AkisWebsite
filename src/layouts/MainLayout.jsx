import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Portfolio Website</Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Menu
          </button>
          
          {/* Navigation */}
          <nav className={`${menuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="md:flex space-y-2 md:space-y-0 md:space-x-4">
              <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
              <li><Link to="/page/about" className="hover:text-blue-300">About</Link></li>
              <li><Link to="/view?title=All+Images" className="hover:text-blue-300">Gallery</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      
      <footer className="bg-slate-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>© {new Date().getFullYear()} Portfolio Website</p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;