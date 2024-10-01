import { Textarea } from "@nextui-org/react";
import PropTypes from "prop-types";

export const TextError = ({ msgError }) => {
  return (
    <Textarea
      isInvalid={true}
      variant="bordered"
      errorMessage={msgError}
      className="max-w-xs"
    />
  );
};

TextError.propTypes = {
  msgError: PropTypes.node.isRequired,
};
