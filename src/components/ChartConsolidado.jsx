import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@nextui-org/react";

const ChartConsolidado = () => {
  const [totalPagar, setTotalPagar] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNominas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/nominas");
        const nominas = response.data;

        const total = nominas.reduce(
          (acc, nomina) => acc + Number(nomina.totalpagar || 0),
          0
        );
        setTotalPagar(total);
      } catch (err) {
        setError(`Error al cargar los datos ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNominas();
  }, []);

  return (
    <div className="p-2 bg-zinc-100 rounded-lg">
      <h4 className="text-sm font-bold text-center mb-2">Valor Consolidado</h4>
      <Card className="h-auto max-w-sm mx-auto">
        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <h2 className="text-center font-bold p-20"> $
            {totalPagar.toLocaleString()} COP
          </h2>
        )}
      </Card>
    </div>
  );
};

export default ChartConsolidado;
