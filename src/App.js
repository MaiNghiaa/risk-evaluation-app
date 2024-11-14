import React from "react";
import RiskEvaluationPage from "./RiskEvaluationPage";
// import RiskForm from "./RiskAssessmentForm";
// import RiskMatrixTable from "./components/RiskMatrixTable";
// import SystemList from "./components/SystemList";

function App() {
  return (
    <div className="App bg-slate-400 h-min-[100vh]">
      <h1 className="text-center py-5 text-xl font-bold">
        Đánh giá Rủi ro Bảo mật theo ISO 27005
      </h1>

      <RiskEvaluationPage />
      {/* <RiskMatrixTable />

      <RiskForm />
      <SystemList /> */}
    </div>
  );
}

export default App;
