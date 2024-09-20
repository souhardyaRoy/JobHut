import MyLogin from "./login";
import App from "./App";

const Home = () => {
  let login = localStorage.getItem("easytohire-token");
  if (login == null) {
    return <MyLogin />;
  } else {
    return <App />;
  }
};

export default Home;
