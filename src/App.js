import React, { useState, useEffect } from "react";
import RiskEvaluationPage from "./RiskEvaluationPage";

function App() {
  // Load systems and risks from localStorage on initial load
  const [systems, setSystems] = useState(() => {
    const savedSystems = localStorage.getItem("systems");
    return savedSystems ? JSON.parse(savedSystems) : [];
  });

  const [risks, setRisks] = useState(() => {
    const savedRisks = localStorage.getItem("risks");
    return savedRisks ? JSON.parse(savedRisks) : [];
  });

  useEffect(() => {
    localStorage.setItem("systems", JSON.stringify(systems));
  }, [systems]);

  useEffect(() => {
    localStorage.setItem("risks", JSON.stringify(risks));
  }, [risks]);

  return (
    <div className="App bg-gradient-to-r from-blue-400 to-slate-400 min-h-screen flex flex-col">
      <header className="bg-white shadow-md py-5">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Đánh giá Rủi ro Bảo mật theo ISO 27005
        </h1>
      </header>
      <main className="flex-grow p-6">
        <RiskEvaluationPage
          systems={systems}
          setSystems={setSystems}
          risks={risks}
          setRisks={setRisks}
        />
      </main>
    </div>
  );
}

export default App;
