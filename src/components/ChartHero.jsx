"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const ChartHero = () => {
  const [data, setData] = useState([]);

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/nominas");

      // Agrupamos los datos por sede y sumamos los valores de cada campo
      const groupedData = response.data.reduce((acc, curr) => {
        const { sede } = curr.empleado;
        if (!acc[sede]) {
          acc[sede] = {
            sede,
            totalHonoQuincena: 0,
            totalDiasLiquidar: 0,
            totalPagar: 0,
          };
        }
        acc[sede].totalHonoQuincena += parseFloat(curr.honoquincena);
        acc[sede].totalDiasLiquidar += curr.totaldiasliquidar;
        acc[sede].totalPagar += parseFloat(curr.totalpagar);
        return acc;
      }, {});

      // Convertimos el objeto en un array para que pueda ser usado por Recharts
      const formattedData = Object.values(groupedData);
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Llamada a fetchData cuando se monta el componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-2 bg-zinc-100 rounded-lg">
      <h4 className="text-sm font-bold text-center mb-2">
        Resumen de Nóminas por Sede
      </h4>

      <div className="mt-2">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sede" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="totalHonoQuincena"
              stroke="#038604"
              fill="#038604"
              name="Honorarios Quincena"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="totalPagar"
              stroke="#4ee100"
              fill="#4ee100"
              name="Total a Pagar"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
