import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";
import axios from "axios";

export default function SelectInputCargo({
  label,
  placeholder,
  value,
  onChange,
}) {
  const [cargosOptions, setCargosOptions] = useState([]);

  useEffect(() => {
    const fetchCargos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cargos");
        const options = response.data.map((cargo) => ({
          key: cargo.uuid,
          label: cargo.nombrecargo,
          value: cargo.uuid,
        }));
        setCargosOptions(options);
      } catch (error) {
        console.error("Error al obtener los cargos:", error);
      }
    };
    fetchCargos();
  }, []);

  return (
    <Select
      isRequired
      label={label}
      placeholder={placeholder}
      selectedKeys={value ? [value] : []}
      onSelectionChange={(selected) => {
        const selectedKey = Array.from(selected)[0];
        onChange(selectedKey);
      }}
      className="max-w-xs mt-4"
    >
      {cargosOptions.map((sede) => (
        <SelectItem
          key={sede.key}
          value={sede.value}
          textValue={sede.label} // Agrega textValue para mejorar la accesibilidad
        >
          {sede.label}
        </SelectItem>
      ))}
    </Select>
  );
}

SelectInputCargo.propTypes = {
  label: PropTypes.node.isRequired,
  placeholder: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
