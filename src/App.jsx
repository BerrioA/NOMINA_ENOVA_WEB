import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Dashboard } from "./pages/Dashboard";
import { Admins } from "./pages/Admins";
import { Employees } from "./pages/Employees";
import { Coordinators } from "./pages/Coordinators";
import { Nomina } from "./pages/Nomina";
import { Consolidado } from "./pages/Consolidado";
import { AddEmploye } from "./pages/AddEmploye";
import { EditEmploye } from "./pages/EditEmploye";
import { AddAdmin } from "./pages/AddAdmin";
import { EditAdmin } from "./pages/EditAdmin";
import { AddCoordinator } from "./pages/AddCoordinator";
import { EditCoordinador } from "./pages/EditCoordinador";
import { UploadNomina } from "./pages/UploadNomina";
import { EditNomina } from "./pages/EditNomina";

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
          <Route path="/nominas/:id/empleados/:id" element={<EditNomina />} />
          <Route path="/consolidado" element={<Consolidado />} />
          <Route path="/empleado/agregar" element={<AddEmploye />} />
          <Route path="/empleados/editar/:id" element={<EditEmploye />} />
          <Route path="/administrador/agregar" element={<AddAdmin />} />
          <Route path="/administrador/editar/:id" element={<EditAdmin />} />
          <Route path="/coordinador/agregar" element={<AddCoordinator />} />
          <Route path="/coordinador/editar/:id" element={<EditCoordinador />} />
          <Route path="/empleados/:id/nomina" element={<UploadNomina />} />
          <Route path="/ajustes" element={<EditEmploye />} />
          <Route path="/ayuda" element={<EditEmploye />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
