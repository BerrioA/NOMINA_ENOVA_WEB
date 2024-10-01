import { Layout } from "./Layout";
import TableUsers from "../components/TableUsers";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";

export const Consolidado = () => {
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
      if (user && user.rol !== "Administrador") {
        navigate("/dashboard");
      }
    }, [isError, user, navigate]);
  return (
    <Layout>
      <WelcomeAndText title="Consolidado" Subtitle="Consolidado de nominas." />
      <TableUsers />
    </Layout>
  );
};
