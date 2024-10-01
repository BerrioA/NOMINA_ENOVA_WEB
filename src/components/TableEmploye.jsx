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
import { useSelector } from "react-redux";

export const TableEmploye = () => {
  const [empleados, setEmpleados] = useState([]);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    getEmpleados();
  }, []);

  const getEmpleados = async () => {
    try {
      const response = await axios.get("http://localhost:5000/empleados");
      setEmpleados(response.data);
    } catch (error) {
      console.error("Error fetching empleados:", error);
    }
  };

  const deleteEmpleado = async (empleadoId) => {
    try {
      await axios.delete(`http://localhost:5000/empleados/${empleadoId}`);
      getEmpleados(); // Recargar la lista de empleados después de eliminar
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
    }
  };

  const renderCell = (empleado, columnKey) => {
    switch (columnKey) {
      case "nombre":
        return (
          <User
            name={`${empleado.nombre} ${empleado.apellido}`}
            description={empleado.cargo}
          />
        );
      case "cargo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{empleado.cargo}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {empleado.sede}
            </p>
          </div>
        );
      case "banco":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {empleado.banco}
          </Chip>
        );
      case "honomensual":
        return (
          <p className="text-sm">
            {new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
            }).format(empleado.honomensual)}
          </p>
        );
        
      case "actions":
  // Verificar si el usuario es Coordinador antes de renderizar las acciones
  if (user && user.rol === "Coordinador") {
    
    return (
      <div className="relative flex items-center gap-2">
        {/* Cargar Nómina */}
        <Tooltip content="Cargar Nómina">
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <AddIcon />
          </span>
        </Tooltip>

        {/* Ver Detalles */}
        <Tooltip content="Details">
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <EyeIcon />
          </span>
        </Tooltip>

        {/* Editar Usuario */}
        <Tooltip content="Editar Usuario">
          <Link to={`/empleados/editar/${empleado.uuid}`}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Link>
        </Tooltip>

        {/* Eliminar Empleado */}
        <Tooltip color="danger" content="Eliminar Empleado">
          <span
            className="text-lg text-danger cursor-pointer active:opacity-50"
            onClick={() => deleteEmpleado(empleado.uuid)}
          >
            <DeleteIcon />
          </span>
        </Tooltip>
      </div>
    );
  }

  return null; // Si no es "Coordinador", no retorna nada

      default:
        return empleado[columnKey];
    }
  };

  const columns = [
    { uid: "nombre", name: "Nombre" },
    { uid: "cargo", name: "Cargo" },
    { uid: "banco", name: "Banco" },
    { uid: "honomensual", name: "Honorarios" },
    { uid: "actions", name: "Acciones" },
  ];

  return (
    <Table aria-label="Tabla de empleados">
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
      <TableBody items={empleados}>
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
