import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";

export const Login = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen">
      <div className="shadow-lg h-[500px] w-full lg:w-2/5 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center rounded-t-2xl lg:rounded-l-2xl lg:rounded-r-none">
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
          <div className="mt-6 space-y-4">
            <InputSingle type="email" label="Email" />
            <InputSingle type="password" label="Password" />
            <ButtonSingle textButton="Iniciar Sesión" />
          </div>
        </div>
      </div>
    </div>
  );
};
