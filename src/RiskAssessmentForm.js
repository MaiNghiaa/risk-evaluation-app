import React, { useState } from "react";

const RiskEvaluation = () => {
  // Sử dụng useState để tạo các biến trạng thái
  const [risks, setRisks] = useState([]); // Lưu danh sách các rủi ro đã thêm
  const [riskName, setRiskName] = useState(""); // Tên rủi ro đang được nhập
  const [likelihood, setLikelihood] = useState("rare"); // Xác suất xảy ra (mặc định là "rare")
  const [impact, setImpact] = useState("negligible"); // Mức độ tác động (mặc định là "negligible")

  // Ma trận đánh giá rủi ro chi tiết dựa trên tiêu chí ISO 27005
  const riskMatrix = {
    rare: {
      negligible: "Thấp",
      minor: "Thấp",
      moderate: "Trung bình",
      major: "Trung bình",
      critical: "Cao",
    },
    unlikely: {
      negligible: "Thấp",
      minor: "Trung bình",
      moderate: "Trung bình",
      major: "Cao",
      critical: "Cao",
    },
    possible: {
      negligible: "Trung bình",
      minor: "Trung bình",
      moderate: "Cao",
      major: "Cao",
      critical: "Nguy hiểm",
    },
    likely: {
      negligible: "Trung bình",
      minor: "Cao",
      moderate: "Cao",
      major: "Nguy hiểm",
      critical: "Nguy hiểm",
    },
    almostCertain: {
      negligible: "Cao",
      minor: "Cao",
      moderate: "Nguy hiểm",
      major: "Nguy hiểm",
      critical: "Nguy hiểm",
    },
  };

  // Hàm đánh giá mức độ rủi ro dựa trên xác suất và mức độ tác động
  const evaluateRisk = (likelihood, impact) => {
    return riskMatrix[likelihood][impact] || "Không xác định";
  };

  // Xử lý khi người dùng nhấn nút "Add Risk"
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form (nạp lại trang)
    const riskLevel = evaluateRisk(likelihood, impact); // Đánh giá mức độ rủi ro
    setRisks([
      ...risks,
      { name: riskName, likelihood, impact, level: riskLevel }, // Thêm rủi ro vào danh sách
    ]);
    setRiskName(""); // Đặt lại giá trị tên rủi ro
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-white to-gray-100 shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Đánh Giá Rủi Ro Sử Dụng Ma Trận Chi Tiết
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Tên Rủi Ro:
          </label>
          <input
            type="text"
            value={riskName}
            onChange={(e) => setRiskName(e.target.value)} // Cập nhật tên rủi ro
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            placeholder="Nhập tên rủi ro"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Xác Suất:
          </label>
          <select
            value={likelihood}
            onChange={(e) => setLikelihood(e.target.value)} // Cập nhật xác suất
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          >
            <option value="rare">Hiếm</option>
            <option value="unlikely">Không chắc chắn</option>
            <option value="possible">Có thể</option>
            <option value="likely">Có khả năng</option>
            <option value="almostCertain">Gần như chắc chắn</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Mức Độ Tác Động (Hậu Quả):
          </label>
          <select
            value={impact}
            onChange={(e) => setImpact(e.target.value)} // Cập nhật mức độ tác động
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          >
            <option value="negligible">Không đáng kể</option>
            <option value="minor">Nhỏ</option>
            <option value="moderate">Trung bình</option>
            <option value="major">Lớn</option>
            <option value="critical">Nguy kịch</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Thêm Rủi Ro
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800 text-center">
        Kết Quả Đánh Giá Rủi Ro
      </h2>
      {risks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-6 py-3 border-b">Tên Rủi Ro</th>
                <th className="px-6 py-3 border-b">Xác Suất</th>
                <th className="px-6 py-3 border-b">Mức Độ Tác Động</th>
                <th className="px-6 py-3 border-b">Mức Độ Rủi Ro</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((risk, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b text-center">
                    {risk.name}
                  </td>
                  <td className="px-6 py-4 border-b text-center capitalize">
                    {risk.likelihood}
                  </td>
                  <td className="px-6 py-4 border-b text-center capitalize">
                    {risk.impact}
                  </td>
                  <td className="px-6 py-4 border-b text-center font-semibold">
                    {risk.level}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">
          Chưa có rủi ro nào được thêm.
        </p>
      )}
    </div>
  );
};

export default RiskEvaluation;
