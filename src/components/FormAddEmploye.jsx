import { useState } from "react";
import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import SelectInput from "./UI/SelectInput";
import SelectInputBancos from "./UI/SelectInputBanco";
import SelectInputCargos from "./UI/SelectInputCargo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const FormAddEmploye = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nit, setNit] = useState(""); // Cambiado de correo a nit
  const [banco, setBanco] = useState(""); // Cambiado de password a banco
  const [numcuenta, setNumCuenta] = useState(""); // Cambiado de rol a numcuenta
  const [honomensual, setHonoMensual] = useState(""); // Honorarios mensuales
  const [sede, setSede] = useState("");
  const [cargo, setCargo] = useState(""); // Cambiado de rol a cargo
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const guardarEmpleado = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/empleados", {
        nombre: nombre,
        apellido: apellido,
        nit: nit, // Guardar el nit
        banco: banco, // Guardar el banco
        numcuenta: numcuenta, // Guardar el número de cuenta
        honomensual: honomensual, // Guardar honorarios mensuales
        sede: sede, // Guardar la sede
        cargo: cargo, // Guardar el cargo
      });
      navigate("/empleados"); // Redirigir a la lista de empleados
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container_principal mx-auto p-4">
      <form onSubmit={guardarEmpleado}>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle
            type="text"
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <InputSingle
            type="text"
            label="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="sm:flex-1">
            <InputSingle
              type="text"
              label="NIT"
              value={nit} // Cambiado a nit
              onChange={(e) => setNit(e.target.value)}
            />
          </div>
          <div className="flex sm:flex-1 gap-4">
            <SelectInputBancos
              label={"Banco"}
              placeholder={"Seleccione un Banco"}
              value={banco} // Cambiado de password a banco
              onChange={(selected) => setBanco(selected.currentKey)} // Manejar el cambio de banco
            />
            <InputSingle
              type="text"
              label="N° Cuenta"
              value={numcuenta} // Cambiado de rol a numcuenta
              onChange={(e) => setNumCuenta(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle
            type="text"
            label="Honorarios Mensuales"
            value={honomensual} // Honorarios mensuales
            onChange={(e) => setHonoMensual(e.target.value)}
          />
          <SelectInput
            Disable
            label={"Sede a la que pertenece"}
            placeholder={"Seleccione una Sede"}
            value={sede}
            onChange={(selected) => setSede(selected.currentKey)}
          />
          <SelectInputCargos
            label={"Cargo"}
            placeholder={"Seleccione un Cargo"}
            value={cargo} // Cambiado de rol a cargo
            onChange={(selected) => setCargo(selected.currentKey)} // Manejar el cambio de cargo
          />
        </div>
        <ButtonSingle type="submit" textButton="Guardar Empleado" />
        <p>{msg}</p>
      </form>
    </div>
  );
};
