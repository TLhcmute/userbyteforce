import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, MessageSquare, MapPin, Send } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import InstructionCard from "@/components/InstructionCard";

const Index = () => {
  const navigate = useNavigate();
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Animation on page load
  useEffect(() => {
    setIsHeroVisible(true);
  }, []);

  const instructionSteps = [
    {
      title: "Mô Tả Tình Trạng",
      description:
        "Cung cấp chi tiết về tình trạng khẩn cấp của bạn để chúng tôi hiểu cách giúp đỡ bạn.",
      icon: <MessageSquare size={28} />,
    },
    {
      title: "Chia Sẻ Vị Trí",
      description:
        "Nhập địa chỉ chính xác để đảm bảo các dịch vụ khẩn cấp có thể tìm thấy bạn nhanh chóng.",
      icon: <MapPin size={28} />,
    },
    {
      title: "Gửi Báo Cáo",
      description:
        "Gửi báo cáo khẩn cấp của bạn, và chúng tôi sẽ đảm bảo nó đến được những người cần giúp đỡ.",
      icon: <Send size={28} />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-white to-blue-light/30"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className={`transition-all duration-700 transform ${
                isHeroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="inline-block animate-pulse-gentle mb-3 px-3 py-1 bg-blue/10 rounded-full text-blue font-medium">
                Nền tảng báo cáo khẩn cấp
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight">
                ByteRescue: Chúng tôi ở đây để giúp bạn
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Báo cáo khẩn cấp nhanh chóng và hiệu quả để nhận được sự giúp đỡ
                bạn cần. Nền tảng của chúng tôi kết nối bạn trực tiếp với các
                dịch vụ khẩn cấp.
              </p>
              <Button
                variant="emergency"
                size="lg"
                icon={<AlertTriangle className="h-5 w-5" />}
                onClick={() => navigate("/report")}
                className="shadow-lg"
              >
                Báo cáo khẩn cấp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Cách hoạt động
            </h2>
            <p className="text-lg text-gray-600">
              Theo các bước đơn giản để báo cáo tình trạng khẩn cấp và nhận được
              sự giúp đỡ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {instructionSteps.map((step, index) => (
              <InstructionCard
                key={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-light/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Sẵn sàng báo cáo khẩn cấp?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Đừng chờ đợi. Nếu bạn đang gặp phải tình trạng khẩn cấp, báo cáo
              ngay để nhận được sự giúp đỡ bạn cần. Ngay bây giờ để nhận được sự
              trợ giúp bạn cần một cách nhanh chóng.
            </p>
            <Button
              variant="emergency"
              size="lg"
              icon={<AlertTriangle className="h-5 w-5" />}
              onClick={() => navigate("/report")}
              className="shadow-lg"
            >
              Báo cáo khẩn cấp
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
