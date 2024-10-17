import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextArea } from "./UI/TextArea";
import { VarLoader } from "./UI/VarLoader";

export const FormAddNomina = () => {
  const fechaActual = new Date();
  const diaDelMes = fechaActual.getDate();
  // Dias en los cuales se habilitara para el coordinador la carga de Nómina
  const diasHabilitados = [1];
  const estaHabilitado = diasHabilitados.includes(diaDelMes);
  //Datos heredados del empleado por Id
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cc, setCc] = useState("");
  const [banco, setBanco] = useState("");
  const [cargo, setCargo] = useState("");
  const [numcuenta, setnumCuenta] = useState("");
  const [sede, setSede] = useState("");
  const [honomensual, setHonoMensual] = useState(0);

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
  const navigate = useNavigate();
  const { id } = useParams();
  const [empleadoid, setEmpleadoId] = useState("");

  //useEffect para manejar los cambio en el valor de honorarios por día
  useEffect(() => {
    if (honomensual > 0) {
      setHonoDia(honomensual / 30);
    }
  }, [honomensual]);

  //useEffect para manejar los cambio en el valor del saldo honorario quincenal
  useEffect(() => {
    if (honomensual > 0) {
      setHonoquincena(honomensual / 2);
    }
  }, [honomensual]);

  //useEffect para manejar los cambio en el valor del total a pagar
  useEffect(() => {
    if (
      honoperiodoliquidacion &&
      valortotalclasesapoyosena &&
      valortotaldominicales &&
      valortotalclasesinstructor &&
      comicioninscripcionestudiante
    ) {
      setTotalPagar(
        honoperiodoliquidacion +
          valortotalclasesapoyosena +
          valortotaldominicales +
          valortotalclasesinstructor +
          comicioninscripcionestudiante
      );
    }
  }, [
    honoperiodoliquidacion,
    valortotalclasesapoyosena,
    valortotaldominicales,
    valortotalclasesinstructor,
    comicioninscripcionestudiante,
  ]);

  //useEffect para manejar los cambio en el valor del saldo pendiente
  useEffect(() => {
    if (totalpagar && pagosadicionalespendientes) {
      setSaldoPendiente(totalpagar + pagosadicionalespendientes);
    }
  }, [totalpagar, pagosadicionalespendientes]);

  //useEffect para manejar los cambio en el valor del honorario del periodo de liquidación
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
        setEmpleadoId(response.data.id); // Aquí asegúrate de obtener el id correcto
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setCc(response.data.cc);
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

  useEffect(() => {
    const getEmpleadoById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/empleados/${id}` // Utilizamos el id desde useParams
        );
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setCc(response.data.cc);
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
      }
    }
  };

  return (
    <>
      {estaHabilitado ? (
        <div className="container_principal mx-auto p-4">
          <form onSubmit={guardarNomina}>
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
                type="number"
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
                    clasesintructor * valorclaseinstructor).toLocaleString(
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
                label="Total a Pagar"
                value={(totalpagar =
                  honoperiodoliquidacion +
                  valortotalclasesapoyosena +
                  valortotaldominicales +
                  valortotalclasesinstructor +
                  comicioninscripcionestudiante).toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                })}
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

            <ButtonSingle textButton="Guardar Nómina" type="submit" />
            <p className="text-center text-red-500">{msg}</p>
          </form>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-40 text-center">
          <p className="mb-4">
            Ups, el sistema no se encuentra habilitado para realizar la carga de
            nóminas.
          </p>
          <VarLoader />
        </div>
      )}
    </>
  );
};
