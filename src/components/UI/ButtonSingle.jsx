import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";

export default function ButtonSingle({ textButton }) {
  return (
    <div className="mb-4 mt-4 flex flex-col justify-center">
      <Button color="primary" variant="shadow" className="bg-purple-700 mt-2">
        {textButton}
      </Button>
    </div>
  );
}

// Definición correcta de propTypes
ButtonSingle.propTypes = {
  textButton: PropTypes.string.isRequired,
};
