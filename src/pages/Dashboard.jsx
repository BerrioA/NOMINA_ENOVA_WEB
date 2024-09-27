import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";
import { Layout } from "./Layout";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";


export const Dashboard = () => {
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
      <WelcomeAndText
        title="Dashboard"
        Subtitle="Bienvenido(a) de vuelta...."
      />
    </Layout>
  );
};
