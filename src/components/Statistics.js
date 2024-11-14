import React, { useState } from "react";
import SearchBar from "./SearchBar";

const Statistics = ({ risks, onUpdateRisk, onDeleteRisk }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editName, setEditName] = useState("");
  const [editSystem, setEditSystem] = useState("");
  const [editLevel, setEditLevel] = useState("");

  // Lọc các rủi ro dựa trên từ khóa tìm kiếm
  const filteredRisks = risks.filter(
    (risk) =>
      risk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (risk.system &&
        risk.system.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (risk) => {
    setIsEditing(risk);
    setEditName(risk.name);
    setEditSystem(risk.system);
    setEditLevel(risk.level);
  };

  const handleSave = () => {
    if (isEditing) {
      onUpdateRisk({
        ...isEditing,
        name: editName,
        system: editSystem,
        level: editLevel,
      });
      setIsEditing(null);
      setEditName("");
      setEditSystem("");
      setEditLevel("");
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setEditName("");
    setEditSystem("");
    setEditLevel("");
  };

  const handleDelete = (risk) => {
    onDeleteRisk(risk);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Thống Kê Rủi Ro
      </h2>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {filteredRisks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 border">Hệ Thống</th>
                <th className="px-4 py-2 border">Tên Rủi Ro</th>
                <th className="px-4 py-2 border">Mức Độ Rủi Ro</th>
                <th className="px-4 py-2 border">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {filteredRisks.map((risk, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-center">
                    {isEditing === risk ? (
                      <input
                        type="text"
                        value={editSystem}
                        onChange={(e) => setEditSystem(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      risk.system || "N/A"
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {isEditing === risk ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      risk.name
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center capitalize">
                    {isEditing === risk ? (
                      <select
                        value={editLevel}
                        onChange={(e) => setEditLevel(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      >
                        <option value="thấp">Thấp</option>
                        <option value="trung bình">Trung bình</option>
                        <option value="cao">Cao</option>
                        <option value="nguy hiểm">Nguy hiểm</option>
                      </select>
                    ) : (
                      risk.level
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {isEditing === risk ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-3 py-1 bg-gray-500 text-white rounded"
                        >
                          Hủy
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(risk)}
                          className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(risk)}
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          Xóa
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">
          Không có rủi ro nào để thống kê.
        </p>
      )}
    </div>
  );
};

export default Statistics;
