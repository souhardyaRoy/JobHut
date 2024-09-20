import React , { Suspense } from "react";
import { HashRouter, Route, Routes, NavLink } from "react-router-dom";
import { Navbar, Nav, Container,NavDropdown} from "react-bootstrap";
import Myjob from "./job";
import InterViewRound from "./interviewRound";
import SelectedProfile from "./selectedProfile";
import HrDashBoard from "./HrDashBoard";
import AppliedProfile from "./AppliedProfile";
import { Provider } from "react-redux";
import store from "./redux/store/hr.store";
import "../styles/hrApp.css"
// Utility function to simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// Lazy load ManageEmp with an artificial delay
const ManageEmp = React.lazy(() => delay(2000).then(() => import("./employee")));
// const ManageEmp = React.lazy(() => import("./employee"));

function HrApp() {

  return (
    <HashRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="me-auto">
            <Nav.Link className='me-5' as={NavLink} to="/">
              <i className="fa fa-users"></i> JobHut
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-5"> {/* Add significant left margin */}
              <Nav.Link className="ms-3" as={NavLink} to="/" >
                <i className="fa fa-home"></i> Dashboard
              </Nav.Link>
              <Nav.Link className="ms-3" as={NavLink} to="/job">
                <i className="fa fa-suitcase"></i> Manage Job
              </Nav.Link>
              <Nav.Link className="ms-3" as={NavLink} to="/employee">
                <i className="fa fa-suitcase"></i> Manage Employee
              </Nav.Link>
              <NavDropdown title={<><i className="fa fa-edit"></i> Interview <i class="fa-solid fa-circle-chevron-down fa-sm"></i> </>}  className="ms-3 custom-dropdown">
                <NavDropdown.Item as={NavLink} to="/round/create">Create Interview Round</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/round/manage">Manage & View Interview Round</NavDropdown.Item>
              </NavDropdown> 
              <Nav.Link className="ms-3" as={NavLink} to="/selected-profiles">
                <i className="fa fa-check"></i> Selected Profiles
              </Nav.Link>
              <Nav.Link className="ms-3" >
              Hi,{localStorage.getItem("fullname")} 
              </Nav.Link>
              <Nav.Link className="ms-3"  onClick={logout}>
              <i className="fa fa-power-off"></i> log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-3 mb-5">
        <Provider store={store}>
        <Routes>
          <Route path="/" element={<HrDashBoard />} />
          <Route
              path="/employee"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <ManageEmp />
                </Suspense>
              }
              />
          <Route path="/job/*" element={<Myjob />} />
          <Route path="/round/*" element={<InterViewRound />} />
          <Route path="/selected-profiles" element={<SelectedProfile />} />
          <Route exact path="/appliedprofile/:jobid" element={ <AppliedProfile/> }/>
        </Routes>
        </Provider>
      </div>
    </HashRouter>
  );
}

export default HrApp;

const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};




