import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Navbar = ({ onAuthClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/connectory', label: 'Connectory' },
    { path: '/community', label: 'Community' },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo size={32} />
            <span className="font-playfair text-xl font-bold text-[#121212]">Aura</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-inter text-sm font-medium transition-colors duration-200 hover:text-[#8A2BE2] ${
                  location.pathname === link.path ? 'text-[#8A2BE2]' : 'text-[#121212]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className=\"hidden md:flex items-center space-x-4\">
            {isAuthenticated ? (
              <>
                <div className=\"flex items-center space-x-3\">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className=\"w-8 h-8 rounded-full object-cover border-2 border-[#8A2BE2]\"
                  />
                  <span className=\"text-sm text-[#121212] font-medium\">{user?.name}</span>
                </div>
                <Button
                  variant=\"ghost\"
                  size=\"sm\"
                  onClick={logout}
                  className=\"text-[#121212] hover:text-[#8A2BE2] hover:bg-transparent\"
                >
                  <LogOut className=\"w-4 h-4 mr-2\" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant=\"ghost\"
                  size=\"sm\"
                  onClick={() => onAuthClick('login')}
                  className=\"text-[#121212] hover:text-[#8A2BE2] hover:bg-transparent\"
                >
                  <LogIn className=\"w-4 h-4 mr-2\" />
                  Sign In
                </Button>
                <Button
                  size=\"sm\"
                  onClick={() => onAuthClick('signup')}
                  className=\"bg-[#000000] hover:bg-[#333333] text-white\"
                >
                  <User className=\"w-4 h-4 mr-2\" />
                  Join
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className=\"md:hidden text-[#121212] hover:text-[#8A2BE2] transition-colors\"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className=\"md:hidden glass-dark border-t border-[#E6E6EB]\"
          >
            <div className=\"px-4 py-4 space-y-3\">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 font-inter text-sm font-medium transition-colors ${
                    location.pathname === link.path ? 'text-[#8A2BE2]' : 'text-[#121212]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className=\"pt-4 border-t border-[#E6E6EB] space-y-2\">
                {isAuthenticated ? (
                  <>
                    <div className=\"flex items-center space-x-3 px-3 py-2\">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className=\"w-8 h-8 rounded-full object-cover border-2 border-[#8A2BE2]\"
                      />
                      <span className=\"text-sm text-[#121212] font-medium\">{user?.name}</span>
                    </div>
                    <Button
                      variant=\"outline\"
                      className=\"w-full justify-start border-[#E6E6EB] text-[#121212]\"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className=\"w-4 h-4 mr-2\" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant=\"outline\"
                      className=\"w-full justify-start border-[#E6E6EB] text-[#121212]\"
                      onClick={() => {
                        onAuthClick('login');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogIn className=\"w-4 h-4 mr-2\" />
                      Sign In
                    </Button>
                    <Button
                      className=\"w-full justify-start bg-[#000000] hover:bg-[#333333] text-white\"
                      onClick={() => {
                        onAuthClick('signup');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <User className=\"w-4 h-4 mr-2\" />
                      Join Aura
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
