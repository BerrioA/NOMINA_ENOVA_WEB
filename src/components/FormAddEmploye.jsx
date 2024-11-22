import { useState, useEffect } from "react";
import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import SelectInputBancos from "./UI/SelectInputBanco";
import SelectInputCargos from "./UI/SelectInputCargo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const FormAddEmploye = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cc, setCc] = useState("");
  const [banco, setBanco] = useState("");
  const [numcuenta, setNumCuenta] = useState("");
  const [honomensual, setHonoMensual] = useState("");
  const [sede] = useState("");
  const [cargo, setCargo] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [setCargosOptions] = useState([]);

  // Obtener las sedes desde la API sin necesidad de importar servicios externos
  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const response = await axios.get(
          "https://sistema-gestion-nomina-enova.onrender.com/cargos"
        );
        const options = response.data.map((cargo) => ({
          key: cargo.uuid,
          label: cargo.nombrecargo,
          value: cargo.uuid,
        }));
        setCargosOptions(options);
      } catch (error) {
        console.error("Error al obtener los cargos:", error);
      }
    };
    fetchCargos();
  }, []);

  const guardarEmpleado = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://sistema-gestion-nomina-enova.onrender.com/empleados",
        {
          nombre: nombre,
          apellido: apellido,
          cc: cc,
          banco: banco,
          numcuenta: numcuenta,
          honomensual: honomensual,
          sede: sede,
          cargo: cargo,
        }
      );
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
              type="number"
              label="N° Cédula"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
            />
          </div>
          <div className="flex sm:flex-1 gap-4">
            <SelectInputBancos
              label={"Banco"}
              placeholder={"Seleccione un Banco"}
              value={banco}
              onChange={(selected) => setBanco(selected.currentKey)}
            />
            <InputSingle
              type="text"
              label="N° Cuenta"
              value={numcuenta}
              onChange={(e) => setNumCuenta(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle
            type="text"
            label="Honorarios Mensuales"
            value={honomensual}
            onChange={(e) => setHonoMensual(e.target.value)}
          />
          <SelectInputCargos
            label={"Cargo"}
            placeholder={"Seleccione un Cargo"}
            value={cargo}
            onChange={setCargo}
          />
        </div>
        <ButtonSingle type="submit" textButton="Guardar Empleado" />
        <p className="text-center text-red-500">{msg}</p>
      </form>
    </div>
  );
};
