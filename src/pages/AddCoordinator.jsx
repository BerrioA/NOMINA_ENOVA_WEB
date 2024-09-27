import { Layout } from "./Layout";
import { FormAddCoordinator } from "../components/FormAddCoordinator";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";

export const AddCoordinator = () => {
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
      <FormAddCoordinator />
    </Layout>
  );
};
