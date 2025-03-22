import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Track scroll position to update header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "py-3 bg-white/95 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl md:text-2xl font-semibold transition-transform duration-300 hover:scale-[1.02]"
        >
          <span className="text-2xl md:text-3xl">🚨</span>
          <span className={`${isScrolled ? "text-blue" : "text-blue-dark"}`}>
            ByteRescue
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" isActive={location.pathname === "/"}>
            Trang Chủ
          </NavLink>
          <NavLink to="/report" isActive={location.pathname === "/report"}>
            Báo Cáo Sự Cố
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="p-2 md:hidden text-blue focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md animate-slide-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLink to="/" isActive={location.pathname === "/"} mobile>
              Trang Chủ
            </NavLink>
            <NavLink
              to="/report"
              isActive={location.pathname === "/report"}
              mobile
            >
              Báo Cáo Sự Cố
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  mobile?: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, isActive, mobile = false, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`relative transition-colors duration-300 ease-in-out ${
        mobile ? "py-2 text-lg" : ""
      } ${
        isActive ? "text-blue font-medium" : "text-gray-600 hover:text-blue"
      } link-underline`}
    >
      {children}
    </Link>
  );
};

export default Header;
