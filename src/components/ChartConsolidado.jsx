import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@nextui-org/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los elementos de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartConsolidado = () => {
  const [dataSedes, setDataSedes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNominas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/nominas");
        const nominas = response.data;

        // Agrupar las nóminas por sede y periodo
        const sedes = {};
        nominas.forEach(({ sede, periodo, totalpagar }) => {
          if (!sedes[sede]) sedes[sede] = { 1: 0, 2: 0 };
          sedes[sede][periodo] += Number(totalpagar || 0);
        });

        // Transformar los datos para la gráfica
        const labels = Object.keys(sedes);
        const period1Data = labels.map((sede) => sedes[sede][1]);
        const period2Data = labels.map((sede) => sedes[sede][2]);

        setDataSedes({
          labels,
          datasets: [
            {
              label: "Periodo 1",
              data: period1Data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
              label: "Periodo 2",
              data: period2Data,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
          ],
        });
      } catch (err) {
        setError(`Error al cargar los datos: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNominas();
  }, []);

  return (
    <div className="p-2 bg-zinc-100 rounded-lg">
      <h4 className="text-sm font-bold text-center mb-2">
        Comparación por Sede y Periodo
      </h4>
      <Card className="h-auto max-w-sm mx-auto p-4">
        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <Bar
            data={dataSedes}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Total a Pagar por Sede y Periodo",
                },
              },
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default ChartConsolidado;
