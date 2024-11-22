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

export const TableCordinators = () => {
  const [coordinadores, setCoordinadores] = useState([]);
  const [sedeNames, setSedeNames] = useState({});
  const [setCargoNames] = useState({});

  useEffect(() => {
    getCoordinadores();
    getSedeNames();
    getCargoNames();
  }, []);

  const getCoordinadores = async () => {
    try {
      const response = await axios.get(
        "https://sistema-gestion-nomina-enova.onrender.com/nominas/coordinadores"
      );
      setCoordinadores(response.data);
    } catch (error) {
      console.error("Error al obtener coordinadores:", error);
    }
  };

  const getSedeNames = async () => {
    try {
      const response = await axios.get(
        "https://sistema-gestion-nomina-enova.onrender.com/nominas/sedes"
      );
      const sedes = response.data.reduce((acc, sede) => {
        acc[sede.uuid] = sede.nombresede;
        return acc;
      }, {});
      setSedeNames(sedes);
    } catch (error) {
      console.error("Error al obtener sedes:", error);
    }
  };

  const getCargoNames = async () => {
    try {
      const response = await axios.get(
        "https://sistema-gestion-nomina-enova.onrender.com/nominas/cargos"
      );
      const cargos = response.data.reduce((acc, cargo) => {
        acc[cargo.uuid] = cargo.nombrecargo;
        return acc;
      }, {});
      setCargoNames(cargos);
    } catch (error) {
      console.error("Error al obtener cargos:", error);
    }
  };

  const deleteCoordinador = async (coordinadorId) => {
    try {
      await axios.delete(
        `https://sistema-gestion-nomina-enova.onrender.com/coordinadores/${coordinadorId}`
      );
      getCoordinadores();
    } catch (error) {
      console.error("Error al eliminar coordinador:", error);
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
            <p className="text-bold text-sm capitalize text-default-400">
              {sedeNames[coordinador.sede] || "Cargando..."}
            </p>
          </div>
        );
      case "rol":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {coordinador.rol}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar Usuario">
              <Link to={`/coordinador/editar/${coordinador.uuid}`}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Link>
            </Tooltip>

            <Tooltip color="danger" content="Eliminar Coordinador">
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
    { uid: "cargo", name: "Sede" },
    { uid: "rol", name: "Rol" },
    { uid: "actions", name: "Acciones" },
  ];

  return (
    <Table aria-label="Tabla de Coordinadores">
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
