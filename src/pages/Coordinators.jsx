import { Layout } from "./Layout";
import TableUser from "../components/TableUser";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";
import { ButtonsCustom } from "../components/ButtonsCustom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";

export const Coordinators = () => {
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
        title="Coordinadores"
        Subtitle="Lista de Coordinadores."
      />
      <ButtonsCustom />
      <TableUser />
    </Layout>
  );
};
