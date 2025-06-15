
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, PenTool, Home, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogout }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPublishPage = location.pathname === '/publish';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  const isAuthPage = isLoginPage || isSignupPage;

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handlePublishClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login', { state: { from: { pathname: '/publish' } } });
    }
  };

  return (
    <nav className="bg-neo-cream border-b-8 border-neo-charcoal relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="text-4xl text-neo-charcoal tracking-wide font-black hover:opacity-80 transition-opacity">
            PEN'S & PIXELS
          </Link>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <>
                {isPublishPage ? (
                  <Link to="/">
                    <Button className="bg-neo-sage hover:bg-neo-charcoal text-neo-charcoal hover:text-neo-cream border-4 border-neo-charcoal transition-all duration-200 font-black tracking-wide px-6 py-3 text-lg">
                      <Home className="w-5 h-5 mr-2" />
                      HOME
                    </Button>
                  </Link>
                ) : (
                  <Link to="/publish" onClick={handlePublishClick}>
                    <Button className="bg-neo-charcoal hover:bg-neo-sage text-neo-cream hover:text-neo-charcoal border-4 border-neo-charcoal transition-all duration-200 font-black tracking-wide px-6 py-3 text-lg">
                      <PenTool className="w-5 h-5 mr-2" />
                      PUBLISH
                    </Button>
                  </Link>
                )}
                
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="bg-neo-charcoal hover:bg-neo-sage text-neo-cream hover:text-neo-charcoal border-4 border-neo-charcoal transition-all duration-200 px-4 py-3">
                    <Github className="w-5 h-5" />
                  </Button>
                </a>
                
                <div className="relative group">
                  <Button className="bg-neo-sage hover:bg-neo-charcoal text-neo-charcoal hover:text-neo-cream border-4 border-neo-charcoal transition-all duration-200 px-4 py-3">
                    <User className="w-5 h-5" />
                  </Button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-neo-cream border-4 border-neo-charcoal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Button
                      onClick={handleLogout}
                      className="w-full justify-start bg-neo-cream hover:bg-red-500 hover:text-neo-cream text-neo-charcoal border-0 font-black tracking-wide text-lg"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      LOGOUT
                    </Button>
                  </div>
                </div>
              </>
            )}
            
            {!isLoggedIn && !isAuthPage && (
              <div className="space-x-4">
                <Link to="/login">
                  <Button className="bg-neo-cream hover:bg-neo-charcoal text-neo-charcoal hover:text-neo-cream border-4 border-neo-charcoal transition-all duration-200 font-black tracking-wide px-6 py-3 text-lg">
                    LOGIN
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-neo-charcoal hover:bg-neo-sage text-neo-cream hover:text-neo-charcoal border-4 border-neo-charcoal transition-all duration-200 font-black tracking-wide px-6 py-3 text-lg">
                    SIGNUP
                  </Button>
                </Link>
              </div>
            )}
            
            {isAuthPage && (
              <div>
                <Link to="/">
                  <Button className="bg-neo-sage hover:bg-neo-charcoal text-neo-charcoal hover:text-neo-cream border-4 border-neo-charcoal transition-all duration-200 font-black tracking-wide px-6 py-3 text-lg">
                    HOME
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
