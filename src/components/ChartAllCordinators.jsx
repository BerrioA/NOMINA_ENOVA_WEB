import { useEffect, useState } from "react";
import { Card } from "@nextui-org/react";
import axios from "axios";

const ChartAllCordinators = () => {
  const [coordinadores, setCoordinadores] = useState([]);

  useEffect(() => {
    const fetchCoordinadores = async () => {
      try {
        const response = await axios.get(
          "https://sistema-gestion-nomina-enova.onrender.com/coordinadores"
        );
        setCoordinadores(response.data);
      } catch (error) {
        console.error("Error al obtener los empleados:", error);
      }
    };

    fetchCoordinadores();
  }, []);

  return (
    <div className="p-2 bg-zinc-100 rounded-lg">
      <h4 className="text-sm font-bold text-center mb-2">Coordinadores</h4>
      <Card className="shadow-lg w-full max-w-md mx-auto">
        <div className="max-h-64 overflow-y-auto">
          <ul className="space-y-2 p-2">
            {coordinadores.slice(0, 4).map((coordinador) => (
              <li
                key={coordinador.uuid}
                className="flex justify-between p-2 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
              >
                <span className="font-semibold">
                  {coordinador.nombre} {coordinador.apellido}
                </span>
                <span>{coordinador.sede}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ChartAllCordinators;
