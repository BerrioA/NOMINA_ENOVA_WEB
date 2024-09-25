import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";

export default function ButtonSingle({ textButton, onClick, type = "button", children }) {
  return (
    <div className="mb-4 mt-4 flex flex-col justify-center">
      <Button
        color="primary"
        variant="shadow"
        type={type}
        onClick={onClick}
        className="button is-success is-fullwidth bg-purple-700 mt-2"
      >
        {children || textButton}
      </Button>
    </div>
  );
}

// Definición correcta de propTypes
ButtonSingle.propTypes = {
  textButton: PropTypes.string.isRequired,
};
