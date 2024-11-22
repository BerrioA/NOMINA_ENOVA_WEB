import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../services/AuthSlice";
import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import { Spinner } from "@nextui-org/react";
import ImagenFondo from "../assets/images/Personal.jpeg"
import Logo from "../assets/images/LOGOACET.png"

export const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/dashboard");
    }

    if (isError || isSuccess) {
      const timer = setTimeout(() => {
        dispatch(reset());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user, isError, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();

    if (!correo) {
      setError("El correo es requerido.");
      return;
    } else if (!password) {
      setError("La contraseña es requerida.");
      return;
    }
    setError("");
    dispatch(LoginUser({ correo, password }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      Auth(e);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen">
      <div
        className="relative shadow-lg h-[250px] lg:h-[500px] w-full lg:w-2/5 rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none overflow-hidden"
        style={{
          backgroundImage: `url("${ImagenFondo}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(3, 134, 4, 0.7), rgba(248, 90, 1, 0.6))",
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <img
            src={Logo}
            alt="Logo Academia Enova"
            className="w-48 h-20 shadow-lg"
          />
          <h1 className="text-center text-white text-3xl font-semibold">
            SIGEN
          </h1>
        </div>
      </div>

      <div className="h-[500px] w-full lg:w-1/3 flex flex-col justify-center">
        <div
          className="shadow-lg px-8 py-4 h-full rounded-b-2xl lg:rounded-r-2xl lg:rounded-l-none"
          onKeyDown={handleKeyDown}
          tabIndex="0"
        >
          <p className="text-sm font-bold mt-4 lg:mt-12 text-center">
            BIENVENIDO A
          </p>
          <h1 className="text-4xl font-bold col text-center text-[#F85A01]">
            SIGEN
          </h1>
          <p className="text-base text-center">
            Sistema integrado de gestión de nómina
          </p>

          {isError && (
            <p className="has-text-centered text-center mt-4 text-red-600">
              {message}
            </p>
          )}

          {error && (
            <p className="has-text-centered text-center mt-4 text-red-600">
              {error}
            </p>
          )}

          <div className="mt-6 space-y-4">
            <InputSingle
              type="email"
              label="Email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              isRequired={true}
            />
            <InputSingle
              type="password"
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonSingle textButton="Iniciar Sesión" onClick={Auth}>
              {isLoading ? <Spinner size="sm" /> : "Iniciar Sesión"}
            </ButtonSingle>
          </div>
        </div>
      </div>
    </div>
  );
};
