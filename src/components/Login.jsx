import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../services/AuthSlice";
import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";

export const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ correo, password }));
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen">
      <div className="shadow-lg h-[250px] lg:h-[500px] w-full lg:w-2/5 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none">
        <h1 className="text-center text-white text-3xl">SIGEN</h1>
      </div>

      <div className="h-[500px] w-full lg:w-1/3 flex flex-col justify-center">
        <div className="shadow-lg px-8 py-4 h-full rounded-b-2xl lg:rounded-r-2xl lg:rounded-l-none">
          <p className="text-sm font-bold mt-4 lg:mt-12 text-center">
            BIENVENIDO A
          </p>
          <h1 className="text-4xl font-bold col text-center text-pink-500">
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
          <div className="mt-6 space-y-4">
            <InputSingle
              type="email"
              label="Email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <InputSingle
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonSingle textButton="Iniciar Sesión" onClick={Auth}>
              {isLoading ? "Loading..." : "Iniciar Sesión"}
            </ButtonSingle>
          </div>
        </div>
      </div>
    </div>
  );
};
