import { Layout } from "./Layout";
import { FormEditAdmin } from "../components/FormEditAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";

export const EditAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, administrador } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (administrador && administrador.rol !== "Administrador") {
      navigate("/dashboard");
    }
  }, [isError, administrador, navigate]);

  return (
    <Layout>
      <FormEditAdmin />
    </Layout>
  );
};
