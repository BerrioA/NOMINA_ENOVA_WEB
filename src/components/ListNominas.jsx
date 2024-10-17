import React from "react";
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
import axios from "axios";

export default function ListNominas() {
  const [setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(false);

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
        minimumFractionDigits: 0, // Puedes ajustar esto si deseas decimales
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
      acc.honodia += Number(item.honodia || 0); // Asegúrate de que esto sea un número
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
      honodia: 0, // Inicializado como número
      totaldiasliquidar: 0,
      valortotaldominicales: 0,
      valortotalclasesinstructor: 0,
      comicioninscripcionestudiante: 0,
      totalpagar: 0,
      saldopendiente: 0,
    }
  );
};


  // Obtener las nóminas agrupadas por sede
  const groupedItems = groupBySede(list.items);

  return (
    <div>
      {Object.keys(groupedItems).map((sede) => {
        const totals = calculateTotals(groupedItems[sede]); // Calcular totales

        return (
          <div key={sede}>
            <h3 className="text-lg font-semibold mb-4 mt-6">Sede {sede}</h3>
            <Table
              isHeaderSticky
              aria-label={`Tabla de nóminas para la sede ${sede}`}
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
                        cargo: item.empleado?.cargo,
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

                      // Retorna el valor correspondiente o el valor original
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
            <div className="mt-1">
              <Table
                aria-label={`Totales para Sede ${sede}`}
                isHeaderSticky
                bordered
                classNames={{
                  table: "min-w-full border rounded-lg overflow-hidden",
                  header: "bg-blue-500 text-white",
                }}
              >
                <TableHeader>
                  <TableColumn>Honorarios Mensual</TableColumn>
                  <TableColumn>Honorarios Quincenal</TableColumn>
                  <TableColumn>Honorarios Día</TableColumn>
                  <TableColumn>Total Días a Liquidar</TableColumn>
                  <TableColumn>Total Dominicales</TableColumn>
                  <TableColumn>Valor Total Clases Instructores</TableColumn>
                  <TableColumn>Comisión Inscripciones Estudiantes</TableColumn>
                  <TableColumn>Total a Pagar</TableColumn>
                  <TableColumn>Saldo Pendiente</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key={`totales-sede-${sede}`}>
                    <TableCell>{formatCurrency(totals.honomensual)}</TableCell>
                    <TableCell>{formatCurrency(totals.honoquincena)}</TableCell>
                    <TableCell>{formatCurrency(totals.honodia)}</TableCell>
                    <TableCell>{totals.totaldiasliquidar}</TableCell>
                    <TableCell>
                      {formatCurrency(totals.valortotaldominicales)}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(totals.valortotalclasesinstructor)}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(totals.comicioninscripcionestudiante)}
                    </TableCell>
                    <TableCell className="font-bold">
                      {formatCurrency(totals.totalpagar)}
                    </TableCell>
                    <TableCell className="font-bold">
                      {formatCurrency(totals.saldopendiente)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
