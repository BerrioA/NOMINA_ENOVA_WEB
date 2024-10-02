import { Textarea } from "@nextui-org/react";
import PropTypes from "prop-types";

export const TextArea = ({ label, placeholder, value, onChange }) => {
  return (
    <Textarea
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="max-w-xxl"
    />
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
