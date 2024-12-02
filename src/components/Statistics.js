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
import * as XLSX from "xlsx"; // Import thư viện xlsx

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
  console.log(risks);
  const chuyenDoiMucDoRuiRo = (mucDo) => {
    const mucDoMap = {
      Thấp: 1,
      "Trung bình": 2,
      Cao: 3,
      "Nguy hiểm": 4,
    };
    return mucDoMap[mucDo] || 0;
  };

  const tinhThongKeHeThong = risks.reduce((acc, risk) => {
    const tenHeThong = risk.system || "Không xác định";
    if (!acc[tenHeThong]) {
      acc[tenHeThong] = {
        tongSoDanhGia: 0,
        mucDoRuiRoGanNhat: risk.level,
        lichSuDanhGia: [],
        thoigian: risk.id,
      };
    }
    acc[tenHeThong].tongSoDanhGia += 1;
    acc[tenHeThong].lichSuDanhGia.push({
      tenRuiRo: risk.name || "Không có tên",
      mucDo: risk.level,
      mucDoSo: chuyenDoiMucDoRuiRo(risk.level),
      thoiGian: risk.id,
    });
    acc[tenHeThong].mucDoRuiRoGanNhat = risk.level;
    return acc;
  }, {});

  const danhSachHeThong = Object.entries(tinhThongKeHeThong).map(
    ([ten, duLieu]) => ({
      ten,
      tongSoDanhGia: duLieu.tongSoDanhGia,
      mucDoRuiRoGanNhat: duLieu.mucDoRuiRoGanNhat,
      lichSuDanhGia: duLieu.lichSuDanhGia,
      thoiGian: duLieu.thoiGian,
    })
  );

  const xuatDuLieuExcel = () => {
    const dataForExcel = danhSachHeThong.flatMap((heThong) =>
      heThong.lichSuDanhGia.map((entry) => ({
        "Tên Hệ Thống": heThong.ten,
        "Tổng Số Đánh Giá": heThong.tongSoDanhGia,
        "Mức Rủi Ro Gần Đây Nhất": heThong.mucDoRuiRoGanNhat,
        "Tên Rủi Ro": entry.tenRuiRo,
        "Mức Độ Rủi Ro": entry.mucDo,
        "Thời Gian": new Intl.DateTimeFormat("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date(entry.thoiGian)),
      }))
    );

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Statistics");
    XLSX.writeFile(workbook, "ThongKeRuiRo.xlsx");
  };

  // Hàm để chọn hệ thống để xem chi tiết
  const chonHeThong = (heThong) => {
    setHeThongDuocChon(heThong);
  };
  const layMauSacTheoMucDo = (mucDo) => {
    if (mucDo <= 1) return "rgba(75, 192, 192, 0.6)"; // Rủi ro thấp
    if (mucDo === 2) return "rgba(255, 206, 86, 0.6)"; // Rủi ro trung bình
    if (mucDo === 3) return "rgba(255, 159, 64, 0.6)"; // Rủi ro cao
    if (mucDo >= 4) return "rgba(255, 99, 132, 0.6)"; // Rủi ro rất cao
    return "rgba(201, 203, 207, 0.6)"; // giá trị không xác định
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
              ),
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
          <button
            onClick={xuatDuLieuExcel}
            className="px-3 py-1 bg-green-500 text-white rounded mt-4"
          >
            Xuất file excel
          </button>
        </div>
      )}
    </div>
  );
};

export default Statistics;
