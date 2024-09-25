import { Input } from "@nextui-org/react";
import PropTypes from "prop-types";

export default function InputSingle({
  type,
  label,
  value,
  onChange,
}) {
  const variants = ["bordered"];

  return (
    <div className="w-full flex flex-col gap-4 mt-5">
      {variants.map((variant) => (
        <div
          key={variant}
          className="flex w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4"
        >
          <Input
            type={type}
            variant={variant}
            label={label}
            value={value} // Asegúrate de que el valor se pase correctamente
            onChange={onChange} // Manejo de cambios en el input
            fullWidth // Opción para que ocupe todo el ancho
          />
        </div>
      ))}
    </div>
  );
}

// Definición correcta de propTypes
InputSingle.propTypes = {
  type: PropTypes.string.isRequired, // Cambiado a string para el tipo de input
  label: PropTypes.string.isRequired, // Cambiado a string para la etiqueta
  value: PropTypes.string, // Se añade prop para el valor
  onChange: PropTypes.func, // Se añade prop para el cambio
  placeholder: PropTypes.string, // Se añade prop para el placeholder
};
