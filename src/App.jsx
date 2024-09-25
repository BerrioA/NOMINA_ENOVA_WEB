import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Dashboard } from "./pages/Dashboard";
import { Admins } from "./pages/Admins";
import { Employees } from "./pages/Employees";
import { Coordinators } from "./pages/Coordinators";
import { Nomina } from "./pages/Nomina";
import { Consolidado } from "./pages/Consolidado";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/administradores" element={<Admins />} />
          <Route path="/empleados" element={<Employees />} />
          <Route path="/coordinadores" element={<Coordinators />} />
          <Route path="/nominas" element={<Nomina />} />
          <Route path="/consolidado" element={<Consolidado />} />
          {/* <Route
            path="/administradores/editar/:id"
            element={<EditarAdministrador />}
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
