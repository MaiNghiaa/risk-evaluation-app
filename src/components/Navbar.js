import React from "react";

const Navbar = ({ onSelectPage, currentPage }) => {
  return (
    <nav className="bg-blue-600 text-white py-3 px-6 shadow-lg">
      <ul className="flex justify-around">
        <li
          className={`cursor-pointer ${
            currentPage === "systems" ? "underline" : ""
          }`}
          onClick={() => onSelectPage("systems")}
        >
          Quản Lý Hệ Thống
        </li>
        <li
          className={`cursor-pointer ${
            currentPage === "assessments" ? "underline" : ""
          }`}
          onClick={() => onSelectPage("assessments")}
        >
          Đánh Giá Rủi Ro
        </li>
        <li
          className={`cursor-pointer ${
            currentPage === "statistics" ? "underline" : ""
          }`}
          onClick={() => onSelectPage("statistics")}
        >
          Thống Kê
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
