import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useLocation } from "react-router-dom";
import Department from "./pages/Department/Department";

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
        </Routes>
      </main>
    </div>
  );
}

export default App;
