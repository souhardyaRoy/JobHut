import './App.css';
import HrApp from './hr/hrApp';
import Managerapp from './manager/managerApp';
import MyLogin from './login';
function App() {
  let role = localStorage.getItem("roletype")
  if (role === "HR") {
    return (
      <HrApp />
    );
  } else if (role === "MANAGER") {
    return (
      <Managerapp />
    );
  }
  else {
    return <MyLogin/>
  }

}

export default App;
