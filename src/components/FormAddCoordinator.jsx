import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import SelectInput from "./UI/SelectInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SelectInputCargos from "./UI/SelectInputCargo";

export const FormAddCoordinator = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [sede, setSede] = useState("");
  const [rol, setRol] = useState("Coordinador");
  const [cargo, setCargo] = useState("");
  const [msg, setMsg] = useState("");
  const [setSedesOptions] = useState([]);
  const [setCargosOptions] = useState([]);
  const navigate = useNavigate();

  // Obtener las sedes desde la API sin necesidad de importar servicios externos
  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/sedes/");
        const options = response.data.map((sede) => ({
          key: sede.uuid,
          label: sede.nombresede,
          value: sede.uuid,
        }));
        setSedesOptions(options);
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
      }
    };
    fetchSedes();
  }, []);

  // Obtener las sedes desde la API sin necesidad de importar servicios externos
  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cargos");
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

  const guardarCoordinador = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/coordinadores", {
        nombre,
        apellido,
        correo,
        password,
        confPassword,
        sede,
        rol,
        cargo,
      });
      navigate("/coordinadores");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container_principal mx-auto p-4">
      <form onSubmit={guardarCoordinador}>
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
          <InputSingle
            type="text"
            label="Rol"
            isDisabled
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          />
          <SelectInput
            label="Sede a la que pertenece"
            placeholder="Seleccione una Sede"
            value={sede}
            onChange={setSede}
          />

          <SelectInputCargos
            label={"Cargo"}
            placeholder={"Seleccione un Cargo"}
            value={cargo}
            onChange={setCargo}
          />
        </div>
        <InputSingle
          type="email"
          label="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle
            type="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputSingle
            type="password"
            label="Confirmar Contraseña"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
        </div>

        <ButtonSingle type="submit" textButton="Registrar Coordinador" />
        <p className="text-center text-red-500">{msg}</p>
      </form>
    </div>
  );
};
