import { Layout } from "./Layout";
import ListNominas from "../components/ListNominas";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";
import { VarLoader } from "../components/UI/VarLoader";

export const Nomina = () => {
  const fechaActual = new Date();
  const diaDelMes = fechaActual.getDate();
  // Dias en los cuales se habilitara para el coordinador la carga de Nómina
  const diasHabilitados = [18];
  const estaHabilitado = diasHabilitados.includes(diaDelMes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <WelcomeAndText title="Nóminas" Subtitle="Listado de nóminas." />
      {estaHabilitado ? (
        <ListNominas />
      ) : (
        <div className="flex flex-col justify-center items-center mt-40 text-center">
          <p className="mb-4">Ups, el sistema no se encuentra habilitado para realizar la carga de nóminas.</p>
          <VarLoader />
        </div>
      )}
    </Layout>
  );
};
