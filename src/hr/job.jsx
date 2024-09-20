import React from "react";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Routes, Route, useLocation } from "react-router-dom";
import CreateNewJob from "./CreateNewJobs";
import ListAllJobs from "./ListAllJobs";
import '../styles/Myjob.css'; // Import custom CSS file

const Myjob = () => {
  const location = useLocation();

  return (
    <div>
      <Nav variant="tabs" activeKey={location.pathname} className="justify-content-center">
        <NavItem>
          <LinkContainer to="">
            <NavLink className={`custom-nav-link ${location.pathname === "/" ? "bg-info text-white" : ""}`}>
              Create Job
            </NavLink>
          </LinkContainer>
        </NavItem>
        <NavItem>
          <LinkContainer to="allListedJobs">
            <NavLink className={`custom-nav-link ${location.pathname === "/allListedJobs" ? "bg-info text-white" : ""}`}>
              Listed Jobs
            </NavLink>
          </LinkContainer>
        </NavItem>
      </Nav>

      <Routes>
        <Route path="" element={<CreateNewJob />} />
        <Route path="/allListedJobs" element={<ListAllJobs />} />
      </Routes>
    </div>
  );
};

export default Myjob;
