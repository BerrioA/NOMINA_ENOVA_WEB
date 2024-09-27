import { Layout } from "./Layout";
import { FormAddEmploye } from "../components/FormAddEmploye";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";

export const AddEmploye = () => {
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
      <FormAddEmploye />
    </Layout>
  );
};
