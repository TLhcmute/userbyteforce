import React, { useState, useEffect } from "react";
import { AlertTriangle, MessageSquare, MapPin, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MapComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    message: "",
    latitude: null, // Thêm latitude
    longitude: null, // Thêm longitude
  });

  // Lấy vị trí tự động khi component load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Lỗi lấy vị trí:", error);
          toast({
            title: "Không lấy được vị trí",
            description: "Vui lòng bật định vị để gửi báo cáo.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Trình duyệt không hỗ trợ",
        description: "Vui lòng dùng thiết bị có định vị.",
        variant: "destructive",
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      toast({
        title: "Yêu cầu thông điệp",
        description: "Vui lòng mô tả tình trạng khẩn cấp của bạn.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.latitude || !formData.longitude) {
      toast({
        title: "Yêu cầu vị trí",
        description: "Vui lòng bật định vị để gửi báo cáo.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://byteforce.caohoangphuc.id.vn/python/get_status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Gửi message, latitude, longitude
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      toast({
        title: "Báo cáo khẩn cấp",
        description: "Báo cáo của bạn đã được gửi đi. Giúp đỡ đang trên đường.",
      });

      // Reset form
      setFormData({
        message: "",
        latitude: null,
        longitude: null,
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
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
                rows={4}
                placeholder="Vui lòng mô tả tình trạng khẩn cấp của bạn chi tiết..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                disabled={isSubmitting}
              />
              <MessageSquare className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <h3 className="mb-4 flex items-center text-sm font-medium text-gray-700">
              <MapPin className="mr-2 h-4 w-4 text-blue-500" />
              Vị trí của bạn
            </h3>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={
                    formData.latitude && formData.longitude
                      ? `${formData.latitude}, ${formData.longitude}`
                      : "Đang lấy vị trí..."
                  }
                  readOnly // Không cho người dùng chỉnh tay
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi báo cáo khẩn cấp"}
              <Send className="inline ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MapComponent;
