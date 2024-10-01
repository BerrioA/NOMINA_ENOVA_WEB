import { Input } from "@nextui-org/react";
import PropTypes from "prop-types";

export default function InputSingle({
  type = "text", // Valor predeterminado de tipo
  label,
  value,
  onChange,
  isDisabled = false, // Valor predeterminado para isDisabled
  isRequired = false, // Valor predeterminado para isRequired
  placeholder = "", // Valor predeterminado para placeholder
}) {
  return (
    <div className="w-full flex flex-col gap-4 mt-5">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4">
        <Input
          type={type} // Pasamos el tipo de input (ej. text, email, etc.)
          label={label} // Etiqueta del input
          value={value} // Valor del input
          onChange={onChange} // Función de manejo de cambio
          fullWidth
          disabled={isDisabled} // Maneja el estado de deshabilitado
          required={isRequired} // Campo obligatorio
          placeholder={placeholder} // Placeholder opcional
          variant="bordered" // Variante predeterminada "bordered"
        />
      </div>
    </div>
  );
}

// Definición de propTypes
InputSingle.propTypes = {
  type: PropTypes.string, // Cambiado a string, no obligatorio
  label: PropTypes.string.isRequired, // Etiqueta es obligatoria
  value: PropTypes.string.isRequired, // Valor es obligatorio
  onChange: PropTypes.func.isRequired, // onChange es obligatorio
  placeholder: PropTypes.string, // Placeholder opcional
  isDisabled: PropTypes.bool, // Campo para manejar si está deshabilitado
  isRequired: PropTypes.bool, // Campo para manejar si es obligatorio
};
