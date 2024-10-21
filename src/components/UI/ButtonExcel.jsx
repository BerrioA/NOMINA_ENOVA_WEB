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

  const formatCurrency = (value) => {
    return value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0, // Elimina los decimales
    });
  };

  const handleDownload = () => {
    setLoading(true);

    let tabla = [
      {
        A: { v: "Nombre" },
        B: { v: "Cargo" },
        C: { v: "Cédula" },
        D: { v: "Banco" },
        E: { v: "N° Cuenta" },
        F: { v: "Honorarios Mes" },
        G: { v: "Honorarios Quincenal" },
        H: { v: "Honorarios Día" },
        I: { v: "Total Días a Liquidar" },
        J: { v: "Total Dominicales" },
        K: { v: "Valor Total Clases Instructores" },
        L: { v: "Comisión Inscripciones Estudiantes" },
        M: { v: "Deducciones" },
        N: { v: "Total a Pagar" },
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

      // Sumar los totales
      totalF += honoMensual;
      totalG += honoQuincena;
      totalH += honoDia;
      totalI += totalDiasLiquidar;
      totalJ += totalDominicales;
      totalK += totalClasesInstructor;
      totalL += comicionInscripcion;
      totalM += deducciones;
      totalN += totalPagar;

      // Añadir la fila de datos a la tabla
      tabla.push({
        A: `${item.empleado?.nombre ?? ""} ${item.empleado?.apellido ?? ""}`,
        B: item.empleado?.cargo,
        C: (item.empleado?.cc ?? "").toString(),
        D: item.empleado?.banco,
        E: item.empleado?.numcuenta,
        F: { v: formatCurrency(honoMensual) },
        G: { v: formatCurrency(honoQuincena) },
        H: { v: formatCurrency(honoDia) },
        I: totalDiasLiquidar,
        J: formatCurrency(totalDominicales),
        K: formatCurrency(totalClasesInstructor),
        L: formatCurrency(comicionInscripcion),
        M: formatCurrency(deducciones),
        N: {
          v: formatCurrency(totalPagar),
          s: { font: { bold: true, color: { rgb: "FF0000" } } },
        },
      });
    });

    // Agregar la fila de totales
    tabla.push({
      A: "Total",
      F: { v: formatCurrency(totalF) },
      G: { v: formatCurrency(totalG) },
      H: { v: formatCurrency(totalH) },
      I: { v: totalI },
      J: { v: formatCurrency(totalJ) },
      K: { v: formatCurrency(totalK) },
      L: { v: formatCurrency(totalL) },
      M: { v: formatCurrency(totalM) },
      N: { v: formatCurrency(totalN) },
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

    XLSX.writeFile(libro, "ReporteConsolidado.xlsx");
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
