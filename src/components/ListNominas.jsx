import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
} from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
import { Link } from "react-router-dom";
import axios from "axios";
import FilterForm from "./FilterForm";

export default function ListNominas() {
  const [setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [sedeNames, setSedeNames] = useState({});
  const [cargoNames, setCargoNames] = useState({});

  useEffect(() => {
    // Cargar nombres de las sedes
    const fetchSedeNames = async () => {
      try {
        const res = await axios.get("http://localhost:5000/sedes");
        const namesMap = res.data.reduce((acc, sede) => {
          acc[sede.uuid] = sede.nombresede;
          return acc;
        }, {});
        setSedeNames(namesMap);
      } catch (error) {
        console.error("Error al cargar nombres de las sedes:", error);
      }
    };

    // Cargar nombres de los cargos
    const fetchCargoNames = async () => {
      try {
        const res = await axios.get("http://localhost:5000/cargos");
        const namesMap = res.data.reduce((acc, cargo) => {
          acc[cargo.uuid] = cargo.nombrecargo;
          return acc;
        }, {});
        setCargoNames(namesMap);
      } catch (error) {
        console.error("Error al cargar nombres de los cargos:", error);
      }
    };

    fetchSedeNames();
    fetchCargoNames();
  }, []);

  let list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setIsLoading(false);
      }

      try {
        const res = await axios.get(cursor || "http://localhost:5000/nominas", {
          signal: signal,
        });

        const items = Array.isArray(res.data) ? res.data : [res.data];
        setHasMore(false);

        return {
          items,
          cursor: null,
        };
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        return { items: [] };
      }
    },
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });

  // Función para formatear en pesos colombianos
  const formatCurrency = (value) => {
    if (typeof value === "number") {
      return value.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      });
    }
    return value;
  };

  // Agrupar nóminas por sede
  const groupBySede = (items) => {
    return items.reduce((acc, item) => {
      const sede = item.empleado?.sede || "Sin sede";
      if (!acc[sede]) {
        acc[sede] = [];
      }
      acc[sede].push(item);
      return acc;
    }, {});
  };

  // Función para calcular los totales por columna
  const calculateTotals = (items) => {
    return items.reduce(
      (acc, item) => {
        acc.honomensual += Number(item.empleado?.honomensual || 0);
        acc.honoquincena += Number(item.honoquincena || 0);
        acc.honodia += Number(item.honodia || 0);
        acc.totaldiasliquidar += Number(item.totaldiasliquidar || 0);
        acc.valortotaldominicales += Number(item.valortotaldominicales || 0);
        acc.valortotalclasesinstructor += Number(
          item.valortotalclasesinstructor || 0
        );
        acc.comicioninscripcionestudiante += Number(
          item.comicioninscripcionestudiante || 0
        );
        acc.totalpagar += Number(item.totalpagar || 0);
        acc.saldopendiente += Number(item.saldopendiente || 0);

        return acc;
      },
      {
        honomensual: 0,
        honoquincena: 0,
        honodia: 0,
        totaldiasliquidar: 0,
        valortotaldominicales: 0,
        valortotalclasesinstructor: 0,
        comicioninscripcionestudiante: 0,
        totalpagar: 0,
        saldopendiente: 0,
      }
    );
  };

  const groupedItems = groupBySede(list.items);

    const handleFilter = async (filters) => {
      try {
        const response = await axios.get("http://localhost:5000/nominas", {
          params: filters,
        });
        list.setItems(response.data);
      } catch (error) {
        console.error("Error al filtrar:", error);
      }
    };


  return (
    <div>
      <FilterForm onFilter={handleFilter} />
      {Object.keys(groupedItems).map((sede) => {
        const totals = calculateTotals(groupedItems[sede]);
        const sedeName = sedeNames[sede] || "Sin sede"; // Obtener el nombre de la sede o usar "Sin sede"

        return (
          <div key={sede}>
            <h3 className="text-lg font-semibold mb-4 mt-6">Sede {sedeName}</h3>
            <Table
              isHeaderSticky
              aria-label={`Tabla de nóminas para la sede ${sedeName}`}
              baseRef={scrollerRef}
              bottomContent={
                hasMore ? (
                  <div className="flex w-full justify-center">
                    <Spinner ref={loaderRef} color="white" />
                  </div>
                ) : null
              }
              classNames={{
                table: "min-h-[400px] overflow-hidden",
              }}
            >
              <TableHeader>
                <TableColumn key="nombre">Nombre</TableColumn>
                <TableColumn key="cargo">Cargo</TableColumn>
                <TableColumn key="cc">Cédula</TableColumn>
                <TableColumn key="banco">Banco</TableColumn>
                <TableColumn key="numcuenta">N° Cuenta</TableColumn>
                <TableColumn key="honomensual">Honorarios Mes</TableColumn>
                <TableColumn key="honoquincena">
                  Honorarios Quincenal
                </TableColumn>
                <TableColumn key="honodia">Honorarios Día</TableColumn>
                <TableColumn key="totaldiasliquidar">
                  Total Días a Liquidar
                </TableColumn>
                <TableColumn key="valortotaldominicales">
                  Total Dominicales
                </TableColumn>
                <TableColumn key="valortotalclasesinstructor">
                  Valor Total Clases Instructores
                </TableColumn>
                <TableColumn key="comicioninscripcionestudiante">
                  Comisión Inscripciones Estudiantes
                </TableColumn>
                <TableColumn key="totalpagar">Total a Pagar</TableColumn>
                <TableColumn key="saldopendiente">Saldo Pendiente</TableColumn>
                <TableColumn key="observaciones">Observaciones</TableColumn>
                <TableColumn key="actions">Acciones</TableColumn>
              </TableHeader>
              <TableBody
                items={groupedItems[sede]}
                loadingContent={<Spinner color="blue" />}
              >
                {(item) => (
                  <TableRow key={item.uuid}>
                    {(columnKey) => {
                      const value = getKeyValue(item, columnKey);

                      // Mapa de columnas a propiedades de empleado
                      const empleadoFields = {
                        nombre: `${item.empleado?.nombre ?? ""} ${
                          item.empleado?.apellido ?? ""
                        }`,
                        cargo: cargoNames[item.empleado?.cargo] || "Sin cargo", // Mostrar el nombre del cargo
                        cc: item.empleado?.cc,
                        banco: item.empleado?.banco,
                        numcuenta: item.empleado?.numcuenta,
                      };

                      if (columnKey === "honomensual") {
                        return (
                          <TableCell>
                            {formatCurrency(item.empleado.honomensual)}
                          </TableCell>
                        );
                      }

                      if (
                        [
                          "honoquincena",
                          "honodia",
                          "totalpagar",
                          "valortotaldominicales",
                          "valortotalclasesinstructor",
                          "comicioninscripcionestudiante",
                          "saldopendiente",
                        ].includes(columnKey)
                      ) {
                        return <TableCell>{formatCurrency(value)}</TableCell>;
                      }

                      if (columnKey === "actions") {
                        return (
                          <TableCell>
                            <button className="bg-lime-500 px-4 py-2 rounded-lg hover:bg-lime-600">
                              <Link
                                to={`/nominas/${item.uuid}/empleados/${item.empleado.uuid}`}
                                className="text-white"
                              >
                                Editar
                              </Link>
                            </button>
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell>
                          {empleadoFields[columnKey] ?? value}
                        </TableCell>
                      );
                    }}
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Mostrar totales debajo de la tabla */}
            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-2">Totales:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <span className="font-medium">Honorarios Mes:</span>
                  <span className="text-right text-green-600 font-semibold">
                    {formatCurrency(totals.honomensual)}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <span className="font-medium">Honorarios Quincenal:</span>
                  <span className="text-right text-green-600 font-semibold">
                    {formatCurrency(totals.honoquincena)}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <span className="font-medium">Honorarios Día:</span>
                  <span className="text-right text-green-600 font-semibold">
                    {formatCurrency(totals.honodia)}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <span className="font-medium">Total Días a Liquidar:</span>
                  <span className="text-right text-gray-700 font-semibold">
                    {totals.totaldiasliquidar}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <span className="font-medium">Total Dominicales:</span>
                  <span className="text-right text-green-600 font-semibold">
                    {formatCurrency(totals.valortotaldominicales)}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <span className="font-medium">
                    Valor Total Clases Instructores:
                  </span>
                  <span className="text-right text-green-600 font-semibold">
                    {formatCurrency(totals.valortotalclasesinstructor)}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <span className="font-medium">
                    Comisión Inscripciones Estudiantes:
                  </span>
                  <span className="text-right text-green-600 font-semibold">
                    {formatCurrency(totals.comicioninscripcionestudiante)}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <span className="font-medium">Total a Pagar:</span>
                  <span className="text-right text-green-600 font-semibold">
                    {formatCurrency(totals.totalpagar)}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded shadow">
                  <span className="font-medium">Saldo Pendiente:</span>
                  <span className="text-right text-red-600 font-semibold">
                    {formatCurrency(totals.saldopendiente)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
