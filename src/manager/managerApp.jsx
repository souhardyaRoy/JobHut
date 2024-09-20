import React from "react";
import { HashRouter, Route, Routes, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import ManagerDashBoard from "./managerDashBoard";
import NewProfiles from "./newProfile";
import SelectedProfiles from "./selectedProfiles";

function Managerapp() {
  return (
    <HashRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="me-auto">
            <Nav.Link className="me-5" as={NavLink} to="/">
              <i className="fa fa-users"></i> JobHut
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} className=" ms-5" to="/">
                <i className="fa fa-home"></i> Dashboard
              </Nav.Link>
              <Nav.Link as={NavLink} className="ms-3 me-2" to="/new-profiles">
                <i className="fa fa-users"></i> New Profiles
              </Nav.Link>
              <Nav.Link as={NavLink} className="ms-3 me-2" to="/allProfiles">
                <i className="fa fa-check"></i> Selected
              </Nav.Link>
              <Nav.Link className="ms-3">
                Hi,{localStorage.getItem("fullname")}
              </Nav.Link>

              <Nav.Link className="ms-3" onClick={logout}>
                <i className="fa fa-power-off"></i> log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-3 mb-5">
        <Routes>
          <Route path="/" element={<ManagerDashBoard />} />
          <Route path="/new-profiles" element={<NewProfiles />} />
          <Route path="/allProfiles" element={<SelectedProfiles />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default Managerapp;

const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};
