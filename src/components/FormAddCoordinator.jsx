import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import SelectInput from "./UI/SelectInput";
import { useState } from "react";
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
  const navigate = useNavigate();

  const guardarCoordinador = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/coordinadores", {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        password: password,
        confPassword: confPassword,
        sede: sede,
        rol: rol,
        cargo: cargo,
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
