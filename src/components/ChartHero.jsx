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

      // Agrupamos los datos por sede y periodo
      const groupedData = response.data.reduce((acc, curr) => {
        const { sede, periodo } = curr;
        if (!acc[sede]) {
          acc[sede] = { sede, periodo1: 0, periodo2: 0 };
        }
        acc[sede][`periodo${periodo}`] += parseFloat(curr.totalpagar);
        return acc;
      }, {});

      // Convertimos el objeto en un array para Recharts
      const formattedData = Object.values(groupedData);
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Llamada a fetchData al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-2 bg-zinc-100 rounded-lg">
      <h4 className="text-sm font-bold text-center mb-2">
        Comparación de Nóminas por Sede y Periodo
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
              dataKey="periodo1"
              stroke="#007bff"
              fill="#007bff"
              name="Periodo 1"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="periodo2"
              stroke="#ff5733"
              fill="#ff5733"
              name="Periodo 2"
              stackId="1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
