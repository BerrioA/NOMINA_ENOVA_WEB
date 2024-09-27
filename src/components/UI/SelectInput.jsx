import { Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";
import { sedes } from "../../services/Sedes";

export default function SelectInput({ label, placeholder }) {
  return (
    <Select
      isRequired
      label={label}
      placeholder={placeholder}
      defaultSelectedKeys={[""]}
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
};
