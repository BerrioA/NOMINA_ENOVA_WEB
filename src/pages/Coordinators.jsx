import { Layout } from "./Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";
import ButtonSingle from "../components/UI/ButtonSingle";
import { UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { TableCordinators } from "../components/TableCordinators";

export const Coordinators = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    } if (user && user.rol !== "Administrador"){
      navigate("/dashboard")
    }
  }, [isError,user, navigate]);
  return (
    <Layout>
      <div className="flex justify-start mb-4">
        <Link to="/coordinador/agregar">
          <ButtonSingle
            icon={<UserRoundPlus />}
            textButton="Agregar Coordinador"
            className="w-32"
          />
        </Link>
      </div>
      <TableCordinators />
    </Layout>
  );
};
