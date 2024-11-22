import { Layout } from "./Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";
import {SedesTable} from "../components/SedesTable";
import { FormAddSede } from "../components/FomrAddSede";

export const Sites = () => {
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
      <div className="flex flex-col md:flex-row gap-6 p-4">
        <div className="md:w-2/3">
          <SedesTable />
        </div>

        <div className="md:w-1/3">
          <FormAddSede />
        </div>
      </div>
    </Layout>
  );
};
