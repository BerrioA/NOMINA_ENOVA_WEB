import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";

export default function ButtonBack({
  textButton,
  onClick,
  icon,
}) {
  return (
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
  );
}

ButtonBack.propTypes = {
  textButton: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node,
};
