import React from "react";
import RiskForm from "./RiskAssessmentForm";
import RiskMatrixTable from "./RiskMatrixTable";

function App() {
  return (
    <div className="App bg-slate-400 h-min-[100vh]">
      <h1 className="text-center py-5 text-xl font-bold">
        Đánh giá Rủi ro Bảo mật theo ISO 27005
      </h1>
      <RiskMatrixTable />

      <RiskForm />
    </div>
  );
}

export default App;
