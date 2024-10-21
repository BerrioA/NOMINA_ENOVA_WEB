import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextArea } from "./UI/TextArea";
import { VarLoader } from "./UI/VarLoader";

export const FormEditNomina = () => {
  const fechaActual = new Date();
  const diaDelMes = fechaActual.getDate();
  const diasHabilitados = [1, 2, 3, 4, 15, 16, 17, 21];
  const estaHabilitado = diasHabilitados.includes(diaDelMes);

  // Datos heredados del empleado por Id
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cc, setCc] = useState("");
  const [banco, setBanco] = useState("");
  const [cargo, setCargo] = useState("");
  const [numcuenta, setnumCuenta] = useState("");
  const [sede, setSede] = useState("");
  const [honomensual, setHonoMensual] = useState(0);
  const [uuidNomina, setUuidNomina] = useState("");

  // Datos de la nómina en particular
  let [honoquincena, setHonoquincena] = useState(0);
  let [honodia, setHonoDia] = useState(0);
  const [totaldiasliquidar, setTotalDiasLiquidar] = useState(0);
  const [clasesapoyosena, setClasesApoyoSena] = useState(0);
  const [valorclaseapoyosena, setValorClaseApoyoSena] = useState(0);
  const [diasdominicales, setDiasDominicales] = useState(0);
  const [valordiadominical, setValorDiaDominical] = useState(0);
  const [clasesintructor, setClasesIntructor] = useState(0);
  const [valorclaseinstructor, setValorClaseInstructor] = useState(0);
  const [totalinscripcionesliquidar, setTotalInscripcionesLiquidar] =
    useState(0);
  const [valorcomisioninscripcion, setValorComisionInscripcion] = useState(0);
  const [deducciones, setDeducciones] = useState(0);
  let [honoperiodoliquidacion, setHonoPeriodoLiquidacion] = useState(0);
  let [valortotalclasesapoyosena, setValorTotalClasesApoyoSena] = useState(0);
  let [valortotaldominicales, setValorTotalDominicales] = useState(0);
  let [valortotalclasesinstructor, setValorTotalClasesInstructor] = useState(0);
  let [comicioninscripcionestudiante, setComicionInscripcionEstudiante] =
    useState(0);
  let [totalpagar, setTotalPagar] = useState(0);
  const [pagosadicionalespendientes, setPagosAdicionalesPendientes] =
    useState(0);
  let [saldopendiente, setSaldoPendiente] = useState(0);
  const [observaciones, setObservaciones] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate("");
  const { id } = useParams();
  const [empleadoid, setEmpleadoId] = useState("");

  useEffect(() => {
    if (
      honoperiodoliquidacion !== undefined &&
      valortotalclasesapoyosena !== undefined &&
      valortotaldominicales !== undefined &&
      valortotalclasesinstructor !== undefined &&
      comicioninscripcionestudiante !== undefined &&
      deducciones !== undefined
    ) {
      setTotalPagar(
        (
          parseFloat(honoperiodoliquidacion || 0) +
          parseFloat(valortotalclasesapoyosena || 0) +
          parseFloat(valortotaldominicales || 0) +
          parseFloat(valortotalclasesinstructor || 0) +
          parseFloat(comicioninscripcionestudiante || 0) -
          parseFloat(deducciones || 0)
        ).toFixed(2)
      );
    }
  }, [
    honoperiodoliquidacion,
    valortotalclasesapoyosena,
    valortotaldominicales,
    valortotalclasesinstructor,
    comicioninscripcionestudiante,
    deducciones,
  ]);

  // Obtener el empleado por su ID y extraer el UUID de su nómina
  useEffect(() => {
    const getEmpleadoById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/empleados/${id}`
        );
        setEmpleadoId(response.data.id);
        setNombre(response.data.nombre || "");
        setApellido(response.data.apellido || "");
        setCc(response.data.cc);
        setBanco(response.data.banco);
        setCargo(response.data.cargo);
        setnumCuenta(response.data.numcuenta);
        setHonoMensual(response.data.honomensual || 0);
        setSede(response.data.sede);

        if (response.data.nominas && response.data.nominas.length > 0) {
          setUuidNomina(response.data.nominas[0].uuid);
        }
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getEmpleadoById();
  }, [id]);

  useEffect(() => {
    const getNominaByUuid = async () => {
      if (!uuidNomina) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/nominas/${uuidNomina}`
        );
        const nomina = response.data;
        setHonoquincena(nomina.honoquincena);
        setHonoDia(nomina.honodia);
        setTotalDiasLiquidar(nomina.totaldiasliquidar);
        setClasesApoyoSena(nomina.clasesapoyosena);
        setValorClaseApoyoSena(nomina.valorclaseapoyosena);
        setDiasDominicales(nomina.diasdominicales);
        setValorDiaDominical(nomina.valordiadominical);
        setClasesIntructor(nomina.clasesinstructor);
        setValorClaseInstructor(nomina.valorclaseinstructor);
        setTotalInscripcionesLiquidar(nomina.totalinscripcionesliquidar);
        setValorComisionInscripcion(nomina.comicioninscripcionestudiante);
        setValorTotalDominicales(nomina.valortotaldominicales);
        setValorTotalClasesApoyoSena(nomina.valortotalclasesapoyosena);
        setValorTotalClasesInstructor(nomina.valortotalclasesinstructor);
        setTotalPagar(nomina.totalpagar);
        setDeducciones(nomina.deducciones);
        setSaldoPendiente(nomina.saldopendiente);
        setObservaciones(nomina.observaciones);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    getNominaByUuid();
  }, [uuidNomina]);

  const actualizarNomina = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/nominas/${uuidNomina}`, {
        empleadoId: empleadoid,
        honoquincena: honoquincena,
        honodia: honodia,
        totaldiasliquidar: totaldiasliquidar,
        clasesapoyosena: clasesapoyosena,
        valorclaseapoyosena: valorclaseapoyosena,
        diasdominicales: diasdominicales,
        valordiadominical: valordiadominical,
        clasesintructor: clasesintructor,
        valorclaseinstructor: valorclaseinstructor,
        totalinscripcionesliquidar: totalinscripcionesliquidar,
        valorcomisioninscripcion: valorcomisioninscripcion,
        deducciones: deducciones,
        honoperiodoliquidacion: honoperiodoliquidacion,
        valortotalclasesapoyosena: valortotalclasesapoyosena,
        valortotaldominicales: valortotaldominicales,
        valortotalclasesinstructor: valortotalclasesinstructor,
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
      } else {
        console.error("Error al intentar actualizar la nómina:", error);
      }
    }
  };

  return (
    <>
      {estaHabilitado ? (
        <div className="container_principal mx-auto p-4">
          <form onSubmit={actualizarNomina}>
            <p className="text-center text-xl">
              Información principal del empleado
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <InputSingle
                isDisabled
                type="text"
                label="N° Cédula"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
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
            <p className="text-center text-xl">
              Información nómina del empleado{" "}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <InputSingle
                isDisabled
                type="text"
                label="Honorarios Quincenales"
                value={(honomensual / 2).toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                })}
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
                label="Total días a Liquidar"
                value={totaldiasliquidar}
                onChange={(e) => setTotalDiasLiquidar(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex sm:flex-1 gap-4">
                <InputSingle
                  type="number"
                  label="Clases de apoyo Sena"
                  value={clasesapoyosena}
                  onChange={(e) => setClasesApoyoSena(e.target.value)}
                />
                <InputSingle
                  type="number"
                  label="Valor Clases de apoyo Sena"
                  value={valorclaseapoyosena}
                  onChange={(e) => setValorClaseApoyoSena(e.target.value)}
                />
              </div>
              <div className="flex sm:flex-1 gap-4">
                <InputSingle
                  type="number"
                  label="Días Dominicales"
                  value={diasdominicales}
                  onChange={(e) => setDiasDominicales(e.target.value)}
                />
                <InputSingle
                  type="number"
                  label="Valor de días Dominicales"
                  value={valordiadominical}
                  onChange={(e) => setValorDiaDominical(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <InputSingle
                isDisabled
                type="text"
                label="Valor total clases apoyo Sena"
                value={(valortotalclasesapoyosena =
                  clasesapoyosena * valorclaseapoyosena).toLocaleString(
                  "es-CO",
                  {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  }
                )}
                onChange={(e) => setValorTotalClasesApoyoSena(e.target.value)}
              />
              <InputSingle
                isDisabled
                type="text"
                label="Valor total días Dominicales"
                value={(valortotaldominicales =
                  diasdominicales * valordiadominical).toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                })}
                onChange={(e) => setValorTotalDominicales(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex sm:flex-1 gap-4">
                <InputSingle
                  type="number"
                  label="N° Total de inscripciones a Liquidar"
                  value={totalinscripcionesliquidar}
                  onChange={(e) =>
                    setTotalInscripcionesLiquidar(e.target.value)
                  }
                />
                <InputSingle
                  type="number"
                  label="Valor comisión inscripciones"
                  value={valorcomisioninscripcion}
                  onChange={(e) => setValorComisionInscripcion(e.target.value)}
                />
              </div>
              <div className="flex sm:flex-1 gap-4">
                <InputSingle
                  isDisabled
                  type="text"
                  label="Valor comisión por inscripcion estudiantes"
                  value={(comicioninscripcionestudiante =
                    totalinscripcionesliquidar *
                    valorcomisioninscripcion).toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  })}
                  onChange={(e) =>
                    setComicionInscripcionEstudiante(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex sm:flex-1 gap-4">
                <InputSingle
                  type="number"
                  label="N° Total de clases instructores"
                  value={clasesintructor}
                  onChange={(e) => setClasesIntructor(e.target.value)}
                />
                <InputSingle
                  type="number"
                  label="Valor clases instructor"
                  value={valorclaseinstructor}
                  onChange={(e) => setValorClaseInstructor(e.target.value)}
                />
              </div>
              <div className="flex sm:flex-1 gap-4">
                <InputSingle
                  isDisabled
                  type="text"
                  label="Valor comisión por inscripcion estudiantes"
                  value={(valortotalclasesinstructor =
                    parseFloat(clasesintructor || 0) *
                    parseFloat(valorclaseinstructor || 0)).toLocaleString(
                    "es-CO",
                    {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    }
                  )}
                  onChange={(e) =>
                    setValorTotalClasesInstructor(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <InputSingle
                isDisabled
                type="text"
                label="Hon. periodo de Liquidación"
                value={Math.round(
                  (honoperiodoliquidacion = totaldiasliquidar * honodia)
                ).toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                })}
                onChange={(e) => setHonoPeriodoLiquidacion(e.target.value)}
              />

              <InputSingle
                type="text"
                label="Deducciones"
                value={deducciones}
                onChange={(e) => setDeducciones(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <InputSingle
                isDisabled
                type="text"
                label="Total a Pagar"
                value={(totalpagar = Math.round(
                  (honoperiodoliquidacion || 0) +
                    (valortotalclasesapoyosena || 0) +
                    (valortotaldominicales || 0) +
                    (valortotalclasesinstructor || 0) +
                    (comicioninscripcionestudiante || 0) -
                    (deducciones || 0)
                )).toLocaleString("es-CO")}
                onChange={(e) => setTotalPagar(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <InputSingle
                type="number"
                label="Pagos adicionales Pendientes"
                value={pagosadicionalespendientes}
                onChange={(e) => setPagosAdicionalesPendientes(e.target.value)}
              />
              <InputSingle
                isDisabled
                type="text"
                label="Saldo Pendiente"
                value={(saldopendiente =
                  totalpagar +
                  Number(pagosadicionalespendientes)).toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                })}
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

            <ButtonSingle textButton="Acttualizar Nómina" type="submit" />
            <p className="text-center text-red-500">{msg}</p>
          </form>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-40 text-center">
          <p className="mb-4">
            Ups, el sistema no se encuentra habilitado para realizar la
            actualización de nóminas.
          </p>
          <VarLoader />
        </div>
      )}
    </>
  );
};
