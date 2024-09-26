import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";

export const FormAddAdmin = () => {
  return (
    <div className="container_principal mx-auto p-4">

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <InputSingle type="text" label="Nombre" />
        <InputSingle type="text" label="Apellido" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <InputSingle type="email" label="Correo" />
        <InputSingle
          type="text"
          label="Rol"
          isDisabled
          value={"Administrador"}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <InputSingle type="password" label="Contraseña" />
        <InputSingle type="password" label="Confirmar Contraseña" />
      </div>

      <ButtonSingle textButton="Registrar Administrador" type="submit" />
    </div>
  );
};
