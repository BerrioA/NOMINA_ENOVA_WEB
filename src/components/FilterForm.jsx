import { useEffect, useState } from "react";
import axios from "axios";

export default function FilterForm({ onFilter }) {
  const [sedes, setSedes] = useState([]);
  const [periodos, setPeriodos] = useState([
    { id: 1, nombre: "Primera Quincena" },
    { id: 2, nombre: "Segunda Quincena" },
  ]);
  const [meses, setMeses] = useState([
    { id: 1, nombre: "Enero" },
    { id: 2, nombre: "Febrero" },
    { id: 3, nombre: "Marzo" },
    { id: 4, nombre: "Abril" },
    { id: 5, nombre: "Mayo" },
    { id: 6, nombre: "Junio" },
    { id: 7, nombre: "Julio" },
    { id: 8, nombre: "Agosto" },
    { id: 9, nombre: "Septiembre" },
    { id: 10, nombre: "Octubre" },
    { id: 11, nombre: "Noviembre" },
    { id: 12, nombre: "Diciembre" },
  ]);
  const [filters, setFilters] = useState({
    sede: "",
    periodo: "",
    mes: "",
  });

  useEffect(() => {
    // Cargar las sedes desde la API
    const fetchSedes = async () => {
      try {
        const response = await axios.get(
          "https://sistema-gestion-nomina-enova.onrender.com/sedes"
        );
        setSedes(response.data);
      } catch (error) {
        console.error("Error al cargar las sedes:", error);
      }
    };

    fetchSedes();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      {/* Filtro por Sede */}
      <div className="flex flex-col">
        <label htmlFor="sede" className="font-semibold mb-1">
          Sede
        </label>
        <select
          id="sede"
          name="sede"
          value={filters.sede}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">Selecciona una sede</option>
          {sedes.map((sede) => (
            <option key={sede.uuid} value={sede.uuid}>
              {sede.nombresede}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro por Periodo */}
      <div className="flex flex-col">
        <label htmlFor="periodo" className="font-semibold mb-1">
          Periodo
        </label>
        <select
          id="periodo"
          name="periodo"
          value={filters.periodo}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">Selecciona un periodo</option>
          {periodos.map((periodo) => (
            <option key={periodo.id} value={periodo.id}>
              {periodo.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro por Mes */}
      <div className="flex flex-col">
        <label htmlFor="mes" className="font-semibold mb-1">
          Mes
        </label>
        <select
          id="mes"
          name="mes"
          value={filters.mes}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">Selecciona un mes</option>
          {meses.map((mes) => (
            <option key={mes.id} value={mes.id}>
              {mes.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Botón para Filtrar */}
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 mt-2 sm:mt-0"
      >
        Filtrar
      </button>
    </form>
  );
}
