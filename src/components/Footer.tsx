import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-light/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🚨</span>
              <span className="text-xl font-semibold text-blue">
                ByteRescue
              </span>
            </div>
            <p className="text-gray-600 max-w-xs">
              Nền tảng báo cáo khẩn cấp nhanh chóng được thiết kế để kết nối
              những người cần với các dịch vụ khẩn cấp.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-blue transition-colors duration-200"
                >
                  Trang Chủ
                </a>
              </li>
              <li>
                <a
                  href="/report"
                  className="text-gray-600 hover:text-blue transition-colors duration-200"
                >
                  Báo Cáo Sự Cố
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-blue transition-colors duration-200"
                >
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
                <strong>Email:</strong> support@ByteRescue.example
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} ByteRescue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
