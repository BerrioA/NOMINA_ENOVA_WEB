import { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Example = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sistema-gestion-nomina-enova.onrender.com/nominas"
        );
        const fetchedData = response.data;

        console.log("Datos obtenidos de la API:", fetchedData); // Verifica los datos

        const totalBySede = {};

        // Agrupar datos por sede
        fetchedData.forEach((item) => {
          const sede = item.empleado.sede;
          const totalInscripciones =
            parseFloat(item.totalinscripcionesliquidar) || 0; // Asegúrate de que este campo existe

          if (!totalBySede[sede]) {
            totalBySede[sede] = {
              sede: sede,
              totalInscripciones: 0,
            };
          }
          totalBySede[sede].totalInscripciones += totalInscripciones; // Acumula el total
        });

        console.log("Datos agrupados por sede:", totalBySede); // Verifica los datos agrupados

        setData(Object.values(totalBySede));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-4 max-w-4xl mx-auto">
      <h2 className="text-lg font-bold text-center mb-4">
        Total de Inscripciones por Sede
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="sede" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Area dataKey="totalInscripciones" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="totalInscripciones" barSize={20} fill="#413ea0" />
          <Line dataKey="totalInscripciones" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Example;
