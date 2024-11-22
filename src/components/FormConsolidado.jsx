import React, { useEffect, useState } from "react";
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
import ButtonExcel from "./UI/ButtonExcel";
import ButtonPDF from "./UI/ButtonPDF";

export default function Formconsolidado() {
  const [setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(false);
  const [cargoNames, setCargoNames] = useState({});

  useEffect(() => {
    // Cargar los nombres de los cargos y mapearlos por UUID
    const fetchCargos = async () => {
      try {
        const response = await axios.get(
          "https://sistema-gestion-nomina-enova.onrender.com/cargos"
        );
        const cargosData = response.data;
        const cargosMap = cargosData.reduce((acc, cargo) => {
          acc[cargo.uuid] = cargo.nombrecargo;
          return acc;
        }, {});
        setCargoNames(cargosMap);
      } catch (error) {
        console.error("Error al cargar los nombres de cargos:", error);
      }
    };
    fetchCargos();
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

  const totals = React.useMemo(() => {
    const total = {
      honoquincena: 0,
      honodia: 0,
      valortotaldominicales: 0,
      valortotalclasesinstructor: 0,
      comicioninscripcionestudiante: 0,
      totalpagar: 0,
      saldopendiente: 0,
    };

    list.items.forEach((item) => {
      total.honoquincena += Number(item.honoquincena) || 0;
      total.honodia += Number(item.honodia) || 0;
      total.valortotaldominicales += Number(item.valortotaldominicales) || 0;
      total.valortotalclasesinstructor +=
        Number(item.valortotalclasesinstructor) || 0;
      total.comicioninscripcionestudiante +=
        Number(item.comicioninscripcionestudiante) || 0;
      total.totaldeducciones += Number(item.totaldeducciones) || 0;
      total.totalpagar += Number(item.totalpagar) || 0;
      total.saldopendiente += Number(item.saldopendiente) || 0;
    });

    return total;
  }, [list.items]);

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="Example table with infinite pagination"
        baseRef={scrollerRef}
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Spinner ref={loaderRef} color="white" />
            </div>
          ) : null
        }
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn key="nombre">Nombre</TableColumn>
          <TableColumn key="cargo">Cargo</TableColumn>
          <TableColumn key="cc">Cédula</TableColumn>
          <TableColumn key="banco">Banco</TableColumn>
          <TableColumn key="numcuenta">N° Cuenta</TableColumn>
          <TableColumn key="honomensual">Honorarios Mes</TableColumn>
          <TableColumn key="honoquincena">Honorarios Quincenal</TableColumn>
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
          <TableColumn key="deducciones">Deducciones</TableColumn>
          <TableColumn key="totalpagar">Total a Pagar</TableColumn>
          <TableColumn key="saldopendiente">Saldo Pendiente</TableColumn>
          <TableColumn key="observaciones">Observaciones</TableColumn>
        </TableHeader>
        <TableBody items={list.items} loadingContent={<Spinner color="blue" />}>
          {(item) => (
            <TableRow key={item.uuid}>
              {(columnKey) => {
                const value = getKeyValue(item, columnKey);

                const empleadoFields = {
                  nombre: `${item.empleado?.nombre ?? ""} ${
                    item.empleado?.apellido ?? ""
                  }`,
                  cargo:
                    cargoNames[item.empleado?.cargo] || item.empleado?.cargo,
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

                return (
                  <TableCell>{empleadoFields[columnKey] ?? value}</TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="w-full bg-gray-100 p-2 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-7 gap-4 font-semibold">
          <span>Total Quincenal: {formatCurrency(totals.honoquincena)}</span>
          <span>Total Honorarios Día: {formatCurrency(totals.honodia)}</span>
          <span>
            Total Dominicales: {formatCurrency(totals.valortotaldominicales)}
          </span>
          <span>
            Total Clases Instructores:{" "}
            {formatCurrency(totals.valortotalclasesinstructor)}
          </span>
          <span>
            Total Comisión Inscripciones:{" "}
            {formatCurrency(totals.comicioninscripcionestudiante)}
          </span>
          <span>Total a Pagar: {formatCurrency(totals.totalpagar)}</span>
          <span>Saldo Pendiente: {formatCurrency(totals.saldopendiente)}</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:space-x-4 space-y-4 sm:space-y-0 mt-4">
        <ButtonPDF consolidado={list.items} />
        <ButtonExcel consolidado={list.items} />
      </div>
    </>
  );
}
