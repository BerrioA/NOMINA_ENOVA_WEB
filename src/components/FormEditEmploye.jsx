import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import SelectInput from "./UI/SelectInput";
import SelectInputCargos from "./UI/SelectInputCargo";
import SelectInputBancos from "./UI/SelectInputBanco";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const FormEditEmploye = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cc, setCc] = useState("");
  const [banco, setBanco] = useState("");
  const [numcuenta, setNunCuenta] = useState("");
  const [sede, setSede] = useState("");
  const [cargo, setCargo] = useState("");
  const [honomensual, setHonoMensual] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getEmpleadoById = async () => {
      try {
        const response = await axios.get(
          `https://sistema-gestion-nomina-enova.onrender.com/empleados/${id}`
        );
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setCc(response.data.cc);
        setBanco(response.data.banco);
        setNunCuenta(response.data.numcuenta);
        setSede(response.data.sede);
        setCargo(response.data.cargo);
        setHonoMensual(response.data.honomensual);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getEmpleadoById();
  }, [id]);

  const actualizarEmpleado = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://sistema-gestion-nomina-enova.onrender.com/empleados/${id}`,
        {
          nombre: nombre,
          apellido: apellido,
          cc: cc,
          banco: banco,
          numcuenta: numcuenta,
          sede: sede,
          cargo: cargo,
          honomensual: honomensual,
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
      <form onSubmit={actualizarEmpleado}>
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
              type="number"
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
            value={sede}
            onChange={(selected) => setSede(selected.currentKey)}
          />
          <SelectInputCargos
            label={"Cargo"}
            placeholder={"Seleccione un Cargo"}
            value={cargo}
            onChange={(selected) => setCargo(selected.currentKey)} // Manejar el cambio
          />
          <InputSingle
            type="number" // Considerar cambiar a "number" para mejor validación
            label="Honorarios Mensuales"
            value={honomensual}
            onChange={(e) => setHonoMensual(parseFloat(e.target.value) || 0)} // Convertir a número
          />
        </div>
        <ButtonSingle
          type="submit"
          textButton="Actualizar datos del Empleado"
        />
        <p>{msg}</p>
      </form>
    </div>
  );
};
