import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";

export const Login = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center h-screen">
        <div className="shadow-lg h-96 w-full lg:w-2/5 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center rounded-s-2xl">
          <h1 className="text-center text-white text-3xl">SIGEN</h1>
        </div>
        <div className="h-96 w-full lg:w-1/3 flex flex-col justify-center ">
          <div className="shadow-lg px-8 h-96 rounded-e-2xl">
            <p className="text-sm font-bold mt-12 text-center">BIENVENIDO A</p>
            <h1 className="text-4xl font-bold col text-center text-pink-500">
              SIGEN
            </h1>
            <p className="text-base text-center">
              Sistema integrado de gestión de nómina
            </p>
            <InputSingle type="email" label="Email" />
            <InputSingle type="password" label="Password" />
            <ButtonSingle textButton="Iniciar Sesión" />
          </div>
        </div>
      </div>
    </>
  );
};
