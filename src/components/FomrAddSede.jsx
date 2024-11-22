import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import axios from "axios";
import { useState } from "react";

export const FormAddSede = () => {
  const [nombresede, setNombreSede] = useState("");
  const [msg, setMsg] = useState("");

const guardarSede = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5000/sedes", {
      nombresede,
    });
    setNombreSede("");
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};

  return (
    <div className="container_principal mx-auto p-4 shadow-lg rounded-xl font-semibold">
      <p className="text-center">Agregar Sede</p>
      <form onSubmit={guardarSede}>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle
            type="text"
            label="Nombre Sede"
            value={nombresede}
            onChange={(e) => setNombreSede(e.target.value)}
          />
        </div>

        <ButtonSingle textButton="Registrar Sede" type="submit" />
        <p className="text-center text-red-500">{msg}</p>
      </form>
    </div>
  );
};
