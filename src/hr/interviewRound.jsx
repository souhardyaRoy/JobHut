
import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateInterviewRound from "./CreateInterviewRound";
import ManageInterviewRound from "./ManageInterviewRound";

const InterViewRound = () => {

  return (
    <div className="container">
      <Routes>
        <Route path="create" element={<CreateInterviewRound  />} />
        <Route path="manage" element={<ManageInterviewRound  />} />
      </Routes>
    </div>
  );
};

export default InterViewRound;
