import { useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";

const ButtonExcelEstilizado = ({ consolidado }) => {
  const [loading, setLoading] = useState(false);

  const titulo = [{ A: "Consolidado de Nómina" }, {}];

  const informacionAdicional = {
    A:
      "Generado por: Sistema de Nómina (SIGEN) - Fecha: " +
      new Date().toLocaleDateString(),
  };

  const longitudes = [15, 20, 15, 20, 15, 15, 20, 20, 20, 20, 25, 30, 20, 25];

  const handleDownload = () => {
    setLoading(true);

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

    let totalF = 0,
      totalG = 0,
      totalH = 0,
      totalI = 0,
      totalJ = 0,
      totalK = 0,
      totalL = 0,
      totalM = 0,
      totalN = 0;

    consolidado.forEach((item) => {
      const honoMensual = Number(item.empleado?.honomensual || 0);
      const honoQuincena = Number(item.honoquincena || 0);
      const honoDia = Number(item.honodia || 0);
      const totalDiasLiquidar = Number(item.totaldiasliquidar || 0);
      const totalDominicales = Number(item.valortotaldominicales || 0);
      const totalClasesInstructor = Number(
        item.valortotalclasesinstructor || 0
      );
      const comicionInscripcion = Number(
        item.comicioninscripcionestudiante || 0
      );
      const deducciones = Number(item.deducciones || 0);
      const totalPagar = Number(item.totalpagar || 0);

      totalF += honoMensual;
      totalG += honoQuincena;
      totalH += honoDia;
      totalI += totalDiasLiquidar;
      totalJ += totalDominicales;
      totalK += totalClasesInstructor;
      totalL += comicionInscripcion;
      totalM += deducciones;
      totalN += totalPagar;

      tabla.push({
        A: `${item.empleado?.nombre ?? ""} ${item.empleado?.apellido ?? ""}`,
        B: item.empleado?.cargo,
        C: item.empleado?.cc,
        D: item.empleado?.banco,
        E: item.empleado?.numcuenta,
        F: {
          v: honoMensual,
          s: { font: { bold: true, color: { rgb: "FF0000" } } },
        },
        G: {
          v: honoQuincena,
          s: { font: { bold: true, color: { rgb: "FF0000" } } },
        },
        H: {
          v: honoDia,
          s: { font: { bold: true, color: { rgb: "FF0000" } } },
        },
        I: totalDiasLiquidar,
        J: totalDominicales,
        K: totalClasesInstructor,
        L: comicionInscripcion,
        M: deducciones,
        N: {
          v: totalPagar,
          s: { font: { bold: true, color: { rgb: "FF0000" } } },
        },
      });
    });

    // Agregar la fila de totales
    tabla.push({
      A: "Total",
      F: { v: totalF, s: { font: { bold: true, color: { rgb: "0000FF" } } } }, // Negrita y azul
      G: { v: totalG, s: { font: { bold: true, color: { rgb: "0000FF" } } } },
      H: { v: totalH, s: { font: { bold: true, color: { rgb: "0000FF" } } } },
      I: { v: totalI, s: { font: { bold: true, color: { rgb: "0000FF" } } } },
      J: { v: totalJ, s: { font: { bold: true, color: { rgb: "0000FF" } } } },
      K: { v: totalK, s: { font: { bold: true, color: { rgb: "0000FF" } } } },
      L: { v: totalL, s: { font: { bold: true, color: { rgb: "0000FF" } } } },
      M: { v: totalM, s: { font: { bold: true, color: { rgb: "0000FF" } } } },
      N: { v: totalN, s: { font: { bold: true, color: { rgb: "0000FF" } } } },
    });

    const dataFinal = [...titulo, ...tabla, informacionAdicional];

    setTimeout(() => {
      crearArchivo(dataFinal);
      setLoading(false);
    }, 1200);
  };

  const crearArchivo = (dataFinal) => {
    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });

    hoja["!merges"] = [
      XLSX.utils.decode_range("A1:N1"),
      XLSX.utils.decode_range("A2:N2"),
    ];

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
          Descargar en formato EXCEL
        </Button>
      ) : (
        <Button color="primary" disabled>
          <Spinner size="sm" color="default" /> Generando XLSX...
        </Button>
      )}
    </>
  );
};

ButtonExcelEstilizado.propTypes = {
  consolidado: PropTypes.array.isRequired,
};

export default ButtonExcelEstilizado;
