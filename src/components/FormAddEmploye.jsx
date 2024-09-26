import ButtonSingle from "./UI/ButtonSingle";
import InputSingle from "./UI/InputSingle";
import SelectInput from "./UI/SelectInput";

export const FormAddEmploye = () => {
  return (
    <div className="container_principal mx-auto p-4">

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <InputSingle type="text" label="Nombre" />
        <InputSingle type="text" label="Apellido" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="sm:flex-1">
          <InputSingle type="text" label="N° Documento " />
        </div>
        <div className="flex sm:flex-1 gap-4">
          <SelectInput label={"Banco"} placeholder={"Seleccione un banco"} />
          <InputSingle type="text" label="N° Cuenta" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <SelectInput
          label={"Sede a la que pertenece"}
          placeholder={"Seleccione una Sede"}
        />
        <SelectInput label={"Cargo"} placeholder={"Seleccione un Cargo"} />
        <InputSingle type="text" label="Honorarios Mensuales" />
      </div>
      <ButtonSingle textButton="Guardar Empleado" />
    </div>
  );
};
