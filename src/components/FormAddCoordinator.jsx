import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import SelectInput from "./UI/SelectInput";

export const FormAddCoordinator = () => {
  return (
    <div className="container_principal mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <InputSingle type="text" label="Nombre" />
        <InputSingle type="text" label="Apellido" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <InputSingle type="email" label="Correo" />
        <InputSingle type="text" label="Rol" isDisabled value={"Coordinador"} />
        <SelectInput label={"Cargo"} placeholder={"Seleccione un Cargo"} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <InputSingle type="password" label="Contraseña" />
        <InputSingle type="password" label="Confirmar Contraseña" />
      </div>

      <ButtonSingle textButton="Registrar Coordinador" type="submit" />
    </div>
  );
};
