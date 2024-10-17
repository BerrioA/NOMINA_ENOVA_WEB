import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";

export default function ButtonBack({ textButton, onClick, icon }) {
  return (
    <div className="flex flex-col justify-between h-full">
      {" "}
      {/* Asegúrate de que el contenedor tenga altura completa */}
      <div className="mb-4 mt-4 flex flex-col justify-center w-28">
        <Button
          color="default"
          onClick={onClick}
          className="button is-success is-fullwidth bg-stone-300 mt-2"
        >
          {icon && <span>{icon}</span>}
          {textButton}
        </Button>
      </div>
    </div>
  );
}

// Definición correcta de propTypes
ButtonBack.propTypes = {
  textButton: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
};