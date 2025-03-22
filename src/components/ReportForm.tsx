import { useState } from "react";
import { AlertTriangle, MapPin, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Button from "@/components/Button";

interface FormData {
  message: string;
  address: string;
  city: string;
  zipCode: string;
}

const ReportForm = () => {
  const [formData, setFormData] = useState<FormData>({
    message: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.message.trim()) {
      toast({
        title: "Yêu cầu thông điệp",
        description: "Vui lòng mô tả tình trạng khẩn cấp của bạn.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.address.trim() || !formData.city.trim()) {
      toast({
        title: "Yêu cầu địa chỉ",
        description: "Vui lòng cung cấp thông tin vị trí của bạn.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Emergency Reported",
      description: "Your emergency has been reported. Help is on the way.",
    });

    // Reset form
    setFormData({
      message: "",
      address: "",
      city: "",
      zipCode: "",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="glass-card overflow-hidden">
        <div className="bg-emergency/90 text-white p-4 flex items-center space-x-3">
          <AlertTriangle className="h-6 w-6" />
          <h2 className="text-xl font-medium">Báo cáo khẩn cấp</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Mô tả tình trạng khẩn cấp
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Vui lòng mô tả tình trạng khẩn cấp của bạn chi tiết..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all duration-200"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <MessageSquare className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <h3 className="mb-4 flex items-center text-sm font-medium text-gray-700">
              <MapPin className="mr-2 h-4 w-4 text-blue" />
              Vị trí của bạn
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Địa chỉ
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="123 Main St"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all duration-200"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Thành phố
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Thành phố"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all duration-200"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mã bưu điện
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    placeholder="Mã bưu điện"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all duration-200"
                    value={formData.zipCode}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              variant="emergency"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              icon={<Send className="h-5 w-5" />}
              iconPosition="right"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi báo cáo khẩn cấp"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
