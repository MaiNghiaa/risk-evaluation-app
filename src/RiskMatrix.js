import React from "react";

function RiskMatrix({ likelihood, impact }) {
  const matrix = [
    ["Thấp", "Thấp", "Trung bình", "Cao", "Cao"],
    ["Thấp", "Trung bình", "Cao", "Cao", "Rất cao"],
    ["Trung bình", "Cao", "Cao", "Rất cao", "Rất cao"],
    ["Cao", "Cao", "Rất cao", "Rất cao", "Rất cao"],
    ["Cao", "Rất cao", "Rất cao", "Rất cao", "Rất cao"],
  ];

  const riskRating = matrix[likelihood - 1][impact - 1];

  return (
    <div>
      <h4>Đánh giá mức độ rủi ro: {riskRating}</h4>
    </div>
  );
}

export default RiskMatrix;
