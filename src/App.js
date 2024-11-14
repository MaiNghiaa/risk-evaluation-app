import React from "react";
import RiskEvaluationPage from "./RiskEvaluationPage";

function App() {
  return (
    <div className="App bg-gradient-to-r from-blue-400 to-slate-400 min-h-screen flex flex-col">
      <header className="bg-white shadow-md py-5">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Đánh giá Rủi ro Bảo mật theo ISO 27005
        </h1>
      </header>
      <main className="flex-grow p-6">
        <RiskEvaluationPage />
      </main>
    </div>
  );
}

export default App;
