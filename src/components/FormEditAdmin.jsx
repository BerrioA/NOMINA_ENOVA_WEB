import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export const FormEditAdmin = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [rol, setRol] = useState("Administrador");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getAdministradorById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/administradores/${id}`
        );
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setCorreo(response.data.correo);
        setPassword(response.data.password);
        setConfPassword(response.data.confPassword);
        setRol(response.data.rol);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getAdministradorById();
  }, [id]);

  const actualizarAdministrador = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/administradores/${id}`, {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        password: password,
        confPassword: confPassword,
        rol: rol,
      });
      navigate("/administradores");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container_principal mx-auto p-4">
      <form onSubmit={actualizarAdministrador}>
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
          <InputSingle type="email" label="Correo" value={correo} onChange={(e)=> setCorreo(e.target.value)} />
          <InputSingle
            type="text"
            label="Rol"
            isDisabled
            value={rol}
            onChange={(e)=> setRol(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle type="password" label="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputSingle type="password" label="Confirmar Contraseña" value={confPassword} onChange={(e)=> setConfPassword(e.target.value)} />
        </div>

        <ButtonSingle textButton="Actualizar Administrador" type="submit" />
        <p className="text-center text-red-500">{msg}</p>
      </form>
    </div>
  );
};
