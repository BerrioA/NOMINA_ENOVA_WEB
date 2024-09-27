import { Layout } from "./Layout";
import TableUser from "../components/TableUser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";
import ButtonSingle from "../components/UI/ButtonSingle";
import { UserRoundPlus } from "lucide-react";

export const Admins = () => {
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
        <ButtonSingle
          icon={<UserRoundPlus />}
          textButton="Agregar Administrador"
          className="w-32"
          
        />
      </div>
      <TableUser />
    </Layout>
  );
};
