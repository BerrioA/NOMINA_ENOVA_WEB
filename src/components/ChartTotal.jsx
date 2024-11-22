"use client";
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

// Registrar los módulos de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartTotal = () => {
  const [chartData, setChartData] = useState({});
  const [totalConsolidado, setTotalConsolidado] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNominas = async () => {
      try {
        const response = await axios.get(
          "https://sistema-gestion-nomina-enova.onrender.com/nominas"
        );
        const nominas = response.data;

        // Agrupamos los totales por sede
        const groupedData = nominas.reduce((acc, { sede, totalpagar }) => {
          acc[sede] = (acc[sede] || 0) + parseFloat(totalpagar || 0);
          return acc;
        }, {});

        // Calculamos el total consolidado
        const total = Object.values(groupedData).reduce(
          (sum, value) => sum + value,
          0
        );
        setTotalConsolidado(total);

        // Preparamos los datos para el gráfico
        setChartData({
          labels: Object.keys(groupedData), // Nombres de las sedes
          datasets: [
            {
              label: "Total a Pagar (COP)",
              data: Object.values(groupedData), // Totales por sede
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error al obtener las nóminas:", error);
        setError("Error al obtener los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchNominas();
  }, []);

  return (
    <div className="p-2 bg-zinc-100 rounded-lg">
      <h4 className="text-sm font-bold text-center mb-2">
        Total Consolidado por Sede
      </h4>
      <Card className="shadow-lg w-full max-w-md mx-auto">
        <div className="p-4">
          {loading ? (
            <p className="text-center">Cargando...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "Total a Pagar por Sede" },
                  },
                }}
              />
              {/* Mostrar el total debajo del gráfico */}
              <h2 className="text-center text-xl font-bold text-slate-900 mt-4">
                $ {totalConsolidado.toLocaleString("es-CO")} COP
              </h2>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ChartTotal;
