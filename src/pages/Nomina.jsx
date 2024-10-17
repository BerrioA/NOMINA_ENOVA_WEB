import { Layout } from "./Layout";
import ListNominas from "../components/ListNominas";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";

export const Nomina = () => {
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
      <ListNominas />
    </Layout>
  );
};
