import { Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";
import { sedes } from "../../services/Sedes";

export default function SelectInput({ label, placeholder, value, onChange }) {
  return (
    <Select
      isRequired
      label={label}
      placeholder={placeholder}
      selectedKeys={value ? [value] : []} // Si hay valor, lo establece como seleccionado
      onSelectionChange={onChange} // Maneja el cambio
      className="max-w-xs mt-4"
    >
      {sedes.map((sede) => (
        <SelectItem key={sede.key}>{sede.label}</SelectItem>
      ))}
    </Select>
  );
}

SelectInput.propTypes = {
  label: PropTypes.node.isRequired,
  placeholder: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired, // La prop value ahora es requerida
  onChange: PropTypes.func.isRequired, // La función onChange ahora es requerida
};
