import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import SelectInput from "./UI/SelectInput";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const FormEditCoordinator = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [cargo, setCargo] = useState("");
  const [sede, setSede] = useState("");
  const [rol, setRol] = useState("Coordinador");
  const [msg, setMsg] = useState("");
  const [sedesOptions, setSedesOptions] = useState([]); // Cambié el nombre de 'setSedesOptions' a 'sedesOptions' aquí.
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Obtener los datos del coordinador
    const getCoordinadorById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/coordinadores/${id}`
        );
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setCorreo(response.data.correo);
        setPassword(response.data.password);
        setConfPassword(response.data.confPassword);
        setCargo(response.data.cargo);
        setSede(response.data.sede); // Sede UUID
        setRol(response.data.rol);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getCoordinadorById();
  }, [id]);

  useEffect(() => {
    // Obtener las opciones de sedes
    const fetchSedes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/sedes/${id}/`
        );
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

  const actualizarCoordinador = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/coordinadores/${id}`, {
        nombre,
        apellido,
        correo,
        password,
        confPassword,
        cargo,
        sede, // Enviar el UUID de la sede
        rol,
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
      <form onSubmit={actualizarCoordinador}>
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
            isDisabled
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          />
          <SelectInput
            label="Sede a la que pertenece"
            placeholder="Seleccione una Sede"
            value={sede}
            onChange={setSede} // Al seleccionar una opción, almacena el UUID en 'sede'
            options={sedesOptions} // Opciones de sedes
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

        <ButtonSingle textButton="Actualizar Coordinador" type="submit" />
        <p className="text-center text-red-500">{msg}</p>
      </form>
    </div>
  );
};
