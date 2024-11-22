import { Select, SelectItem } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SelectInput({ label, placeholder, value, onChange }) {
  const [sedesOptions, setSedesOptions] = useState([]);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/sedes");
        const options = response.data.map((sede) => ({
          key: sede.uuid,
          label: sede.nombresede,
          value: sede.uuid,
        }));
        setSedesOptions(options);
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
      }
    };
    fetchSedes();
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
      {sedesOptions.map((sede) => (
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

SelectInput.propTypes = {
  label: PropTypes.node.isRequired,
  placeholder: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
