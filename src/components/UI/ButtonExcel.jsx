import { useState } from "react";
import { Button, Spinner } from "@nextui-org/react"; // Usamos NextUI en lugar de reactstrap
import * as XLSX from "xlsx";
import PropTypes from "prop-types";


const ButtonExcelEstilizado = ({ consolidado }) => {
  const [loading, setLoading] = useState(false);

  const titulo = [{ A: "Consolidado de Nómina" }, {}]; // Cambiado a "Reporte de Nómina"

  const informacionAdicional = {
    A:
      "Generado por: Sistema de Nómina (SIGEN) - Fecha: " +
      new Date().toLocaleDateString(),
  };

  // Ajustar las longitudes de columnas según tu necesidad
  const longitudes = [15, 20, 15, 20, 15, 15, 20, 20, 20, 20, 25, 30, 20, 25];

  const handleDownload = () => {
    setLoading(true);

    // Encabezados de la tabla de Excel
    let tabla = [
      {
        A: { v: "Nombre", s: { font: { bold: true } } },
        B: { v: "Cargo", s: { font: { bold: true } } },
        C: { v: "Cédula", s: { font: { bold: true } } },
        D: { v: "Banco", s: { font: { bold: true } } },
        E: { v: "N° Cuenta", s: { font: { bold: true } } },
        F: { v: "Honorarios Mes", s: { font: { bold: true } } },
        G: { v: "Honorarios Quincenal", s: { font: { bold: true } } },
        H: { v: "Honorarios Día", s: { font: { bold: true } } },
        I: { v: "Total Días a Liquidar", s: { font: { bold: true } } },
        J: { v: "Total Dominicales", s: { font: { bold: true } } },
        K: {
          v: "Valor Total Clases Instructores",
          s: { font: { bold: true } },
        },
        L: {
          v: "Comisión Inscripciones Estudiantes",
          s: { font: { bold: true } },
        },
        M: { v: "Deducciones", s: { font: { bold: true } } },
        N: { v: "Total a Pagar", s: { font: { bold: true } } },
      },
    ];

    // Agregar los datos de la nómina
    consolidado.forEach((item) => {
      tabla.push({
        A: `${item.empleado?.nombre ?? ""} ${item.empleado?.apellido ?? ""}`,
        B: item.empleado?.cargo,
        C: item.empleado?.cc,
        D: item.empleado?.banco,
        E: item.empleado?.numcuenta,
        F: {
          v: item.empleado?.honomensual,
          s: { font: { bold: true, color: { rgb: "FF0000" } } },
        }, // Negrita y color rojo
        G: {
          v: item.honoquincena,
          s: { font: { bold: true, color: { rgb: "FF0000" } } },
        },
        H: {
          v: item.honodia,
          s: { font: { bold: true, color: { rgb: "FF0000" } } },
        },
        I: item.totaldiasliquidar,
        J: item.valortotaldominicales,
        K: item.valortotalclasesinstructor,
        L: item.comicioninscripcionestudiante,
        M: item.deducciones,
        N: {
          v: item.totalpagar,
          s: { font: { bold: true, color: { rgb: "FF0000" } } },
        }, // Negrita y color rojo
      });
    });

    const dataFinal = [...titulo, ...tabla, informacionAdicional];

    setTimeout(() => {
      crearArchivo(dataFinal);
      setLoading(false);
    }, 1000); // Simulación de carga para mostrar el spinner
  };

  const crearArchivo = (dataFinal) => {
    const libro = XLSX.utils.book_new();

    const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });

    // Merge cells for styling purposes (for title and additional info)
    hoja["!merges"] = [
      XLSX.utils.decode_range("A1:N1"),
      XLSX.utils.decode_range("A2:N2"),
    ];

    // Aplicar anchos de columnas personalizados
    let propiedades = [];
    longitudes.forEach((col) => {
      propiedades.push({
        width: col,
      });
    });

    hoja["!cols"] = propiedades;

    XLSX.utils.book_append_sheet(libro, hoja, "Nómina");

    XLSX.writeFile(libro, "NominaEstilizado.xlsx");
  };

  return (
    <>
      {!loading ? (
        <Button
          color="primary"
          variant="shadow"
          className="mt-2"
          onClick={handleDownload}
        >
          Descargar en formato XLSX
        </Button>
      ) : (
        <Button color="primary" disabled>
          <Spinner size="sm" /> Generando...
        </Button>
      )}
    </>
  );
};

ButtonExcelEstilizado.propTypes = {
  consolidado: PropTypes.array.isRequired,
};

export default ButtonExcelEstilizado;

