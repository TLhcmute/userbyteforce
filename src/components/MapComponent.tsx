import React, { useState } from "react";
import { AlertTriangle, MessageSquare, MapPin, Send } from "lucide-react"; // Giả sử bạn đang sử dụng các icon này
import { useToast } from "@/components/ui/use-toast";

const MapComponent = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    message: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, address: inputValue }));
    // Validate form
    if (!formData.message.trim()) {
      toast({
        title: "Yêu cầu thông điệp",
        description: "Vui lòng mô tả tình trạng khẩn cấp của bạn.",
        variant: "destructive",
      });
      return;
    }

    if (!inputValue.trim()) {
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
    fetch("http://byteforce.caohoangphuc.id.vn/python/get_status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Đặt header cho kiểu dữ liệu
      },
      body: JSON.stringify(formData), // Chuyển đổi formData thành JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Chuyển đổi phản hồi thành JSON
      })
      .then((data) => {
        console.log("Success:", data); // Xử lý dữ liệu phản hồi
      })
      .catch((error) => {
        console.error("Error:", error); // Xử lý lỗi
      });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Báo cáo khẩn cấp",
      description: "Báo cáo của bạn đã được gửi đi. Giúp đỡ đang trên đường.",
    });

    // Reset form
    setFormData({
      message: "",
      address: "",
    });
    setInputValue(""); // Reset ô nhập địa chỉ
    setSuggestions([]); // Xóa gợi ý
    setIsSubmitting(false);
  };

  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`
    );
    const data = await response.json();
    if (data.length > 0) {
      const loc = data[0];
      // Bạn có thể cập nhật formData.address nếu cần
      setFormData((prev) => ({ ...prev, address: loc.display_name }));
    }
  };

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);
    geocodeAddress(value);
    if (value) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]); // Xóa gợi ý nếu ô nhập rỗng
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.display_name);
    setSuggestions([]);
    geocodeAddress(suggestion.display_name); // Tìm kiếm khi chọn gợi ý
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
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                />
                {suggestions.length > 0 && (
                  <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-md">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.place_id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {suggestion.display_name}
                      </li>
                    ))}
                  </ul>
                )}
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
