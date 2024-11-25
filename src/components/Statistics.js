import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = ({ risks }) => {
  const [heThongDuocChon, setHeThongDuocChon] = useState(null);

  // Hàm chuyển đổi mức độ rủi ro thành giá trị số
  const chuyenDoiMucDoRuiRo = (mucDo) => {
    const mucDoMap = {
      Thấp: 1,
      "Trung bình": 2,
      Cao: 3,
      "Nguy hiểm": 4,
    };
    return mucDoMap[mucDo] || 0; // Mặc định trả về 0 nếu không tìm thấy
  };

  // Hàm nhóm dữ liệu rủi ro theo hệ thống và tính toán thống kê
  const tinhThongKeHeThong = risks.reduce((acc, risk) => {
    const tenHeThong = risk.system || "Không xác định";
    if (!acc[tenHeThong]) {
      acc[tenHeThong] = {
        tongSoDanhGia: 0,
        mucDoRuiRoGanNhat: risk.level,
        lichSuDanhGia: [],
      };
    }
    acc[tenHeThong].tongSoDanhGia += 1;
    acc[tenHeThong].lichSuDanhGia.push({
      tenRuiRo: risk.name || "Không có tên", // Hiển thị tên rủi ro nếu có
      mucDo: risk.level,
      mucDoSo: chuyenDoiMucDoRuiRo(risk.level),
      thoiGian: risk.timestamp,
    });
    acc[tenHeThong].mucDoRuiRoGanNhat = risk.level; // Giả định mục nhập cuối là gần đây nhất
    return acc;
  }, {});

  // Chuyển đổi dữ liệu thống kê thành danh sách để hiển thị
  const danhSachHeThong = Object.entries(tinhThongKeHeThong).map(
    ([ten, duLieu]) => ({
      ten,
      tongSoDanhGia: duLieu.tongSoDanhGia,
      mucDoRuiRoGanNhat: duLieu.mucDoRuiRoGanNhat,
      lichSuDanhGia: duLieu.lichSuDanhGia,
    })
  );

  // Hàm để chọn hệ thống để xem chi tiết
  const chonHeThong = (heThong) => {
    setHeThongDuocChon(heThong);
  };

  // Hàm xác định màu sắc dựa trên mức độ rủi ro
  const layMauSacTheoMucDo = (mucDo) => {
    if (mucDo <= 1) return "rgba(75, 192, 192, 0.6)"; // Rủi ro thấp (màu xanh)
    if (mucDo === 2) return "rgba(255, 206, 86, 0.6)"; // Rủi ro trung bình (màu vàng)
    if (mucDo === 3) return "rgba(255, 159, 64, 0.6)"; // Rủi ro cao (màu cam)
    if (mucDo >= 4) return "rgba(255, 99, 132, 0.6)"; // Rủi ro rất cao (màu đỏ)
    return "rgba(201, 203, 207, 0.6)"; // Màu mặc định cho giá trị không xác định
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Thống Kê Hệ Thống
      </h2>
      {heThongDuocChon ? (
        <div>
          <h3 className="text-xl font-semibold mb-4">{heThongDuocChon.ten}</h3>
          <button
            onClick={() => setHeThongDuocChon(null)}
            className="px-3 py-1 bg-blue-500 text-white rounded mb-4"
          >
            Quay Lại
          </button>
          <Bar
            data={{
              labels: heThongDuocChon.lichSuDanhGia.map(
                (entry, index) => `Lần ${index + 1}: ${entry.tenRuiRo}`
              ), // Hiển thị tên rủi ro trong nhãn
              datasets: [
                {
                  label: "Mức Độ Rủi Ro",
                  data: heThongDuocChon.lichSuDanhGia.map(
                    (entry) => entry.mucDoSo
                  ),
                  backgroundColor: heThongDuocChon.lichSuDanhGia.map((entry) =>
                    layMauSacTheoMucDo(entry.mucDoSo)
                  ),
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
          <div className="mt-4">
            <p className="text-center font-semibold">Chú Thích:</p>
            <ul className="text-sm text-gray-700 list-disc list-inside">
              <li style={{ color: "rgba(75, 192, 192, 1)" }}>
                Thấp (Mức 1) - Màu Xanh
              </li>
              <li style={{ color: "rgba(255, 206, 86, 1)" }}>
                Trung Bình (Mức 2) - Màu Vàng
              </li>
              <li style={{ color: "rgba(255, 159, 64, 1)" }}>
                Cao (Mức 3) - Màu Cam
              </li>
              <li style={{ color: "rgba(255, 99, 132, 1)" }}>
                Nguy Hiểm (Mức 4) - Màu Đỏ
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 border">Tên Hệ Thống</th>
                <th className="px-4 py-2 border">Số Lần Đánh Giá</th>
                <th className="px-4 py-2 border">Mức Rủi Ro Gần Đây Nhất</th>
                <th className="px-4 py-2 border">Chi Tiết</th>
              </tr>
            </thead>
            <tbody>
              {danhSachHeThong.map((heThong, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{heThong.ten}</td>
                  <td className="border px-4 py-2 text-center">
                    {heThong.tongSoDanhGia}
                  </td>
                  <td className="border px-4 py-2 text-center capitalize">
                    {heThong.mucDoRuiRoGanNhat}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => chonHeThong(heThong)}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Xem Chi Tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Statistics;
