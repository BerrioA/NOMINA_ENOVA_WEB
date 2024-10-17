import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon } from "./UI/EditIcon";
import { DeleteIcon } from "./UI/DeleteIcon";
import { EyeIcon } from "./UI/EyeIcon";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AddIcon } from "./UI/AddIcon";

export const TableCordinators = () => {
  const [coordinadores, setCoordinadores] = useState([]);

  useEffect(() => {
    getCoordinadores();
  }, []);

  const getCoordinadores = async () => {
    try {
      const response = await axios.get("http://localhost:5000/coordinadores");
      setCoordinadores(response.data);
    } catch (error) {
      console.error("Error al optener coordinadores:", error);
    }
  };

  const deleteCoordinador = async (coordinadorId) => {
    try {
      await axios.delete(
        `http://localhost:5000/coordinadores/${coordinadorId}`
      );
      getCoordinadores(); // Recargar la lista de empleados después de eliminar
    } catch (error) {
      console.error("Error al eliminar administrador:", error);
    }
  };

  const renderCell = (coordinador, columnKey) => {
    switch (columnKey) {
      case "nombre":
        return (
          <User
            name={`${coordinador.nombre} ${coordinador.apellido}`}
            description={coordinador.correo}
          />
        );
      case "cargo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{coordinador.rol}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {coordinador.sede}
            </p>
          </div>
        );
      case "banco":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {coordinador.rol}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Cargar Nómina">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <AddIcon />
              </span>
            </Tooltip>
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Editar Usuario">
              <Link to={`/coordinador/editar/${coordinador.uuid}`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Link>
            </Tooltip>

            <Tooltip color="danger" content="Eliminar Administrador">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteCoordinador(coordinador.uuid)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return coordinador[columnKey];
    }
  };

  const columns = [
    { uid: "nombre", name: "Nombre" },
    { uid: "correo", name: "Correo" },
    { uid: "sede", name: "Sede" },
    { uid: "actions", name: "Acciones" },
  ];

  return (
    <Table aria-label="Tabla de Administradores">
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
      <TableBody items={coordinadores}>
        {(item) => (
          <TableRow key={item.uuid}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
