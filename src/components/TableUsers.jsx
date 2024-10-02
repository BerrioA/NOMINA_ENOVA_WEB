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

export default function TableUsers() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(false);

  let list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setIsLoading(false);
      }

      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(cursor || "http://localhost:5000/nominas", {
        signal,
      });
      let json = await res.json();

      setHasMore(json.next !== null);

      return {
        items: json.results,
        cursor: json.next,
      };
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
        <TableColumn key="honoquincena">Name</TableColumn>
        <TableColumn key="honodia">Cargo</TableColumn>
        <TableColumn key="totaldiasliquidar">Cédula</TableColumn>
        <TableColumn key="clasesapoyosena">Banco</TableColumn>
        <TableColumn key="diasdominical">N° Cuenta</TableColumn>
        <TableColumn key="clasesintructores">Honorarios Mes</TableColumn>
        <TableColumn key="totalinscripcionesliquidar">
          Honorarios Quincenal
        </TableColumn>
        <TableColumn key="honoperiodoliquidacion">Honorarios Día</TableColumn>
        <TableColumn key="valortotaldominicales">
          Total Dias a Liquidar
        </TableColumn>
        <TableColumn key="valortotalclasesinstructores">
          Hon. Periodo Liquidación
        </TableColumn>
        <TableColumn key="comicioninscripcionestudiante">
          Valor Total Calses Instructores
        </TableColumn>
        <TableColumn key="totalpagar">
          Comicion x Inscripciones Estudiantes
        </TableColumn>
        <TableColumn key="pagosadicionalespendientes">
          Total a Pagar
        </TableColumn>
        <TableColumn key="saldopendiente">Saldo Pendiente</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={list.items}
        loadingContent={<Spinner color="white" />}
      >
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
