import React, { useState } from "react";
import RiskMatrixTable from "./components/RiskMatrixTable";
import SystemList from "./components/SystemList";
import RiskAssessmentForm from "./components/RiskAssessmentForm";
import Statistics from "./components/Statistics";
import Navbar from "./components/Navbar";

const RiskEvaluationPage = () => {
  const [systems, setSystems] = useState([]);
  const [risks, setRisks] = useState([]);
  const [currentPage, setCurrentPage] = useState("systems");

  // Add an id to each system
  const addSystem = (system) => {
    setSystems([...systems, { ...system, id: Date.now() }]);
  };

  // Add an id to each risk
  const addRisk = (risk) => {
    setRisks([...risks, { ...risk, id: Date.now() }]);
  };

  const updateSystem = (updatedSystem) => {
    // Update the system
    setSystems(
      systems.map((system) =>
        system.id === updatedSystem.id ? updatedSystem : system
      )
    );

    // Update related risks with the new system name
    setRisks(
      risks.map((risk) =>
        risk.system === updatedSystem.name
          ? { ...risk, system: updatedSystem.name }
          : risk
      )
    );
  };

  const deleteSystem = (systemToDelete) => {
    // Optional: You can decide whether to delete associated risks as well
    setSystems(systems.filter((system) => system.id !== systemToDelete.id));
  };

  const updateRisk = (updatedRisk) => {
    setRisks(
      risks.map((risk) => (risk.id === updatedRisk.id ? updatedRisk : risk))
    );
  };

  const deleteRisk = (riskToDelete) => {
    setRisks(risks.filter((risk) => risk.id !== riskToDelete.id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Navbar onSelectPage={setCurrentPage} currentPage={currentPage} />
      {currentPage === "systems" && (
        <SystemList
          systems={systems}
          onAddSystem={addSystem}
          onUpdateSystem={updateSystem}
          onDeleteSystem={deleteSystem}
        />
      )}
      {currentPage === "assessments" && (
        <>
          <RiskAssessmentForm systems={systems} onAddRisk={addRisk} />
          <RiskMatrixTable />
        </>
      )}
      {currentPage === "statistics" && (
        <Statistics
          risks={risks}
          onUpdateRisk={updateRisk}
          onDeleteRisk={deleteRisk}
        />
      )}
    </div>
  );
};

export default RiskEvaluationPage;
