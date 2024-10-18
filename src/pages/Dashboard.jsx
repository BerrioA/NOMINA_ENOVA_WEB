import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";
import { Layout } from "./Layout";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";
import { ChartHero } from "../components/ChartHero";
import { BarChartEmployes } from "../components/BarChartEmployes";
import ChartAllCordinators from "../components/ChartAllCordinators";
import  ChartConsolidado  from "../components/ChartConsolidado";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

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
      <WelcomeAndText
        title="Dashboard"
        Subtitle={`Bienvenido(a) de vuelta ${user && user.nombre}👋`}
      />
      <ChartHero />

      <div className="w-full p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 bg-zinc-100 rounded-lg text-current p-1 shadow-md text-center">
            <ChartConsolidado />
          </div>
          <div className="flex-1 bg-zinc-100 rounded-lg text-current p-1 shadow-md text-center">
            <BarChartEmployes />
          </div>
          <div className="flex-1 bg-zinc-100 rounded-lg text-current p-1 shadow-md text-center">
            <ChartAllCordinators />
          </div>
        </div>
      </div>
    </Layout>
  );
};
