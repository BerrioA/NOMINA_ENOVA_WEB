import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextArea } from "./UI/TextArea";

export const FormAddNomina = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nit, setNit] = useState("");
  const [banco, setBanco] = useState("");
  const [cargo, setCargo] = useState("");
  const [numcuenta, setnumCuenta] = useState("");
  const [sede, setSede] = useState("");
  const [honomensual, setHonoMensual] = useState(0);
  let [honoquincena, setHonoquincena] = useState(0);
  let [honodia, setHonoDia] = useState(0);
  const [totaldiasliquidar, setTotalDiasLiquidar] = useState(0);
  const [clasesapoyosena, setClasesApoyoSena] = useState(0);
  const [diasdominical, setDiasDominical] = useState(0);
  const [clasesintructores, setClasesIntructores] = useState(0);
  const [totalinscripcionesliquidar, setTotalInscripcionesLiquidar] =
    useState(0);
  let [honoperiodoliquidacion, setHonoPeriodoLiquidacion] = useState(0);
  const [valortotaldominicales, setValorTotalDominicales] = useState(0);
  const [valortotalclasesinstructores, setValorTotalClasesInstructores] =
    useState(0);
  const [comicioninscripcionestudiante, setComicionInscripcionEstudiante] =
    useState(0);
  const [totalpagar, setTotalPagar] = useState(0);
  const [pagosadicionalespendientes, setPagosAdicionalesPendientes] =
    useState(0);
  const [saldopendiente, setSaldoPendiente] = useState(0);
  const [observaciones, setObservaciones] = useState("");

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (honomensual > 0) {
      setHonoDia(honomensual / 30);
    }
  }, [honomensual]);

  useEffect(() => {
    if (honodia > 0 && totaldiasliquidar > 0) {
      setHonoPeriodoLiquidacion(honodia * totaldiasliquidar);
    }
  }, [honodia, totaldiasliquidar]);

  useEffect(() => {
    const getEmpleadoById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/empleados/${id}`
        );
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setNit(response.data.nit);
        setBanco(response.data.banco);
        setCargo(response.data.cargo);
        setnumCuenta(response.data.numcuenta);
        setHonoMensual(response.data.honomensual);
        setSede(response.data.sede);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getEmpleadoById();
  }, [id]);

 

  const guardarNomina = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/nominas", {
        empleadoId: id,
        honoquincena: honoquincena,
        honodia: honodia,
        totaldiasliquidar: totaldiasliquidar,
        clasesapoyosena: clasesapoyosena,
        diasdominical: diasdominical,
        clasesintructores: clasesintructores,
        totalinscripcionesliquidar: totalinscripcionesliquidar,
        honoperiodoliquidacion: honoperiodoliquidacion,
        valortotaldominicales: valortotaldominicales,
        valortotalclasesinstructores: valortotalclasesinstructores,
        comicioninscripcionestudiante: comicioninscripcionestudiante,
        totalpagar: totalpagar,
        pagosadicionalespendientes: pagosadicionalespendientes,
        saldopendiente: saldopendiente,
        observaciones: observaciones,
        
      });
      
      navigate("/nominas");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    
  };

  return (
    <div className="container_principal mx-auto p-4">
      <form onSubmit={guardarNomina}>
        <p className="text-center">Información principal del empleado</p>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle
            isDisabled
            type="text"
            label="N° Cédula"
            value={nit}
            onChange={(e) => setNit(e.target.value)}
          />
          <InputSingle
            isDisabled
            type="text"
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <InputSingle
            isDisabled
            type="text"
            label="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle
            type="text"
            label="Cargo"
            isDisabled
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
          <InputSingle
            isDisabled
            type="text"
            label="Banco"
            value={banco}
            onChange={(e) => setCargo(e.target.value)}
          />
          <InputSingle
            isDisabled
            type="text"
            label="Honorarios Mensuales"
            value={honomensual.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            })}
            onChange={(e) => setHonoMensual(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle
            isDisabled
            type="text"
            label="N° Cuenta"
            value={numcuenta}
            onChange={(e) => setnumCuenta(e.target.value)}
          />
          <InputSingle
            isDisabled
            type="text"
            label="Sede"
            value={sede}
            onChange={(e) => setSede(e.target.value)}
          />
        </div>
        <p className="text-center">Información nómina del empleado </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle
            isDisabled
            type="text"
            label="Honorarios Quincenales"
            value={
              (honoquincena = (honomensual / 2).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }))
            }
            onChange={(e) => setHonoquincena(e.target.value)}
          />

          <InputSingle
            isDisabled
            type="text"
            label="Honorarios por Días"
            value={(honomensual / 30).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            })}
            onChange={(e) => setHonoDia(e.target.value)}
          />

          <InputSingle
            type="number"
            label="Total días a Liquidar"
            value={totaldiasliquidar}
            onChange={(e) => setTotalDiasLiquidar(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="sm:flex-1">
            <InputSingle
              type="number"
              label="Clases de apoyo Sena"
              value={clasesapoyosena}
              onChange={(e) => setClasesApoyoSena(e.target.value)}
            />
          </div>
          <div className="flex sm:flex-1 gap-4">
            <InputSingle
              type="number"
              label="Días Dominicales"
              value={diasdominical}
              onChange={(e) => setDiasDominical(e.target.value)}
            />
            <InputSingle
              type="number"
              label="Clases de Instructores"
              value={clasesintructores}
              onChange={(e) => setClasesIntructores(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4"></div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle
            type="number"
            label="N° Total de inscripciones a Liquidar"
            value={totalinscripcionesliquidar}
            onChange={(e) => setTotalInscripcionesLiquidar(e.target.value)}
          />
          <InputSingle
            isDisabled
            type="text"
            label="Hon. periodo de Liquidación"
            value={(honoperiodoliquidacion =
              totaldiasliquidar * honodia).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            })}
            onChange={(e) => setHonoPeriodoLiquidacion(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle
            isDisabled
            type="text"
            label="Valor total días Dominicales"
            value={valortotaldominicales}
            onChange={(e) => setValorTotalDominicales(e.target.value)}
          />
          <InputSingle
            isDisabled
            type="text"
            label="Valor total clases de Instructores"
            value={valortotalclasesinstructores}
            onChange={(e) => setValorTotalClasesInstructores(e.target.value)}
          />
          <InputSingle
            type="number"
            label="Com. por inscripción de estudiantes"
            value={comicioninscripcionestudiante}
            onChange={(e) => setComicionInscripcionEstudiante(e.target.value)}
          />
          <InputSingle
            isDisabled
            type="number"
            label="Total a Pagar"
            value={totalpagar}
            onChange={(e) => setTotalPagar(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <InputSingle
            isDisabled
            type="number"
            label="Pagos adicionales Pendientes"
            value={pagosadicionalespendientes}
            onChange={(e) => setPagosAdicionalesPendientes(e.target.value)}
          />
          <InputSingle
            isDisabled
            type="number"
            label="Saldo Pendiente"
            value={saldopendiente}
            onChange={(e) => setSaldoPendiente(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <TextArea
            label="Observaciones"
            placeholder="Ingrese una observación"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>

        <ButtonSingle textButton="Guardar Nómina" type="submit" />
        <p className="text-center text-red-500">{msg}</p>
      </form>
    </div>
  );
};
