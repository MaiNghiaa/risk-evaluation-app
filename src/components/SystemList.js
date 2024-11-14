import React, { useState } from "react";

const SystemList = ({
  systems,
  onAddSystem,
  onUpdateSystem,
  onDeleteSystem,
}) => {
  const [systemName, setSystemName] = useState("");
  const [systemDescription, setSystemDescription] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (systemName) {
      onAddSystem({ name: systemName, description: systemDescription });
      setSystemName("");
      setSystemDescription("");
    }
  };

  const handleEdit = (system) => {
    setIsEditing(system);
    setEditName(system.name);
    setEditDescription(system.description);
  };

  const handleSave = () => {
    if (isEditing) {
      onUpdateSystem({
        ...isEditing,
        name: editName,
        description: editDescription,
      });
      setIsEditing(null);
      setEditName("");
      setEditDescription("");
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setEditName("");
    setEditDescription("");
  };

  const handleDelete = (system) => {
    onDeleteSystem(system);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800 text-center">
        Thông Tin Hệ Thống
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={systemName}
          onChange={(e) => setSystemName(e.target.value)}
          placeholder="Tên hệ thống"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          value={systemDescription}
          onChange={(e) => setSystemDescription(e.target.value)}
          placeholder="Mô tả hệ thống"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Thêm Hệ Thống
        </button>
      </form>
      {systems.length > 0 ? (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg border-collapse border">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2 border">Tên Hệ Thống</th>
                <th className="px-4 py-2 border">Mô Tả</th>
                <th className="px-4 py-2 border">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {systems.map((system, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    {isEditing === system ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      system.name
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {isEditing === system ? (
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : system.description ? (
                      system.description
                    ) : (
                      "Không có"
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {isEditing === system ? (
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
                          onClick={() => handleEdit(system)}
                          className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(system)}
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
          Chưa có hệ thống nào được thêm.
        </p>
      )}
    </div>
  );
};

export default SystemList;
