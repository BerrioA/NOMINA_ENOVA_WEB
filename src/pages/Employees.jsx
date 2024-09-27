import { Layout } from "./Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";
import { UserRoundPlus } from "lucide-react";
import ButtonSingle from "../components/UI/ButtonSingle";
import { TableEmploye } from "../components/TableEmploye";
import { Link } from "react-router-dom";

export const Employees = () => {
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
      <div className="flex justify-start mb-4">
        <Link to="/empleado/agregar">
          <ButtonSingle
            icon={<UserRoundPlus />}
            textButton="Agregar Empleado"
            className="w-32"
          />
        </Link>
      </div>
      <TableEmploye />
    </Layout>
  );
};
