import React, { useState } from "react";

const RiskAssessmentForm = ({ systems, onAddRisk }) => {
  const [riskName, setRiskName] = useState("");
  const [selectedSystem, setSelectedSystem] = useState("");
  const [likelihood, setLikelihood] = useState("rare");
  const [impact, setImpact] = useState("negligible");

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

  // Hàm đánh giá mức độ rủi ro
  const evaluateRiskLevel = (likelihood, impact) => {
    return riskMatrix[likelihood][impact] || "Không xác định";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSystem) {
      alert("Vui lòng chọn một hệ thống để đánh giá rủi ro.");
      return;
    }

    // Đánh giá mức độ rủi ro dựa trên xác suất và tác động
    const riskLevel = evaluateRiskLevel(likelihood, impact);

    const risk = {
      system: selectedSystem,
      name: riskName,
      likelihood,
      impact,
      level: riskLevel,
      date: new Date(), // Gán mức độ rủi ro được đánh giá
    };

    console.log(risk);
    onAddRisk(risk);
    setRiskName("");
    setSelectedSystem("");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Đánh Giá Rủi Ro
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Chọn Hệ Thống:
          </label>
          <select
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Chọn hệ thống</option>
            {systems.map((system, index) => (
              <option key={index} value={system.name}>
                {system.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Tên Rủi Ro:
          </label>
          <input
            type="text"
            value={riskName}
            onChange={(e) => setRiskName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên rủi ro"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Xác Suất:
          </label>
          <select
            value={likelihood}
            onChange={(e) => setLikelihood(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            onChange={(e) => setImpact(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Thêm Đánh Giá Rủi Ro
        </button>
      </form>
    </div>
  );
};

export default RiskAssessmentForm;
