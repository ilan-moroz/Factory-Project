import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import { useLocation } from "react-router-dom";
import Department from "./pages/Department/Department";
import Page404 from "./pages/page404/page404";
import Shifts from "./pages/Shifts";
import Employees from "./pages/Employees";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname !== "/";

  return (
    <div className="App">
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
