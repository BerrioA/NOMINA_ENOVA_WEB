import { Input } from "@nextui-org/react";
import PropTypes from "prop-types";

export default function InputSingle({ type, label }) {
  const variants = ["bordered"];
  return (
    <div className="w-full flex flex-col gap-4 mt-5">
      {variants.map((variant) => (
        <div
          key={variant}
          className="flex w-full flex-wrap md:flex-nowrap mb-4 md:mb-0 gap-4"
        >
          <Input type={type} variant={variant} label={label} />
        </div>
      ))}
    </div>
  );
}

// Definición correcta de propTypes
InputSingle.propTypes = {
  type: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
};