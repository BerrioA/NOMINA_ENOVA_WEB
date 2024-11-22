import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DeleteIcon } from "../components/UI/DeleteIcon";

export const SedesTable = () => {
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    getSedes();
  }, []);

  const getSedes = async () => {
    try {
      const response = await axios.get(
        "https://sistema-gestion-nomina-enova.onrender.com/sedes"
      );
      setSedes(response.data);
    } catch (error) {
      console.error("Error al intentar obtener las sedes: ", error);
    }
  };

  const columns = [
    { uid: "nombresede", name: "Nombre de la Sede" },
    { uid: "actions", name: "Acciones" },
  ];

  const deleteSede = async (uuid) => {
    try {
      await axios.delete(
        `https://sistema-gestion-nomina-enova.onrender.com/sedes/${uuid}`
      );
      getSedes();
    } catch (error) {
      console.error("Error al eliminar la sede." + error);
    }
  };

  return (
    <Table aria-label="Tabla de Sedes">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sedes}>
        {(sede) => (
          <TableRow key={sede.uuid}>
            <TableCell>{sede.nombresede}</TableCell>
            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip color="danger" content="Eliminar Sede">
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={() => deleteSede(sede.uuid)}
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
