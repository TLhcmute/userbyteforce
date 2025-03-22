import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReportForm from "@/components/ReportForm";

const Report = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Page Title */}
          <div
            className={`max-w-2xl mx-auto text-center mb-12 transition-all duration-500 ${
              isPageLoaded ? "opacity-100" : "opacity-0 transform translate-y-8"
            }`}
          >
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">
              Báo cáo khẩn cấp
            </h1>
            <p className="text-lg text-gray-600">
              Vui lòng cung cấp chi tiết về tình trạng khẩn cấp của bạn và vị
              trí. Các dịch vụ khẩn cấp sẽ được thông báo ngay lập tức.
            </p>
          </div>

          {/* Report Form */}
          <div
            className={`transition-all duration-500 delay-200 ${
              isPageLoaded ? "opacity-100" : "opacity-0 transform translate-y-8"
            }`}
          >
            <ReportForm />
          </div>

          {/* Additional Information */}
          <div
            className={`max-w-2xl mx-auto mt-12 p-6 glass-card transition-all duration-500 delay-300 ${
              isPageLoaded ? "opacity-100" : "opacity-0 transform translate-y-8"
            }`}
          >
            <h3 className="text-lg font-medium mb-3">Important Information</h3>
            <p className="text-gray-600 mb-4">
              Đối với tình trạng khẩn cấp sống, vui lòng gọi ngay lập tức các
              dịch vụ khẩn cấp:
            </p>
            <div className="bg-emergency/10 rounded-lg p-4 text-center">
              <p className="text-emergency font-medium text-lg">
                Khẩn cấp: 911
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Report;
