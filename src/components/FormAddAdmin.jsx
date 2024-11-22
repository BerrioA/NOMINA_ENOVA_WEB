import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const FormAddAdmin = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [rol, setRol] = useState("Administrador");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const guardarAdministrador = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/administradores", {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        password: password,
        confPassword: confPassword,
        rol: rol,
      });
      navigate("/administradores"); // Redirigir a la lista de empleados
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container_principal mx-auto p-4">
      <form onSubmit={guardarAdministrador}>
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
            type="email"
            label="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <InputSingle
            type="text"
            label="Rol"
            isDisabled // Campo deshabilitado
            value={rol} // Valor por defecto}
            onChange={(e) => setRol(e.target.value)}
          />
        </div>

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

        <ButtonSingle textButton="Registrar Administrador" type="submit" />
        <p className="text-center text-red-500">{msg}</p>
      </form>
    </div>
  );
};
