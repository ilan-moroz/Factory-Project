import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useLocation } from "react-router-dom";
import Department from "./pages/Department";
import Page404 from "./pages/page404/page404";
import Shifts from "./pages/Shifts";
import Employees from "./pages/Employees";
import useDataFetching from "./hooks/useDataFetching";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname !== "/";

  //if redux states are empty get all from database and save in redux
  useDataFetching();

  return (
    <div className="App">
      {/* hide navbar on main page(login) */}
      <header>{hideNavbar && <NavBar />}</header>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
