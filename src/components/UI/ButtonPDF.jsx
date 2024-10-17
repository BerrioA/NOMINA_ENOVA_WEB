import { useState } from "react";
import { Button, Spinner } from "@nextui-org/react"; // Usamos NextUI
import jsPDF from "jspdf";
import "jspdf-autotable";
import PropTypes from "prop-types";

const ButtonPDF = ({ consolidado }) => {
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = () => {
    setLoading(true);

    const doc = new jsPDF("landscape"); // Formato horizontal para tablas largas
    const fechaActual = new Date().toLocaleDateString();

    // Título y metadatos del PDF
    doc.setFontSize(18);
    doc.text("Reporte de Nómina", 14, 22);
    doc.setFontSize(11);
    doc.text(`Generado por: Sistema de Nómina - Fecha: ${fechaActual}`, 14, 32);

    // Columnas de la tabla
    const columnas = [
      "Nombre",
      "Cargo",
      "Cédula",
      "Banco",
      "N° Cuenta",
      "Honorarios Mes",
      "Honorarios Quincenal",
      "Honorarios Día",
      "Total Días a Liquidar",
      "Total Dominicales",
      "Valor Total Clases Instructores",
      "Comisión Inscripciones Estudiantes",
      "Deducciones",
      "Total a Pagar",
    ];

    // Filas de la tabla con los datos de nómina
    const filas = consolidado.map((item) => [
      `${item.empleado?.nombre ?? ""} ${item.empleado?.apellido ?? ""}`,
      item.empleado?.cargo,
      item.empleado?.cc,
      item.empleado?.banco,
      item.empleado?.numcuenta,
      item.empleado?.honomensual,
      item.honoquincena,
      item.honodia,
      item.totaldiasliquidar,
      item.valortotaldominicales,
      item.valortotalclasesinstructor,
      item.comicioninscripcionestudiante,
      item.deducciones,
      item.totalpagar,
    ]);

    // Agregar la tabla al PDF
    doc.autoTable({
      head: [columnas], // Encabezados
      body: filas, // Cuerpo de la tabla
      startY: 40, // Inicia después del texto de encabezado
      theme: "striped", // Estilo de la tabla
      styles: {
        fontSize: 10, // Tamaño de fuente de la tabla
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [22, 160, 133], // Color de encabezados (verde azulado)
        textColor: 255, // Color de texto blanco
      },
      columnStyles: {
        0: { cellWidth: 30 }, // Ajustes para la columna "Nombre"
        4: { cellWidth: 25 }, // Ajuste para "N° Cuenta"
        7: { cellWidth: 20 }, // Ajuste para "Honorarios Día"
        12: { cellWidth: 25 }, // Ajuste para "Deducciones"
      },
    });

    // Generar y descargar el archivo PDF
    setTimeout(() => {
      doc.save("NominaReporte.pdf");
      setLoading(false);
    }, 1000); // Simulación de carga
  };

  return (
    <>
      {!loading ? (
        <Button color="success" variant="shadow" onClick={handleDownloadPDF}>
          Descargar Nómina PDF
        </Button>
      ) : (
        <Button color="success" disabled>
          <Spinner size="sm" /> Generando PDF...
        </Button>
      )}
    </>
  );
};

ButtonPDF.propTypes = {
  consolidado: PropTypes.array.isRequired,
};

export default ButtonPDF;
