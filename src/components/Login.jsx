import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../services/AuthSlice";
import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import { Spinner } from "@nextui-org/react";

export const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar el error

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
      },1000); // 500ms de delay para evitar conflictos

      return () => clearTimeout(timer); // Limpia el timeout si se desmonta
    }
  }, [user, isError, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();

    // Validar que el campo de correo no esté vacío
    if (!correo) {
      setError("El correo es requerido.");
      return;
    } else if(!password){
      setError("La contraseña es requerida.");
      return;
    }
    // Si todo está bien, limpiar errores y proceder con el login
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
      <div className="shadow-lg h-[250px] lg:h-[500px] w-full lg:w-2/5 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none">
        <h1 className="text-center text-white text-3xl">SIGEN</h1>
      </div>

      <div className="h-[500px] w-full lg:w-1/3 flex flex-col justify-center">
        <div
          className="shadow-lg px-8 py-4 h-full rounded-b-2xl lg:rounded-r-2xl lg:rounded-l-none"
          onKeyDown={handleKeyDown} // Se escucha el evento aquí
          tabIndex="0"
        >
          <p className="text-sm font-bold mt-4 lg:mt-12 text-center">
            BIENVENIDO A
          </p>
          <h1 className="text-4xl font-bold col text-center text-pink-500">
            SIGEN
          </h1>
          <p className="text-base text-center">
            Sistema integrado de gestión de nómina
          </p>

          {/* Mostrar error general del login */}
          {isError && (
            <p className="has-text-centered text-center mt-4 text-red-600">
              {message}
            </p>
          )}

          {/* Mostrar error de validación */}
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
              isRequired={true} // Esto indica que el campo es obligatorio
            />
            <InputSingle
              type="password"
              label="Password"
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
