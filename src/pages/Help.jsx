import { Layout } from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";
import { InfoHelp } from "../components/InfoHelp";

export const Help = () => {
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
      <InfoHelp />
    </Layout>
  );
};
