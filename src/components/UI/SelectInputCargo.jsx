import { Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";
import { cargos } from "../../services/Cargos";

export default function SelectInputCargos({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <Select
      isRequired
      label={label}
      placeholder={placeholder}
      selectedKeys={value ? [value] : []} // Si hay valor, lo establece como seleccionado
      onSelectionChange={onChange} // Maneja el cambio
      className="max-w-xs mt-4"
    >
      {cargos.map((cargo) => (
        <SelectItem key={cargo.key}>{cargo.label}</SelectItem>
      ))}
    </Select>
  );
}

SelectInputCargos.propTypes = {
  label: PropTypes.node.isRequired,
  placeholder: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired, // La prop value ahora es requerida
  onChange: PropTypes.func.isRequired, // La función onChange ahora es requerida
};
