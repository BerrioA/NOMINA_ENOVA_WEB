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

export default function TableUsers() {
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

  return (
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
        <TableColumn key="totaldiasliquidar">Total Días a Liquidar</TableColumn>
        <TableColumn key="valortotaldominicales">Total Dominicales</TableColumn>
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
      <TableBody items={list.items} loadingContent={<Spinner color="blue" />}>
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
                return <TableCell>{item.empleado.honomensual}</TableCell>;
              }

              // Retorna el valor correspondiente o el valor original
              return (
                <TableCell>{empleadoFields[columnKey] ?? value}</TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
