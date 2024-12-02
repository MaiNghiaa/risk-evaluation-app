import React from "react";

const RiskMatrixTable = () => {
  // Định nghĩa ma trận rủi ro
 
  const riskMatrix = {
    rare: {
      negligible: "Low",
      minor: "Low",
      moderate: "Medium",
      major: "Medium",
      critical: "High",
    },
    unlikely: {
      negligible: "Low",
      minor: "Medium",
      moderate: "Medium",
      major: "High",
      critical: "High",
    },
    possible: {
      negligible: "Medium",
      minor: "Medium",
      moderate: "High",
      major: "High",
      critical: "Critical",
    },
    likely: {
      negligible: "Medium",
      minor: "High",
      moderate: "High",
      major: "Critical",
      critical: "Critical",
    },
    almostCertain: {
      negligible: "High",
      minor: "High",
      moderate: "Critical",
      major: "Critical",
      critical: "Critical",
    },
  };

  const likelihoodLevels = Object.keys(riskMatrix);
  const impactLevels = Object.keys(riskMatrix["rare"]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Bảng Ma Trận Rủi Ro
      </h2>
      <table className="w-full bg-gray-50 border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-blue-500 text-white">
              Xác Suất / Tác Động
            </th>
            {impactLevels.map((impact) => (
              <th
                key={impact}
                className="border px-4 py-2 bg-blue-500 text-white capitalize"
              >
                {impact}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {likelihoodLevels.map((likelihood) => (
            <tr key={likelihood}>
              <td className="border px-4 py-2 bg-gray-100 capitalize font-semibold">
                {likelihood}
              </td>
              {impactLevels.map((impact) => (
                <td key={impact} className="border px-4 py-2 text-center">
                  {riskMatrix[likelihood][impact]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskMatrixTable;
