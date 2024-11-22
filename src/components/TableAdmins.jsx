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
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const TableAdmins = () => {
  const [administradores, setAdministradores] = useState([]);

  useEffect(() => {
    getAdministradores();
  }, []);

  const getAdministradores = async () => {
    try {
      const response = await axios.get(
        "https://sistema-gestion-nomina-enova.onrender.com/administradores"
      );
      setAdministradores(response.data);
    } catch (error) {
      console.error("Error fetching administradores:", error);
    }
  };

  const deleteAdministrador = async (administradorId) => {
    try {
      await axios.delete(
        `https://sistema-gestion-nomina-enova.onrender.com/administradores/${administradorId}`
      );
      getAdministradores(); // Recargar la lista de empleados después de eliminar
    } catch (error) {
      console.error("Error al eliminar administrador:", error);
    }
  };

  const renderCell = (administrador, columnKey) => {
    switch (columnKey) {
      case "nombre":
        return (
          <User
            name={`${administrador.nombre} ${administrador.apellido}`}
            description={administrador.correo}
          />
        );
      case "cargo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{administrador.rol}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {administrador.sede}
            </p>
          </div>
        );
      case "banco":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {administrador.rol}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar Usuario">
              <Link to={`/administrador/editar/${administrador.uuid}`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Link>
            </Tooltip>

            <Tooltip color="danger" content="Eliminar Administrador">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteAdministrador(administrador.uuid)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return administrador[columnKey];
    }
  };

  const columns = [
    { uid: "nombre", name: "Nombre" },
    { uid: "correo", name: "Correo" },
    { uid: "rol", name: "Rol" },
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
      <TableBody items={administradores}>
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
