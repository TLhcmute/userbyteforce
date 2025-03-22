
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-blue-light/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🚨</span>
              <span className="text-xl font-semibold text-blue">RescueHub</span>
            </div>
            <p className="text-gray-600 max-w-xs">
              Rapid emergency reporting platform designed to connect those in need with emergency services.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/report" className="text-gray-600 hover:text-blue transition-colors duration-200">
                  Report Emergency
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-600 hover:text-blue transition-colors duration-200">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-gray-600">
                <strong>Phone:</strong> Emergency: 911
              </li>
              <li className="text-gray-600">
                <strong>Email:</strong> support@rescuehub.example
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} RescueHub. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-emergency" /> for those in need
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
