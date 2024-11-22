"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const BarChartEmployes = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://sistema-gestion-nomina-enova.onrender.com/nominas"
      );

      const employeesData = response.data.map((nomina) => ({
        nombre: `${nomina.empleado.nombre} ${nomina.empleado.apellido}`,
        totalPagar: parseFloat(nomina.totalpagar),
      }));

      const topEmployees = employeesData
        .sort((a, b) => b.totalPagar - a.totalPagar)
        .slice(0, 5);

      setData(topEmployees);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="p-1 rounded-lg max-w-full mx-auto">
        <h4 className="text-sm font-bold text-center mb-2">
          Empleados del mes
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            className="bg-white p-2 rounded-lg shadow-lg"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalPagar" fill="#48cd02" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
