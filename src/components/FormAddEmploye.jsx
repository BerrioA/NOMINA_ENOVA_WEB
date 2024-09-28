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
  const [nit, setNit] = useState("");
  const [banco, setBanco] = useState("");
  const [numcuenta, setNunCuenta] = useState("");
  const [sede, setSede] = useState("");
  const [cargo, setCargo] = useState("");
  const [honomensual, setHonoMensual] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const guardarEmpleado = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/empleados", {
        nombre: nombre,
        apellido: apellido,
        nit: nit,
        banco: banco,
        numcuenta: numcuenta,
        sede: sede,
        cargo: cargo,
        honomensual: honomensual,
      });
      navigate("/empleados");
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
              label="N° Documento"
              value={nit}
              onChange={(e) => setNit(e.target.value)}
            />
          </div>
          <div className="flex sm:flex-1 gap-4">
            <SelectInputBancos
              label={"Banco"}
              placeholder={"Seleccione un Banco"}
              value={banco} // Mantener el valor seleccionado
              onChange={(selected) => setBanco(selected.currentKey)} // Manejar el cambio
            />
            <InputSingle
              type="text"
              label="N° Cuenta"
              value={numcuenta}
              onChange={(e) => setNunCuenta(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <SelectInput
            label={"Sede a la que pertenece"}
            placeholder={"Seleccione una Sede"}
            value={sede} // Mantener el valor seleccionado
            onChange={(selected) => setSede(selected.currentKey)} // Manejar el cambio
          />
          <SelectInputCargos
            label={"Cargo"}
            placeholder={"Seleccione un Cargo"}
            value={cargo} // Mantener el valor seleccionado
            onChange={(selected) => setCargo(selected.currentKey)} // Manejar el cambio
          />
          <InputSingle
            type="text" // Considerar cambiar a "number" para mejor validación
            label="Honorarios Mensuales"
            value={honomensual}
            onChange={(e) => setHonoMensual(parseFloat(e.target.value) || 0)} // Convertir a número
          />
        </div>
        <ButtonSingle type="submit" textButton="Guardar Empleado" />
        <p>{msg}</p>
      </form>
    </div>
  );
};
