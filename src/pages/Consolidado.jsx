import { Layout } from "./Layout";
import Formconsolidado from "../components/FormConsolidado";
import { WelcomeAndText } from "../components/UI/WelcomeAndText";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/AuthSlice";

export const Consolidado = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user, loading } = useSelector((state) => state.auth);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getMe());
            setIsLoading(false);
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
        if (user && user.rol !== "Administrador") {
            navigate("/dashboard");
        }
    }, [isError, user, navigate]);

    // Renderiza nada si está cargando o hay un error
    if (isLoading) {
        return <div>Loading...</div>; // Mensaje de carga, puedes personalizarlo
    }

    if (isError) {
        return <div>Error en la conexión, por favor intenta más tarde.</div>; // Mensaje de error
    }

    return (
        <Layout>
            <WelcomeAndText title="Consolidado" Subtitle="Consolidado de nominas." />
            <Formconsolidado />
        </Layout>
    );
};
